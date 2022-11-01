---
title: JavaGUI
date: 2022-10-05
description: JavaGUI还是挺简单的，主要是写起来麻烦并且界面不是很好看。学习也是为了写工具。
keywords: JavaSE
cover: https://img.yublog.top/img/202211012218532.jpg
top_img: https://img.yublog.top/img/202211012218532.jpg
highlight_shrink: false
tags: 
	- java
	- 基础
	- 入门
	- GUI
categories: java相关
---


# 简介
1. Gui核心：Swing，AWT
2. 缺点
	1. 界面不好看
	2. 需要jre环境
3. 为什么要学习Gui？
	1. 可以写一些小工具
	2. 可能会维护到Swing界面
	3. 了解MVC架构，了解监听

# AWT
## 结构
![](https://img.yublog.top/img/202211011226042.png)

## 组件和容器
### 第一个窗口程序
1. new Frame
2. 设置可见性 setVisible(true)
3. 设置窗口大小 setSize()
4. 设置背景颜色 setBackground(new Color())
5. 设置初始位置 setLocation()
6. 设置大小固定 setResizable()
7. 设置布局 setLayout()
8. 设置大小和坐标 setBounds()

### 创建多个窗口
1. 进行封装

### 面板Panel
1. new Panel
2. 调用frame的add()可以把panel放入

### 组件
1. 按钮		Button
2. 输入框	TextField
3. 标签		Label

### 布局管理器
1. 分类
	- 流式布局	FlowLayout
		需要在setLayout中new
	- 东南西北中	BorderLayout	
		添加的时候指定
	- 表格布局	GridLayout
		需要在setLayout中new
	- 绝对布局
		null

### 事件监听
1. 按下按钮：addActionListener()

### 画笔
在frame中重写paint方法

### 鼠标监听
addMouseListener()

### 窗口监听
addWindowListener()

### 键盘监听
addKeyListener()

#Swing
## Swing说明
封装了AWT，比AWT更好看

## 窗口和面板

### 关闭事件
可以直接调用setDefaultCloseOperation()设置关闭事件

### 获取容器
getContentPane()

### 弹窗
1. 设置按钮监听事件
2. 提供弹窗类需要继承JDialog

### 组件
1. 标签		Label
2. 面板		JPanel和JScroll
3. 按钮
	- 单选		JRadioButton需要分组ButtonGroup
	- 复选		JCheckBox
4. 列表
	- 下拉框	JComboBox
	- 列表框	JList
5. 文本框	
	- 文本框	JTextField
	- 密码框	JPasswordField	
	- 文本域	JTextArea


> GUI笔记大概OK，后续可能会有点添加，方法涉及太多，结合百度。冲！！！
