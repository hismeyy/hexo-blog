---
title: 搭建博客
date: 2022-10-1
description: 用Hexo-GitHub-Vercel一同搭建。中间遇到了很多的问题，大概用了一天才解决。所以把他记录下来，
keywords: 博客搭建
cover: /img/blog/blog-top-img.jpg
top_img: /img/blog/blog-top-img.jpg
highlight_shrink: false
---


> 我一点也不想写详细的教学文档，在我看来，他一点意义也没有。你可以根据我的提示，根据文档内容。慢慢的安装，遇到问题可以一起交流。直接抄作业。no！
> 在折腾中长大！无数的失败，你就会成功。

# 一、前期准备
## 1、需要的文档
1. [Hexo官方文档](https://hexo.bootcss.com/docs/)
2. [Butterfly主题文档](https://butterfly.js.org/)

## 2、需要的网站
1. [GitHub](http://www.github.com)
2. [Vercel](https://vercel.com/)

## 3、需要的工具
1. [Git](https://git-scm.com/download)
2. [Node.js](http://nodejs.cn/download/)

## 4、注意
1. 网页无法打开，需要科学上网
1. 工具无法下载，需要科学上网
1. 框架无法安装，需要科学上网

# 二、前期搭建
## 1、 Vercel搭建
1. 注册一个Vercel
2. 在模板中创建一个Hexo项目
3. 选择自己的GitHub仓库
4. 公有私有都可以。点击create创建
5. 等待几分钟，会跳转到成功的界面

## 2、Vercel域名绑定
1. 如果你没有域名可以跳过直接看3

2. 跳转到成功页面后，会有一个自定义域名的链接

3. 进入后输入自己的域名即可

4. 注意

   - Vercel被墙，所以直接访问他所提供的域名时，需要科学上网
   - 添加自己的域名时，需要在域名管理后台的域名解析中添加两条记录

5. 在域名解析中添加记录

   > 记录类型：A				 记录值：76.223.126.88
   >
   > 记录类型：CNAME 	记录值：cname-china.vercel-dns.com


6. 点击添加，如果看到全部都是对勾，说明添加成功。
6. 成功后，访问自己的域名，看看是否可以访问，速度是否OK

## 3、搭建本地Hexo框架

1. 进入自己的GitHub仓库，找到刚刚创建的Hexo项目
2. clone到本地
3. 进入本地项目后，根据hexo官方文档，安装hexo框架
4. 安装成功后，进入本地Hexo项目，在cmd中输入```npm install```等待安装
5. 安装成功后，可以使用hexo的命令，看看本地访问hexo项目是否正常
6. 如果正常的话，说明这一步成功。
7. 注意
   - 安装hexo框架必须安装node.js
   - 国内使用node.js比较拉跨，因此改一下node的源就可以啦！[看这里](https://cloud.tencent.com/developer/article/1798160)

# 三、美化主题

## 1、下载Butterfly主题

1. 打开Butterfly主题文档，进入快速安装，根据博客文档内容进行安装
2. 注意
   - 最好用GitHub仓库东西，为了追求快，用过两次Gitee，在修改导航栏时一直出现问题

## 2、 美化主题

1. 主题下载ok后，根据Butterfly主题文档，按照自己的需求进行配置主题。自己折腾就好啦！

# 四、更新博客

## 1、Push本地仓库

1. 博客写完后使用Git命令把本地Hexo项目Push到GitHub仓库
2. 过一小会会Vercel会自动更新

