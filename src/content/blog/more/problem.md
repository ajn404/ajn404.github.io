---
title: 问题记录
pubDatetime: 2023-10-11 14:05:00
postSlug: problem
featured: false
draft: false
tags:
  - 遇到的问题
description: "遇到的问题记录"
---

## 目录

## echarts graph 关系图报错

<div class="red">
Cannot set properties of undefined (setting ‘dataIndex‘)
</div>

```js
links: [
  {
    source: 4,
    target: 3,
  },
];
```

改为

```js
links: [
  {
    source: "4",
    target: "3",
  },
];
```

## 在 React 中,useState 中的 setState 可能会出现延迟生效的情况,这通常是因为 React 的渲染周期和事件循环的运行周期不同步

当组件渲染时,React 会先执行 useState 中的 setState 操作,但是这个操作不会立即生效,而是会被延迟到下一个事件循环中执行.这是因为 React 的渲染周期是同步的,而事件循环是异步的,因此在事件循环中执行的 setState 操作可能会在下一个事件循环开始时生效.

为了避免这种情况,我们可以使用 useEffect 来处理 setState 的延迟生效问题.useEffect 会在组件渲染后执行传入的函数,通常用于处理副作用,如 setState 的副作用.

下面是一个简单的例子,展示了如何使用 useEffect 来确保 setState 的立即生效:

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Example;
```

在这个例子中,我们使用 useEffect 来处理 setCount 的副作用,确保在每次 setCount 时都立即执行副作用函数 console.log.这样就可以避免 setCount 的延迟生效问题.

## react 源码本地 npm i 报错`...Command failed: autoreconf -ivf...`

```shell
brew install autoconf automake libtool
```

autoreconf 是一个用于自动配置 GNU 软件包的工具,通常在安装或更新源代码包时会自动调用.

## gitaction 执行 build 命令报错`javascript heap out of memory`

一开始更改 action 中的 build 命令,添加[increase-memory-limit](https://www.npmjs.com/package/increase-memory-limit),命令中添加 cross-env,例如`cross-env LIMIT=2048 increase-memory-limit`,这样只是添加运行内存大小,并没有实质解决问题

后来分析提交的文件,才知道是 mdx 文件太大了,mdx 需要做很多 js 处理,如果不引入组件,其实完全没必要使用 mdx,改成 md 就好了

😭

不,并没好

**结果把 astro2 升级到 3 就好了**

## github访问问题

`sudo vim /etc/hosts`

```plaintext
140.82.112.4 github.com
140.82.113.3 gist.github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.111.153 assets-cdn.github.com
199.232.68.133 raw.githubusercontent.com
199.232.68.133 cloud.githubusercontent.com
199.232.68.133 camo.githubusercontent.com
199.232.68.133 avatars0.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars3.githubusercontent.com
199.232.68.133 avatars4.githubusercontent.com
199.232.68.133 avatars5.githubusercontent.com
199.232.68.133 avatars6.githubusercontent.com
199.232.68.133 avatars7.githubusercontent.com
199.232.68.133 avatars8.githubusercontent.com
```

清空dns缓存

`sudo killall -HUP mDNSResponder`

## webrtc/rtcp/uniapp

所以说,直接在浏览器中请求和解析 RTSP 流是比较困难的,通常需要通过中间服务器进行协议转换
uniapp的<video/>组件使用的bilibili/ijkplayer,集成FFmpeg 的 RTSP 解码器 (`libavformat`) 对 RTSP 流进行解析,将 RTSP 流转换为浏览器支持的格式,并在前端播放.
之前的webrtc说法,我想是需要一个媒体服务器（类似wvp),webrtc本身只是提供实时数据传输的api
