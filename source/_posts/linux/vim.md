---
title: Vim如此强大
date: 2022-11-04
description: Vim！学习linux的时候的一个分支，学习了基础操作，后期实际运用到需要再继续补充学习。
keywords: vim
cover: https://img.yublog.top/img/202211041102960.jpg
top_img: https://img.yublog.top/img/202211041102960.jpg
tags: 
	- Linux
	- 基础
	- vim
	- 编辑器
categories: Linux相关
---

# vi和vim
> 视频学习路径 https://www.bilibili.com/video/BV1NG4y1p74h
> 比较全 但是根据实际学习，一下学完可能记不住
## 什么是vi，vim
1. vi文本编辑器
2. vim具有程序编辑能力

## 四种模式
### 正常模式
默认按ESC进入
### 插入模式
按下i，I，o，O，a，A，r，R进入编辑模式
- a 在字符后插入
- i 在字符前插入
- o 下一行插入
- r 替换单个字符

- A 在一行的最后插入
- I 在一行的最前插入
- O 上一行插入
- R 从光标下的字符开始替换和插入

### 命令行模式
可进行输入命令
- 保存 :w :q
- 行号 :set nu
- 竖分屏 :vs
- 横分屏 :sp 
- 退出屏幕 :-q
- 替换 :% s/被替换/替换/g
- 语法高亮 :syntax on

### 可视化模式(Visual)
在常用模式下按
	- v 一个个选择
	- V 一行选择
	- ctrl + v 方块选择

## 模式切换
![](https://img.yublog.top/img/202211032010352.png)


# 插入模式
## 如何快速修正
1. ctrl+h 回退一个字母
2. ctrl+w 回退一个单词
3. ctrl+u 回退整行
## 快速退回normal模式
1. ctrl+c（不推荐）
2. ctrl+[（推荐）
## 快速在末尾编辑
1. gi
# 快速移动
## 上下左右移动
- h 左移
- l 右移
- j 下移
- k 上移
## 单词间快速移动
- w 跳到下一个单词的开头
- b 跳到上一个单词的开头
- e 跳到下一个单词的结尾
- 对应的大写是以空白符分割

## 行间搜索
- f{char} 移动到char字符上
- t{char} 移动到char的前一个字符
- 如果没有找到，分号;到下一个，逗号,到上一个
- F{char} 反向搜索

## 水平移动
- 0移动到行首，$移动到行尾

## 垂直移动
- ()在句子间移动
- {}在段落间移动

## 页面移动
- gg 移动到开头
- G 文件结尾
- ctrl+o 快速返回
- H/M/L 跳转到屏幕的开头，中间，结尾
- ctrl+u 上翻页
- ctrl+f 下翻页
- zz 把屏幕放中间

# 增删改查
## 插入
1. a i o r
2. A I O R

## 删除
- x快速删除字符
- d快速删除单词
- d和x可以搭配数字多次执行

## 修改
- r（replace）c（change），s（substitute）
- r可以替换一个字符，s替换并进入插入模式
- c 配合文本对象

## 查询
- /或者?进行前向或者反向搜索
- n/N跳转到下一个或者上一个匹配
- *或者# 进行当前单词的前向和后向匹配

# 搜索替换
使用substitute命令，支持正则
- [range]s[ubstitute]/{pattern}/{string}/[flags]
- range 表示范围 行 10,20 %表示全部
- pattern是要替换的模式
- string是替换后的文本
- flags
	g（global） 全局
	c（confirm）确认替换
	n（number）匹配数目


# 多文件编辑
## Buffer切换
1. :ls 列举当前缓冲区，:b n 跳转到第n个缓冲区
2. :bpre :bnext :bfirst :blast
3. :b buffer_name tab补全 

## Window窗口
1. ctrl+w s 水平分割 :sp
2. ctrl+w v 垂直分割 :vs
3. ctrl+w w/h/j/k/l 切换
4. ctrl+w = 等宽等高
5. ctrl+w _ 最大化活动窗口高度
6. ctrl+w | 最大化活动窗口宽度
7. [N]ctrl+w _ 把活动窗口高度设置为N行
7. [N]ctrl+w | 把活动窗口宽度设置为N行

## tab标签页
1. tabe[dit] {filename} 在新标签页中打开文件
2. ctrl+w+t 把当前窗口移到一个新标签页
3. tabc[lose] 关闭但钱标签页及其中的所有窗口
4. tabo[nly]  只保留活动标签页，关闭所有其他标签页
5. tabn[ext] {N} 切换到编号为n的标签页
6. tabn[ext]	切换到下一标签页
7. tabp[revious] 切换到上一标签页

# text Object
1. iw aw
2. vi+(等
![](https://img.yublog.top/img/202211041020595.png)

# 复制粘贴和寄存器
## normal模式下
1. 复制 y
2. 粘贴 p
3. 剪贴 d和p
4. 配合v使用
5. 配合文本对象使用 yiw复制一个单词，yy复制一行
6. 复制保持缩进
	- :set paste 和 :set nopaste
	- 恢复自动缩进 set autoindent

# 宏
1. 录制 q[name]
2. 结束 q
3. 使用 @[name]

# 补全 
1. ctrl+n和ctrl+p补全单词
2. ctrl+x和ctrl+f补全文件名
3. ctrl+x和ctrl+o补全代码，需要开启文件类型检查（set filetype），安装插件
