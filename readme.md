![](./app-icon.png)

# 项目名称 [![wakatime](https://wakatime.com/badge/user/018defe3-c72b-44bd-9a7e-3a7605089bf0/project/018df007-4860-4f87-bdb6-017c942ba8c6.svg)](https://wakatime.com/badge/user/018defe3-c72b-44bd-9a7e-3a7605089bf0/project/018df007-4860-4f87-bdb6-017c942ba8c6)

## 概述

这是一个博客网页和 Tauri 应用。

## 开发

```bash
pnpm install
pnpm run dev
```

如果使用 VS Code，可以通过 `code .` 进入目录后按 `Fn + F5` 启动。

## 域名

- [GitHub Pages](https://ajn404.github.io/)
- [Cloudflare](https://ajn404-github-io.pages.dev)
- [Vercel](https://ajn404-github-io.vercel.app)
- [Gitee Pages](https://ajn404.gitee.io/) (已弃用)

## 代码片段

### Markdown 片段

```json
{
  "Frontmatter": {
    "scope": "markdown",
    "prefix": "frontmatter",
    "body": [
      "---",
      "author: $1",
      "pubDatetime: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND.000Z",
      "modDatetime: $3",
      "title: $4",
      "featured: ${5|false,true|}",
      "draft: ${6|true,false|}",
      "tags:",
      "  - $7",
      "description: $8",
      "---"
    ],
    "description": "为 AstroPaper 博客文章添加 frontmatter 块"
  },
  "Blog Template": {
    "scope": "markdown",
    "prefix": "template",
    "body": [
      "${1:frontmatter}",
      "",
      "${2: 引言}",
      "",
      "## 目录",
      "",
      "## ${3: 标题 1}"
    ],
    "description": "为 AstroPaper 博客文章添加模板。需要在 'frontmatter' 行触发片段模态以插入其他片段。"
  }
  // 其他片段...
}
```

### 脚本说明

以下是每个脚本的解释：

1. **`dev`:** 启动 Astro 开发服务器，通常用于本地开发和调试。
2. **`start`:** 启动 Astro 开发服务器，通常用于生产环境的启动。
3. **`build`:** 构建 Astro 项目，设置 Node.js 最大老生代内存限制为 8192MB，以防止内存不足错误。
4. **`preview`:** 预览构建后的 Astro 项目，检查生产环境效果。
5. **`astro`:** 直接调用 Astro CLI，使用其他功能。
6. **`hide:toolbar`:** 禁用 Astro 开发工具栏，减少界面干扰。
7. **`cz`:** 将所有更改添加到 Git 暂存区，调用 Commitizen 生成规范化的提交信息，然后推送到远程仓库。
8. **`prepare`:** 安装 Husky，用于在提交前运行检查或脚本。
9. **`format:check`:** 检查代码格式是否符合 Prettier 标准。
10. **`format`:** 格式化代码，使其符合 Prettier 标准。
11. **`tauri:dev`:** 启动 Tauri 开发服务器，开发桌面应用。
12. **`tauri:build`:** 构建 Tauri 应用，生成可供发布的桌面应用程序。

## macOS 下载已损坏问题

1. 打开终端（将应用所在目录拖入终端）。
2. 输入 `sudo xattr -rd com.apple.quarantine ./ajn404-github-io.app/`。
3. 输入电脑密码。

### 优化要点：

1. **标题清晰**：使用更具描述性的标题，便于快速理解项目内容。
2. **格式统一**：使用一致的格式和缩进，增强可读性。
3. **链接清晰**：将链接文本化，避免直接显示 URL，提升美观性。
4. **代码块格式**：使用 `bash` 作为代码块的语言标识，增加可读性。
5. **详细说明**：对每个脚本的功能进行详细解释，便于用户理解。

通过这些优化，你的 README 文件将更加专业和易于使用。
