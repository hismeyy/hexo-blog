---
title: 队列数组
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、实际问题
1. 银行排队
2. 叫号系统

# 二、什么是队列
1. 队列是一个**有序列表**，可以用**数组**或**链表**来实现
2. 遵循**先入先出**的原则
![](https://img.yublog.top/img/202211051036840.png)
3. 图片说明
	- maxSize是该队列的最大容量
	- front是输出指针，会随着输出而改变
	- rear是输入指针，会随着输入而改变

# 三、数组模拟队列原理
1. 创建一个队列数组（QueueArray）对象，定义其属性maxSize，front，rear，queueArray
2. 定义QueueArray构造方法，对QueueArray进行初始化
3. 定义addQueue方法，在添加时，对Queue进行判断是否已满（isFull）
	- 当rear == maxSize-1时，队列已满
	- 当队列未满时，数据添加在rear+1的指向处
4. 定义getQueue方法，在取出时，对Queue进行判断是否为空（isEmpty）
	- 当front == rear时，队列为空
	- 当队列不为空时，数据从front+1的指向处取出

# 四、代码实现

```java
package com.dsaat;

import java.util.Scanner;

public class Dome01 {
    public static void main(String[] args) {
        // 队列测试
        QueueArray queueArray = new QueueArray(3);
        Scanner scanner = new Scanner(System.in);
        char c;
        boolean loop = true;
        while(loop){
            System.out.println("a(add)添加队列");
            System.out.println("g(get)取出队列");
            System.out.println("s(see)查看队列");
            System.out.println("f(front)查看输出指针");
            System.out.println("e(exit)退出");
            System.out.println("------------------------------");
            System.out.print("请输入：");
            c = scanner.next().charAt(0);
            switch (c){
                case 'a':
                    System.out.print("请输入你要添加的值：");
                    int x = scanner.nextInt();
                    try {
                        queueArray.addQueue(x);
                    }catch (RuntimeException e){
                        System.out.println(e.getLocalizedMessage());
                    }
                    break;
                case 'g':
                    try {
                        int data = queueArray.getQueue();
                        System.out.printf("取出的值为：%d\n",data);
                    }catch (RuntimeException e){
                        System.out.println(e.getLocalizedMessage());
                    }
                    break;
                case 's':
                    queueArray.seeQueueArray();
                    break;
                case 'f':
                    queueArray.seeNowFront();
                    break;
                case 'e':
                    loop =false;
                    System.out.println("退出成功");
                    break;
            }
        }
    }
}

/**
 * 定义队列对象
 */
class QueueArray{
    private int maxSize;        // 队列最大容量
    private int rear;           // 队列输入指针
    private int front;          // 队列输出指针
    private int[] queueArray;   // 队列数组

    /**
     * 队列数组构造方法，初始化队列数组
     * @param queueArrayMaxSize 队列数组的最大容量
     */
    public QueueArray(int queueArrayMaxSize){
        maxSize = queueArrayMaxSize;
        rear = -1;
        front = -1;
        queueArray = new int[maxSize];
    }

    /**
     * 添加队列
     * @param x 值
     */
    public void addQueue(int x){
        if(isFull()){
            throw new RuntimeException("添加失败，队列已满");
        }
        rear++;
        queueArray[rear] = x;
    }

    /**
     * 判断队列是否已满
     * @return 满返回true
     */
    private boolean isFull(){
        return rear == maxSize -1;
    }

    /**
     * 取出队列
     * @return 队列数据
     */
    public int getQueue(){
        if(isEmpty()){
            throw new RuntimeException("取出失败，队列已空");
        }
        front++;
        return queueArray[front];
    }

    /**
     * 判断队列是否为空
     * @return 空返回true
     */
    private boolean isEmpty(){
        return front == rear;
    }


    /**
     * 查看队列数组
     */
    public void seeQueueArray(){
        for (int i = 0; i < queueArray.length; i++) {
            System.out.printf("%d=%d\n",i,queueArray[i]);
        }
    }

    /**
     * 查看当前的输出指针
     */
    public void seeNowFront(){
        System.out.printf("当前输出指针=%d\n",front);
    }
}
```

