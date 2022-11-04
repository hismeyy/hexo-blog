---
title: Linux基础
date: 2022-11-03
description: 第一次系统学习Linux，最近趁着双十一也入手了一个服务器。可以学一学。
keywords: Linux
cover: https://img.yublog.top/img/202211031852716.jpg
top_img: https://img.yublog.top/img/202211031852716.jpg
tags: 
	- Linux
	- 基础
	- 操作系统
categories: Linux相关
---

# Linux目录结构
1. Linux世界中一切都是文件
2. /是根目录

3. 具体
	- /bin【常用】
		存放着最常用的指令
	- /sbin【常用】
		存放系统管理员使用的系统管理程序
	- /home【常用】
		存放普通用户的主目录，在Linux中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名
	- /root【常用】
		该目录为系统管理员，也称作超级权限者的用户主目录
	- /lib
		系统开机所需要的最基本的动态链接共享库，其作用类似于Windows里的DLL文件
	- /lost+found
		这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件
		
