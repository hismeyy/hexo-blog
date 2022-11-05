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

# 登录重启注销
## 关机重启
- shutdown -h now 立刻关机
- shutdown -h 1 "通知信息，1分钟后关机"
- shutdown -r now 立刻重启
- halt 关机
- reboot 重启
- sync 把内存数据存到磁盘

## 登录和注销
1. 进root时可以用普通用户登录后，用su -用户名 进行切换身份
2. logout注销

# 用户管理
## 添加用户
useradd 用户名
- 创建成功后，会自动创建和用户名同名的家目录
- 也可以通过useradd -d 指定目录 新的用户 给新建用户指定家目录

## 设置密码
passwd 用户名
补充：pwd显示当前所在的目录

## 删除用户
userdel 用户
- 保留家目录 userdel 用户
- 不保留家目录 userdel 用户 -r 家目录

## 查询用户信息
id 用户名

## 切换用户
su -用户名
exit/ logout退出

## 查看当前用户信息
who am i

## 用户组
1. 添加组 groupadd 组名称
2. 删除组 groupdel 组名称
3. 指定用户组 useradd -g 用户组 用户名
4. 修改用户组 usermod -g 用户组 用户名

5. 用户和组相关文件
	- /etc/passwd文件 用户user的配置文件，记录用户的各种信息
	每行的含义：用户名：口令：用户标识号：组标识号：注释性描述：主目录：登录Shell（我国用bash）
	- /etc/shadow文件，口令配置文件
	每行的含义：登录名：加密口令：最后一次修改时间：最小时间间隔：最大是按间隔：警告事件：不活动时间：失效时间：标志
	- /etc/group文件：组的配置文件，机理Linux包含的组的信息
	每行的含义：组名：口令：组标识号：组内用户列表

# 实用指令
