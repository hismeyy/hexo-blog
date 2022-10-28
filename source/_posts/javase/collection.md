---
title: Java集合框架
date: 2022-10-3
description: 第一次学习集合是看着老杜的视频，当时看的时候有点懵，草草的就过了。第二次是看着韩顺平的视频，不得不说非常详细。
keywords: JavaSE
cover: https://img.yublog.top/img/202210280800752.jpg
top_img: https://img.yublog.top/img/202210280800752.jpg
tags: 
	- java
	- 进阶
	- 集合
categories: java相关
---

# 集合的好处
## 数组
1. 长度指定后，不能更改
2. 元素单一
3. 增加删除元素比较麻烦

## 数组扩容
1. 创建新的数组
2. 拷贝原先数组
3. 添加新的数组元素

## 集合
1. 动态保存任意多个对象
2. 提供了很多操作对象的方法
3. 添加，删除新的元素代码更简介

# 集合的框架体系
![](https://img.yublog.top/img/202210280812299.png)
![](https://img.yublog.top/img/202210280814241.png)
## 集合分类
1. 单列集合
	- 放单个对象
	- Collection接口两个重要的子类List Set 这就是单列集合
2. 双列集合
	- 放键值对
	- Map接口的实现子类是双列集合 存放K-V

# Collection接口
## Collection实现类的特点
1. 可以存放多个元素，每个元素可以是Object
2. 有些可以存放重复元素，有些不可以
3. 有些是有序的（List），有些事无序的（Set）
4. COllection接口没有直接的实现子类，是通过他的子接口List和Set来实现的

## Collection常用方法
1. add——添加单个元素
2. remove——删除指定元素
3. contains——查找元素是否存在
4. size——获取元素个数
5. isEmpty——判断是否为空
6. clear——清空
7. addAll——添加多个元素
8. containsAll——判断多个元素是否都存在
9. removeAll——删除多个元素

## 迭代器遍历
### 迭代器说明
1. Iterator对象是迭代器，可以用来遍历集合元素
2. 所有实现Collection接口的集合都有一个Iterator()方法，用以返回一个迭代器
3. Iterator用于遍历集合，本身不存放对象

### 迭代器执行原理
1. 得到一个集合的迭代器
	```java
	Iterator iterator = coll.iterator();
	```

2. hasNext()判断是否还有下一个元素
	```java
	while(iterator.hasNext()){}
	```

3. 调用next()返回指针指向的集合元素，并且把指针向下移动
	```java
	iterator.next();
	```
	**注意：如果找不到集合元素会抛出NoSuchElementException异常**

4. 重置iterator()
	为了把指针放到开头
	```java
	iterator = coll.iterator();
	```

## 增加For循环
1. 可以在COllection中使用，也可以在集合中使用
2. 底层实际上也是迭代器
3. 简化版的迭代器遍历
4. 代码
	```java
	for(Object obj : col){
		
	}
	```

# List接口
## List基本介绍
1. List集合中的元素是有序的，添加和取出的顺序是一致的，而且元素可以重复
2. List集合中的每一个元素都有其对应的顺序索引

## List常用方法
1. add(int index, Object ele)——在index位置插入ele元素
2. addAll(int index, Collection eles)——在index位置将所有的eles元素加进来
3. get(int index)——获取指定索引的元素
4. indexOf(Object obj)——返回obj首次出现的位置
5. lastIndexOf(Object obj)——返obj末次出现的位置
6. remove(int index)——移除指定索引的元素
7. set(int index, Object ele)——修改指定索引的元素

## List的三种遍历方式
1. 迭代器
2. 增强for
3. 使用普通for

# ArrayList
## ArrayList注意
1. 可以加入null，并且是多个
2. ArrayList是由数组来实现存储数据的
3. ArrayList基本等同于Vector，除了ArrayList是线程不安全，前面没有加synchronized关键字（效率比较高），多线程考虑用Vector

## ArrayList源码分析结论
1. ArrayList中维护了一个Object类型的数组elementData，transient Object[] elementData;
	transient 表示瞬间，短暂的，表示该属性不会被序列化
2. 创建ArrayList对象时，如果使用无参构造器，则初始elemetData容量为0，第1次添加，扩容到10，如再次扩容，则扩容1.5倍
3. 如果使用指定大小的构造器，初始化大小为指定大小，扩容时，直接按1.5倍扩容

## ArrayList源码分析
```java
// 测试代码
ArrayList arrayList = new ArrayList();
for(int i = 0; i < 10; i++){
	arrayList.add(i);
}
```
### ArrayList无参构造分析
1. 调用ArrayList的无参构造，并且初始化elementData
	![](https://img.yublog.top/img/202210281335866.png)
	- DEFAULTCAPACITY_EMPTY_ELEMENTDATA是一个空数组

2. 初始化完毕后，进入for循环，对i进行包装
	![](https://img.yublog.top/img/202210281337522.png)

3. 调用add方法
	![](https://img.yublog.top/img/202210281339823.png)

4. ensureCapacityInternal()确认要不要扩容
	![](https://img.yublog.top/img/202210281345169.png)
	- 调用ensureExplicitCapacity()肯定容量
	- 肯定容量之前调用calculateCapacity来计算容量

5. 计算容量
	![](https://img.yublog.top/img/202210281349031.png)
	- 如果elementData是一个空数组则返回一个较大的容量
	- DEFAULT_CAPACITY = 10

6. 计算完容量后，调用ensureExplicitCapacity
	![](https://img.yublog.top/img/202210281353962.png)
	- modCount++ 是计算修改的次数，防止多线程修改
	- minCapacity - elementData.length > 0 是当前集合容量是否满足最小容量
	- 不满足时，调用grow()进行扩容

7. 真正的扩容grow
	![](https://img.yublog.top/img/202210281357762.png)
	- newCapacity = oldCapacity + (oldCapacity >> 1) 新容量等于旧容量加旧容量的0.5倍
	- 如果计算后的新容量不够最小需要的容量，则把新容量直接变成最小需要的容量
	- 如果新容量的大小比规定数组的大小还大，则使用hugeCapacity()方法进行处理
	- 最终，调用数组的copyOf进行扩容，调用此方法的目的是，防止原来的数据丢失

8. elementData扩容完毕，进行返回
	![](https://img.yublog.top/img/202210281339823.png)
	- elementData[size++] = e 对elementData以size为下标，进行赋值然后size++，目的是让下标后移一位

### ArrayList的有参构造
1. 调用ArrayList的有参构造，并且初始化指定容elementData
	![](https://img.yublog.top/img/202210281425003.png)

# Vector
## Vector注意
1. Vector底层也是对象数组
2. Vector时线程同步的，即线程安全，Vector类的操作方法带有synchronized
3. 在开发中，需要线程同步安全，考虑使用Vector

## Vector和ArrayList比较
1. 底层都是可变数组
2. ArrayList是1.2出现的，Vector是1.0出现的
3. ArrayList是线程不安全的，但是效率高。Vector是线程安全的，但是效率低
4. ArrayList有参扩容是1.5倍，无参扩容第一次是10，第二次以后是1.5倍
	Vector有参扩容是2倍，无参扩容第一次是10，第二次以后是2倍

# LinkedList
## LinkedList说明
1. 底层实现了一个**双向链表**和**双端队列**特点
2. 可以添加任意元素，可以重复，包括null
3. 线程不安全，没有实现同步

## LinkedList底层结构
1. LinkedList底层维护了一个双向链表
2. LinkedList中维护了两个属性first和last分别指向首节点和尾节点
3. 每个节点(Node对象)，里面又维护了prev，next，item三个属性，其中通过prev指向前一个节点，通过next指向后一个节点。最终实现双向链表
4. 所以LinkedList的元素的添加和删除，不是通过数组完成的，相对来说效率高
![](https://img.yublog.top/img/202210281457679.png)

## LinkedListCRUD源码分析
### add()
1. 调用LinkList无参构造。这时，LinkList的属性first=null，last=null
2. 执行添加add
3. 将新的结点加入到双向链表的最后

### remove()
1. 默认删除第一个
2. unlinkFirst()删除元素的核心
	- 把第一个的last变成null，就不会指向下一个节点
	- 把farst指向下一个节点
	- 把下一个节点的prev变成null，就不会指向上一个节点
	- 这时候所有删除的节点，farst不指向他，last=null，下一个节点也不指向他，他就会被GC回收

### set()
1. set(int index, Object obj)

### get()
1. get(int index)

# 实际开发中的选择
## ArratList和LinkedList的比较
1. ArrayList底层结构是可变数组，LinkedList底层结构是双向链表
2. ArrayList增删效率低，因为要数组扩容。LinkedList增删效率高，通过链表追加
3. ArrayList改查效率高，LinkedList改查效率低

## 选择
1. 如果改查多，选择ArrayList
2. 如果增删多，选择LinkedList