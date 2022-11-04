---
title: java泛型
date: 2022-11-01
description: JavaGUI还是挺简单的，主要是写起来麻烦并且界面不是很好看。学习也是为了写工具。
keywords: JavaSE
cover: https://img.yublog.top/img/202211041259226.jpg
top_img: https://img.yublog.top/img/202211041259226.jpg
highlight_shrink: false
tags: 
	- java
	- 基础
	- 进阶
	- 泛型
categories: java相关
---

# 泛型
## 为什么需要泛型
1. 不能对加入到集合中的数据进行约束。
2. 遍历的时候，转型数据量大的时候，对效率有影响

## 泛型入门
```java
ArrayList<Dog> arrayList = new ArrayList<Dog>();
```
- 表示存放Dog类型
- 遍历的时候可以直接取出Dog对象

## 泛型简介
1. 泛型(E)又称参数化类型，Jdk5.0出现，解决数据类型的安全性问题
2. 在类声明或实例化时只要指定好需要的具体类型即可
3. Java泛型可以保证如果程序在编译时没有发出警告，运行时就不会产生ClassCastException异常
4. 泛型的作用：可以在类声明时通过一个标识表示类中某个属性的类型，或者是某个方法的返回值的类型，或者是参数类型
5. getClass()可以看到类型

### 语法
1. 泛型声明
	- interface接口<T>
	- class类<K,V>{}
2. T,K,V不代表值，而是表示一种类型，只能是引用类型，不能是基本数据类型
3. 泛型实例化
```java
List<String> strList = new ArrayList<String>();
Iterator<Customer> iterator = customers.iterator();
```
4. 指定泛型后可以传入该类型或其子类类型
5. 不指定时，默认是E，也就是Object

# 自定义泛型
## 类
### 基本语法
```java
class 类名<T,R...>{
	成员
}
```

### 注意
1. 普通成员可以使用泛型（属性，方法）
2. 使用泛型的数组不能初始化
3. 静态方法中不能使用泛型
4. 泛型类的类型是在创建对象时确定的
5. 如果在创建对象时没有指定类型，默认Object
## 接口
### 基本语法
```java
interface 接口名<T,R...>{}
```

### 注意
1. 接口中，静态成员也不能使用泛型
2. 泛型接口的定义，在继承接口或者实现接口时确定
3. 没有指定，默认Object

## 方法
### 基本语法
```java
修饰符 <T,R>返回类型 方法名(参数列表){}
```

### 注意
1. 泛型方法，可以定义在普通类中，也可以定义在泛型类中
2. 当泛型方法被调用时，类型会被确定
3. public void eat(Ee) 修饰符没有泛型，而是使用了泛型，使用泛型必须在类中定义

# 通配符
1. 泛型不具备继承性
List<Objetc> list = new ArrayList<String>()是错误的

2. <?>支持任意泛型类型
3. <? extends A>支持A类的子类，规定了泛型的上限
4. <? super A>直冲A类以及A类的父类，不限于直接父类，规定了泛型的下限 


