---
title: Thymeleaf
date: 2022-11-19
description: 学习SpringMVC时，用到了Thymeleaf模板引擎，借此机会也系统看一下，并记录一下笔记。
keywords: Thymeleaf
cover: https://img.yublog.top/img/202211181719442.jpg
top_img: https://img.yublog.top/img/202211181719442.jpg
tags: 
	- 前端
	- 模板引擎
	- Thymeleaf
categories: 前端模板引擎
---

# 一、thymeleaf简介

> thymeleaf官网：https://www.thymeleaf.org/

Thymeleaf 是模板引擎，可以完全替代 JSP 。

>  看到介绍 Velocity、FreeMarker 也是模板引擎，现在还不知道，未来可以学一学

特点：

1. Thymeleaf 在有网络和无网络的环境下皆可运行
2. Thymeleaf 开箱即用的特性。它提供标准和spring标准两种方言，可以直接套用模板实现JSTL、 OGNL表达式效果，避免每天套模板、该jstl、改标签的困扰。同时开发人员也可以扩展和创建自定义的方言。
3. Thymeleaf 提供spring标准方言和一个与 SpringMVC 完美集成的可选模块，可以快速的实现表单绑定、属性编辑器、国际化等功能。
4. thymeleaf与jsp有点相似都是渲染模板，不同的是jsp，在没有启动服务器的时候是不能正常访问的，但是thymeleaf是在不启动Tomcat也能正常访问，jsp对页面的侵入性大，thymeleaf对页面的侵入小，在不影响到原页面的样式的情况下渲染数据。

# 二、依赖引入

Maven

```xml
<!-- https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf -->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf</artifactId>
    <version>3.0.11.RELEASE</version>
</dependency>
```

SpringBoot

```xml
<!--thymeleaf模板-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

html页面（两个都可以）

```html
<html lang="en"  xmlns:th="http://www.thymeleaf.org">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
```

# 三、使用

## 3.1 常用标签

| 标签  | 作用   | 示例                         |
| ----- | ------ | ---------------------------- |
| th:id | 替换id | ```<input th:id="${user.id}"/>``` |
| th:text | 文本替换 | ```<p text:="${user.name}">bigsai</p>``` |
| th:utext | 支持html的文本替换 | ```<p utext:="${themlcontent}">content</p>``` |
| th:object | 替换对象 | ```<di th:object=${user}></div>``` |
| th:value | 替换值 | ```<input th:value="${user.name}" >```                                        |
| th:each | 迭代 | ```<tr th:each="student:${user}" >``` |
| th:href | 替换超链接 | ```<a th:href="@{index.html}">超链接</a>``` |
| th:src | 替换资源 | ```<script th:src="@{index.js}"></script>``` |

## 3.2 链接表达式

CSS资源

```html
<link rel="stylesheet" th:href="@{index.css}">
```

引入JavaScript

```htmle
 <script type="text/javascript" th:src="@{index.js}"></script>
```

超链接

```html
<a th:href="@{index.html}">超链接</a>
```

## 3.3 变量表达式

### 取普通字符串
如果在controller中的Model直接存储某字符串，我们可以直接`${对象名}`进行取值。

### 取JavaBean对象
因为JavaBean自身有一些其他属性，所以咱们就可以使用`${对象名.对象属性}`或者`${对象名['对象属性']}`来取值，除此之外，如果该JavaBean如果写了get方法，也可以通过get方法取值例如`${对象.get方法名}`

### 取List集合(each)
因为List集合是个有序列表，里面内容可能不止一个，你需要遍历List对其中对象取值，而遍历需要用到标签：`th:each`,具体使用为` <tr th:each="item:${userlist}">`,其中item就相当于遍历每一次的对象名，在下面的作用域可以直接使用，而userlist就是你在Model中储存的List的名称。

```html
<table>
    <tr th:each="item:${userlist}">
        <td th:text="${item}"></td>
    </tr>
</table>
```

### **取Map**
很多时候我们不存JavaBean而是将一些值放入Map中，再将Map存在Model中，我们就需要对Map取值，对于Map取值你可以`${Map名['key']}`来进行取值。也可以通过`${Map名.key}`取值，当然你也可以使用`${map.get('key')}`(java语法)来取值

### 遍历Map

和List相似的遍历方法，使用`th:each="item:${Map名}"`进行遍历，在下面只需使用`item.key`和`item.value`即可获得值

## 3.4 选择变量表达式

变量表达式不仅可以写成${...}，而且还可以写成*{...}。

但是，有一个重要的区别

星号语法对选定对象而不是整个上下文评估表达式。也就是说，只要没有选定的对象，美元(`${…}`)和星号(`*{...}`)的语法就完全一样。

## 3.5 消息表达

文本外部化是从模板文件中提取模板代码的片段，以便可以将它们保存在单独的文件(通常是.properties文件)中，文本的外部化片段通常称为“消息”。通俗易懂的来说`#{…}`语法就是用来**读取配置文件中数据**的。在Thymeleaf你可以使用`#{...}`语法获取消息，
