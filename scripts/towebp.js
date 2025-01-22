import fs from 'fs/promises'
import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置参数
const config = {
  image: {
    supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    ffmpegArgs: ['-loglevel', 'error', '-y'],
    assetsDir: path.join(__dirname, '../public/assets')
  },
  code: {
    srcDir: path.join(__dirname, '../src'),
    filePatterns: ['**/*.{js,jsx,ts,tsx,html,css,scss}']
  },
  mappingFile: path.join(__dirname, 'image-mapping.json')
}

let fileMapping = {}

// 递归处理目录
async function processDirectory(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath)
      } else if (config.image.supportedFormats.includes(path.extname(entry.name).toLowerCase())) {
        await convertImageToWebP(fullPath)
      }
    }
  } catch (error) {
    console.error(`⚠️ Error processing directory ${dirPath}:`, error.message)
  }
}

// 生成唯一文件名
async function getUniqueOutputPath(filePath) {
  const originalExt = path.extname(filePath)
  const baseName = path.basename(filePath, originalExt)
  const dir = path.dirname(filePath)
  
  let counter = 1
  let outputPath = path.join(dir, `${baseName}.webp`)

  while (true) {
    try {
      await fs.access(outputPath)
      outputPath = path.join(dir, `${baseName}_${counter}.webp`)
      counter++
    } catch {
      const originalRelPath = path.relative(config.image.assetsDir, filePath)
      const newRelPath = path.relative(config.image.assetsDir, outputPath)
      fileMapping[originalRelPath] = newRelPath
      return outputPath
    }
  }
}

// 图片转换函数
async function convertImageToWebP(filePath) {
  try {
    const outputPath = await getUniqueOutputPath(filePath)
    
    await new Promise((resolve, reject) => {
      const args = [...config.image.ffmpegArgs, '-i', filePath, outputPath]
      const ffmpeg = spawn('ffmpeg', args)
      
      let errorLog = ''
      ffmpeg.stderr.on('data', (data) => (errorLog += data.toString()))
      
      ffmpeg.on('close', (code) => {
        code === 0 ? resolve() : reject(new Error(`FFmpeg error (code ${code}): ${errorLog}`))
      })
    })

    await fs.unlink(filePath)
    console.log(`✅ Converted: ${path.relative(config.image.assetsDir, filePath)} → ${path.relative(config.image.assetsDir, outputPath)}`)
  } catch (error) {
    console.error(`❌ Conversion failed: ${path.relative(config.image.assetsDir, filePath)}`, error.message)
  }
}

// 更新源代码引用
async function updateSourceCodeReferences() {
  const files = await fg(config.code.filePatterns, {
    cwd: config.code.srcDir,
    absolute: true,
    onlyFiles: true
  })

  for (const filePath of files) {
    let content = await fs.readFile(filePath, 'utf-8')
    let modified = false

    for (const [oldPath, newPath] of Object.entries(fileMapping)) {
      // 获取原始文件名和新文件名（不带路径）
      const oldFileName = path.basename(oldPath)
      const newFileName = path.basename(newPath)

      // 构建精准匹配模式
      const regexPatterns = [
        // 匹配字符串中的完整路径
        new RegExp(`(['"\`])(${escapeRegExp(oldPath)})(['"\`])`, 'g'),
        // 匹配URL路径
        new RegExp(`(url\\(['"]?)(${escapeRegExp(oldPath)})(['"]?\\))`, 'gi'),
        // 匹配HTML属性
        new RegExp(`(<(?:img|source|link|a|div)[^>]*(?:src|href|data-[^=]+)=['"])([^'"]*${escapeRegExp(oldFileName)})(['"])`, 'gi')
      ]

      regexPatterns.forEach((regex, index) => {
        content = content.replace(regex, (match, p1, p2, p3) => {
          modified = true
          // 根据不同匹配模式处理
          return index === 2 ? 
            `${p1}${p2.replace(oldFileName, newFileName)}${p3}` : // HTML属性处理
            `${p1}${newPath}${p3 || ''}`                          // 其他情况处理
        })
      })
    }

    if (modified) {
      await fs.writeFile(filePath, content)
      console.log(`🔄 Updated references in: ${path.relative(config.code.srcDir, filePath)}`)
    }
  }
}

// 正则转义工具函数
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 主流程
async function main() {
  try {
    // 阶段1：转换图片
    await processDirectory(config.image.assetsDir)
    
    // 阶段2：保存映射关系
    await fs.writeFile(config.mappingFile, JSON.stringify(fileMapping, null, 2))
    console.log(`📦 Saved mapping file: ${config.mappingFile}`)
    
    // 阶段3：更新源代码
    await updateSourceCodeReferences()
    console.log('🎉 All done! Source code updated.')
  } catch (error) {
    console.error('🚨 Main process failed:', error)
  }
}

// 启动程序
main()