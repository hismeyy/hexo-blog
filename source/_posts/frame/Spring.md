---
title: Spring6
date: 2022-11-20
description: 第二次学习Spring，看到老杜视频更新，最新的Spring教程视频。复习一下。
keywords: Spring
cover: https://img.yublog.top/img/202210311034957.jpg
top_img: https://img.yublog.top/img/202210311034957.jpg
tags: 
	- java
	- 框架
	- Spring
categories: Java-框架相关
---

# Spring启示录
## OCP开闭原则
OCP是七大开发原则中的最基本的一个原则，开闭原则对扩展开发，对修改关闭。
## DIP依赖倒置原则
面向接口编程，面向抽象编程，不要面向具体编程，目的是降低耦合度，提高扩展力
## 控制反转
控制反转：IOC（Inversion of Control）。把创建对象和对象的维护交出去。
## Spring框架
1. Spring框架采用**依赖注入(DI)**的方式实现了控制反转IOC
	- Spring帮忙new对象
	- Spring帮忙维护对象和对象之间的关系
2. Spring框架DI的两种方式
	- Set注入
	- 构造方法注入

# Spring概述
## Spring简介
1. Spring是一个开源框架，是由Rod Johnson创建，他是一个为解决企业应用开发的复杂性而创建的
2. SPring是一个轻量级的控制反转(Ioc)和面向切面(AOP)的容器框架
3. Spring最初出现是为了解决EJB臃肿的设计，以及难以测试等问题
4. Spring为简化开发而生，可以让程序员只需要关注核心业务的实现，尽可能的不在关注非业务逻辑代码(事务控制，安全日志等)

## Spring8大模块
![](https://img.yublog.top/img/202210311126388.png)

## Spring特点
1. 轻量
	- 大小和开销都是轻量的
	- Spring是非侵入式的，Spring中的对象不依赖于Spring的特定类
2. 控制反转
3. 面向切面
4. 容器
	- Spring包含并管理应用对象的配置和声明周期
5. 框架
	Spring可以将简单的组件配置，组合成为复杂的应用

# Spring的入门





