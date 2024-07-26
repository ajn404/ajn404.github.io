## overview

## 开发

```shell
pnpm i
pnpm run dev
```

如果用vscode,使用`code .`进入目录后`fn+f5`

## domain

- <a href="https://ajn404.github.io/" target="_blank">github pages</a>
- <a href="ajn404-github-io.pages.dev" target="_blank">cloud flare</a>
- <a href="https://ajn404.gitee.io/" target="_blank">~~gitee pages~~</a>

## snippets

### markdown

````json
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
    "description": "Adds the frontmatter block for the AstroPaper Blog post"
  },

  "Blog Template": {
    "scope": "markdown",
    "prefix": "template",
    "body": [
      "${1:frontmatter}",
      "",
      "${2: Introductory Sentence}",
      "",
      "## 目录",
      "",
      "## ${3: heading 1}"
    ],
    "description": "Adds the template for the AstroPaper Blog post. You will need to trigger the snippet modal on the 'frontmatter' line to insert the other snipper."
  },
  "details Template": {
    "scope": "markdown",
    "prefix": "details",
    "body": [
      "<details open>",
      "<summary>${1:Click to expand}</summary>",
      "$2",
      "</details>"
    ],
    "description": "details tag in mdx"
  },
  "details Template not open": {
    "scope": "markdown",
    "prefix": "details_not_open",
    "body": [
      "<details>",
      "<summary>${1:Click to expand}</summary>",
      "$2",
      "</details>"
    ],
    "description": "details not open tag in mdx"
  },
  "details Template show code": {
    "scope": "markdown",
    "prefix": "details_show_code",
    "body": [
      "<details>",
      "<summary>${1:show code}</summary>",
      "",
      "```$2",
      "$3",
      "```",
      "",
      "${4:import}",
      "",
      "</details>"
    ],
    "description": "details show code"
  },
  "blockquote Template": {
    "scope": "markdown",
    "prefix": "blockquote",
    "body": ["<blockquote>", "${1:details}", "</blockquote>"],
    "description": "details tag in mdx"
  },
  "mdx Import Component": {
    "scope": "markdown",
    "prefix": "import",
    "body": [
      "import ${1:ComponentName} from '${2:ComponentPath}';",
      "",
      "<${1:ComponentName} client:visible />"
    ],
    "description": "details tag in mdx"
  }
}
````

### scripts

下面是对每个脚本的解释：

1. **"dev": "astro dev"**：这个命令用于启动 Astro 开发服务器，通常用于本地开发和调试。

2. **"start": "astro dev"**：这个命令与 `dev` 命令相同，都是启动 Astro 开发服务器。通常 `start` 命令用于生产环境的启动，但在这里它被设置为开发模式。

3. **"build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 astro build"**：这个命令用于构建 Astro 项目。`cross-env` 是一个工具，用于跨平台设置环境变量。在这里，它将 Node.js 的最大老生代内存限制设置为 8192MB（即 8GB），以防止在构建过程中出现内存不足的错误。

4. **"preview": "astro preview"**：这个命令用于预览构建后的 Astro 项目，通常用于检查生产环境中的效果。

5. **"astro": "astro"**：这个命令直接调用 Astro CLI，允许用户在命令行中使用 Astro 的其他功能。

6. **"hide:toolbar": "astro preferences disable devToolbar"**：这个命令用于禁用 Astro 开发工具栏，可能用于在开发时减少界面干扰。

7. **"cz": "git add .&&cz&&git push"**：这个命令用于将所有更改添加到 Git 暂存区，然后调用 `cz`（通常是指 Commitizen，用于生成规范化的提交信息），最后将更改推送到远程仓库。

8. **"prepare": "husky install"**：这个命令用于安装 Husky，这是一个 Git hooks 工具，通常用于在提交之前运行一些检查或脚本。

9. **"format:check": "prettier --plugin-search-dir=. --check ."**：这个命令用于检查代码格式是否符合 Prettier 的标准，而不进行实际的格式化。

10. **"format": "prettier --plugin-search-dir=. --write ."**：这个命令用于格式化代码，使其符合 Prettier 的标准，并直接修改文件。

11. **"tauri:dev": "tauri dev"**：这个命令用于启动 Tauri 开发服务器，通常用于开发桌面应用。

12. **"tauri:build": "tauri build"**：这个命令用于构建 Tauri 应用，生成可供发布的桌面应用程序。
