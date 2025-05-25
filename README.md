# bookmark - 书签

## 简介

自用极简书签页，没有考虑过自定义界面，使用静态文件作为数据源。

- 响应式保证 350-1920 宽度的丝滑过度
- 现代 flex/grid 布局
- 轻便，仅 ~4MB
- 不使用任何位图，~~极致线条.svg~~

Demo: [https://nek0x1a.github.io/bookmark/](https://nek0x1a.github.io/bookmark/)

## 由来

一直在用 [soulteary/docker-flare](https://github.com/soulteary/docker-flare) 作为书签主页，但是对于猫猫的使用习惯来说有两个小问题:

- 没有针对大屏进行优化，宽度大于 1200 时，简单使用 `width: 90%; padding: 50px 250px;`。
  - 1280 宽度时，实际内容宽度为 638.5，4 列，内容比例太小并且视觉过密；1920 宽度时，实际内容宽度为 1214.5，但还是 4 列，内容又太过松散了。
- 没有使用现代的 flex/grid 布局，而是使用 float 来布局。
  - 导致位置混乱：若 1 行 4 列，(1,3) 组的书签数量大于 (1,4) 组的情况下，(2,1) 组实际会显示在 (1,4) 组下方，而 (2,2) 组，则会显示在新行的首位，且高度与 (2,1) 组底部对齐，这将导致出现较长的空白区域。

为解决这两个视觉效果，就写了这个书签页，性质为自用，本着开源精神，文档会尽可能详细，有需要的话可以自己改改，欢迎提 issue 和 pr。

技术栈：TypeScript + React + TailwindCSS + TalerIcons(webfont)

## 获取

获取应用的方式有两种，下载 Release 或自编译获得最新的依赖。

### 下载 Release

前往 [Release](https://github.com/nek0x1a/bookmark/releases) 下载压缩包，并解压到任意位置，如 `/path/to/web`。

### 自编译

克隆本项目

```bash
git clone https://github.com/nek0x1a/bookmark.git
cd bookmark
```

安装依赖，你也可以使用其他的包管理器，如 yarn 等。

```bash
bun install
bun run build
```

生成的 dist 文件夹即为最终应用文件，移动并重命名到任意位置，如 `/path/to/web`。

#### 修改 base

如果部署的页面位于子路径下，如 `your.domain/bookmark`，则需要通过以下命令编译：

```bash
bun run tsc -b && bun run vite build --base=/bookmark
```

## 使用

本项目本质为一个静态网站，可通过 Caddy/Nginx 等搭建静态网站（不在乎隐私的话还可以直接放在 github 上用。~~应该没人这样用吧？~~）。

### 通过 Caddy

安装 Caddy，编写 `Caddyfile`：

```
# https
your.domain {
        # tls /path/to/cert/service.crt /path/to/cert/service.key
        root * /path/to/web
        file_server
}

# http
http://your.domain {
        root * /path/to/web
        file_server
}
```

### 通过 Nginx

安装 Nginx，编写 `/etc/nginx/conf.d/your-domain.conf`：

```
server{
    listen 80;
    server_name your.domain;
    location / {
        root /path/to/web;
        index index.html;
    }
}
```

## 通过 Github 部署 (演示用)

可以使用 Github Action 部署页面，详情见 `.github/workflows`。

克隆本项目，在仓库设置中修改 Pages 为通过 `Github Actions` 部署页面，推送到 `main` 分支即可部署到 Github。

## 书签配置

书签数据位于 `public/bookmarks.json`，或应用文件根目录中的 `bookmarks.json`，请按照模板修改。

字段具体要求请查看 `src/schema.json`。
`icon` 字段详见 [TalerIcons](https://tabler.io/icons)，找到图标后点击图标复制 `icon name`。

## Q & A

- 为什么只保证 350-1920 宽度的响应式设计？

因为几乎没有宽度小于 360 像素的屏幕，正常使用浏览器（chrome）窗口宽度最小为 500，并且不知为何在调试时，若宽度小于 327 左右时，html 元素的宽度会被压缩。

- 为什么不提供 Docker 镜像？

因为项目过小，并且由不会多人同时使用，鼠标点冒烟了并发也不过 10 QPS，还不如放在现有环境中，也就几行配置的事情。

- 为什么不提供个性化设置？

第一是没几个人用，第二是不想把基础类的工具做得太复杂了，第三是有需求的完全可以自己改，本项目的文旦我已经尽量写的非常详细了。
