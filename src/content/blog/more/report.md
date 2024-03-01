---
author: ajn404
pubDatetime: 2024-03-01T14:57:54.000Z
title: 报告
featured: false
draft: false
tags:
  - report
  - 2024-03
  - vue
description: 个人报告
---

## 目录

# 关于纯vue2的微前端项目增删改查的粗略讲解及演示

## [关于vue](https://v2.vuejs.org/)

Vue.js 是一款用于构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

Vue 的核心特性包括：

- 数据绑定：Vue 提供了简单易用的数据绑定语法，可以自动将数据更新到视图中。
- 组件：Vue 组件是可复用的 UI 元素，可以将复杂的 UI 拆解成多个小的易于管理的组件。
- 路由：Vue Router 是 Vue 官方提供的路由管理库，可以帮助你构建单页应用。
- 状态管理：Vuex 是 Vue 官方提供的状态管理库，可以帮助你管理应用中的状态。

Vue 2 是 Vue 的第一个主要版本，于 2016 年发布。Vue 2 的主要特性包括：

- 模块化：Vue 2 引入了模块化机制，可以将代码组织成多个模块，方便代码管理和维护。
- 性能优化：Vue 2 对核心代码进行了优化，提高了运行性能。
- 新特性：Vue 2 新增了一些新特性，例如插槽、自定义指令、过渡动画等。

Vue 是目前最受欢迎的前端框架之一，已经被广泛应用于各种项目中。如果你正在寻找一款易于学习、使用和扩展的前端框架，Vue 是一个不错的选择。

以下是一个Vue 2组件 demo：

```vue
<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.text }}</li>
    </ul>
    <input type="text" v-model="text" />
    <p>{{ text }}</p>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "Vue 2 Demo",
      message: "Hello World!",
      count: 0,
      list: [
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
      ],
      text: "",
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    submit() {
      console.log(this.text);
    },
  },
};
</script>

<style>
.app {
  font-family: sans-serif;
  text-align: center;
}
</style>
```

这个 demo 包含了 Vue 2 的以下特性：

- 数据绑定：
  - 插值表达式：{{ title }}、{{ message }}
  - v-model 指令：v-model="text"
- 条件渲染：
  - v-if 指令：
    ```html
    <div v-if="count > 0">The count is greater than 0.</div>
    ```
  - v-else 指令：
    ```html
    <div v-else>The count is less than or equal to 0.</div>
    ```
- 循环渲染：
  - v-for 指令：v-for="item in list"
- 事件处理：
  - @click 指令：
    ```html
    <button @click="increment">+</button> <button @click="decrement">-</button>
    ```
  - v-on 指令：
    ```html
    <input type="text" v-on:input="text = $event.target.value" />
    ```
- 组件：
  - 这个 demo 本身就是一个组件

## Vue 组件的概念

Vue 组件是 Vue.js 中最强大的功能之一，可以将一些可重用的代码进行封装，以实现代码的复用和维护。

### 组件的定义

Vue 组件可以定义为一个包含以下内容的 JavaScript 对象：

- **name**：组件名称，必须是一个字符串，且不能包含空格。
- **template**：组件的模板，可以是 HTML 字符串或一个渲染函数。
- **data**：组件的数据，可以是一个函数或一个对象。
- **props**：组件的属性，可以是一个对象或一个数组。
- **methods**：组件的方法，可以是一个对象。
- **watch**：监听数据变化并执行回调函数。
- **computed**：计算属性。
- **lifecycle**：组件的生命周期钩子函数。

### 组件的注册

Vue 组件可以全局注册或局部注册。

- **全局注册**：使用 Vue.component() 方法将组件注册为全局组件，可以在任何 Vue 实例中使用。
- **局部注册**：在 Vue 实例的 components 选项中注册组件，只能在该 Vue 实例及其子组件中使用。

### 组件的使用

Vue 组件可以使用以下方式使用：

- **在模板中使用**：使用 `<component>` 标签或 `<template>` 标签的 is 属性引用组件。
- **在 JavaScript 代码中使用**：使用 Vue.component() 方法获取组件构造函数，然后使用 new 操作符创建组件实例。

### 组件的优势

Vue 组件具有以下优势：

- **代码复用**：可以将可重用的代码封装成组件，以提高代码的复用率。
- **代码维护**：可以将代码组织成多个组件，以提高代码的维护性。
- **可扩展性**：可以创建自定义组件来扩展 Vue 的功能。

### 总结

组件是 Vue.js 中一个非常重要的概念，可以帮助你构建更复杂、更可维护的应用程序。

## 微前端

[micro-app是京东零售推出的一款微前端框架，它基于类WebComponent进行渲染，从组件化的思维实现微前端，旨在降低上手难度、提升工作效率。它是目前接入微前端成本最低的框架，并且提供了JS沙箱、样式隔离、元素隔离、预加载、虚拟路由系统、插件系统、数据通信等一系列完善的功能。
micro-app与技术栈无关，对前端框架没有限制，任何框架都可以作为基座应用嵌入任何类型的子应用](https://github.com/micro-zoe/micro-app/blob/HEAD/README.zh-cn.md)

例如主应用中

```vue
<micro-app url="http://localhost:3333" name="micro-app-demo"></micro-app>
```
