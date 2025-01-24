# 博客与Tauri应用 [![WakaTime](https://wakatime.com/badge/user/018defe3-c44b-44bd-9a7e-3a7605089bf0/project/018df007-4860-4f87-bdb6-017c942ba8c6.svg)](https://wakatime.com/@user/projects/xxxxxx)

![应用图标](./app-icon.png)

> 🚧 注意：本项目为个人实验性质作品，不建议用于生产环境

## 项目概述

一个结合博客网页和Tauri桌面应用的实验性项目，主要用于技术探索和实践。

## 快速开始

### 环境准备

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

### 文档快速访问

`Fn + F5` 快捷键快速打开文档

## 部署地址

- 🌍 GitHub Pages: [https://ajn404.github.io/](https://ajn404.github.io/)
- ⚡ Cloudflare: [https://ajn404-github-io.pages.dev](https://ajn404-github-io.pages.dev)
- 🚀 Vercel: [https://ajn404-github-io.vercel.app](https://ajn404-github-io.vercel.app)

## 开发工具

### 代码片段模板

<details>
<summary>Markdown模板 (点击展开)</summary>

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
    "description": "AstroPaper博客Frontmatter模板"
  }
  // 其他模板...
}
```

</details>

### NPM脚本说明

| 命令        | 描述                   | 使用场景       |
| ----------- | ---------------------- | -------------- |
| `dev`       | 启动开发服务器         | 日常开发       |
| `build`     | 构建项目 (内存限制8GB) | 生产环境构建   |
| `tauri:dev` | 启动Tauri开发环境      | 桌面应用开发   |
| `format`    | 代码格式化             | 提交前代码整理 |
| `cz`        | 交互式提交工具         | 规范提交信息   |

## 常见问题

### 🚫 macOS提示应用已损坏

解决方法：

1. 打开终端
2. 执行命令：
   ```bash
   sudo xattr -rd com.apple.quarantine /Applications/ajn404-github-io.app
   ```
3. 输入管理员密码

> ⚠️ 注意：仅对可信来源的应用执行此操作

## 项目状态

本项目为个人实验性质作品，代码结构和实现可能包含非标准实践，不建议作为生产环境参考。

```

```
