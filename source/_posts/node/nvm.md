---
title: node版本管理工具-nvm
date: 2022-12-29
description: 多个项目同时进行最需要的node版本管理工具
keywords: nvm
tags: 
    - node
    - nvm
categories: node
---

# 一、前言
不知道大家是否遇到这个问题，同一台电脑同时开始两个项目，但是两个项目所用的node版本不同。如果你也遇到这样的事情，那我们非常需要nvm版本管理工具了！

# 二、什么是nvm
> nvm全英文也叫node.js version management，是一个nodejs的版本管理工具。nvm和n都是node.js版本管理工具，为了解决node.js各种版本存在不兼容现象可以通过它可以安装和切换不同版本的node.js。

# 三、安装nvm
1. 下载地址：https://github.com/coreybutler/nvm-windows/releases
2. 推荐下载：nvm-setup.exe
3. 进行安装：选择安装路径和node路径
4. 配置淘宝镜像：nvm安装目录下找到settings.txt
   ```
     root: nvm安装目录（默认）  
     path: nodejs安装目录（默认） 
     arch: 64 
     proxy: none
     node_mirror: https://npm.taobao.org/mirrors/node/
     npm_mirror: https://npm.taobao.org/mirrors/npm/
   ```

# 四、nvm使用
## 1、安装nodejs
```
 nvm install version    
```
版本可在node官网进行查看

## 2、切换nodejs版本
```
 查看所有nodejs版本
 nvm list
 切换nodojs命令
 nvm use version  
```

# 五、nvm环境配置
1. 我的电脑>属性>高级设置>环境变量>环境变量配置
2. 配置信息
    ```
    NVM_HOME = nvm安装目录          
    NVM_SYMLINK = nodejs安装目录
    Path = %NVM_HOME%;%NVM_SYMLINK%
   ```
