---
title: 环形队列数组
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、问题分析和优化
1. 队列数组，只能使用一次就不能用了，没有达到复用效果
2. 将这个数组使用算法，改进成一个环形队列。取模%

# 二、什么是环形队列
对前面的数组队列进行优化，充分利用数组，把数组看成一个环

# 三、数组模拟环形队列实现原理
1. front变量的含义进行调整：front直接指向队列的第一个元素，也就是所front=0
2. rear变量的含义进行调整：rear指向队列的最后一个元素的后一个位置，因为希望空出一个，rear=0
3. 队列满时的条件：**(rear+1)%maxSize == front**
4. 队列为空的条件：**rear == front**
5. 队列中的有效数据个数是：**(rear+maxSize-front)%maxSize**

# 四、代码实现

```java
package com.asaat;

import java.util.Scanner;

public class Dome01 {
    public static void main(String[] args) {
        // 队列测试
        CircularQueueArray circularQueueArray = new CircularQueueArray(4);
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
                        circularQueueArray.addQueue(x);
                    }catch (RuntimeException e){
                        System.out.println(e.getLocalizedMessage());
                    }
                    break;
                case 'g':
                    try {
                        int data = circularQueueArray.getQueue();
                        System.out.printf("取出的值为：%d\n",data);
                    }catch (RuntimeException e){
                        System.out.println(e.getLocalizedMessage());
                    }
                    break;
                case 's':
                    circularQueueArray.seeQueueArray();
                    break;
                case 'f':
                    circularQueueArray.seeNowFront();
                    break;
                case 'e':
                    loop =false;
                    System.out.println("退出成功");
                    break;
            }
        }
    }
}

class CircularQueueArray{
    @SuppressWarnings({"all"})
    private int maxSize;        // 队列最大容量
    private int rear;           // 队列输入指针 尾指针 默认0
    private int front;          // 队列输出指针 头指针 默认0
    @SuppressWarnings({"all"})
    private int[] circularQueueArray;   // 队列数组

    /**
     * 队列数组构造方法，初始化队列数组
     * @param circularQueueArrayMaxSize 队列数组的最大容量
     */
    public CircularQueueArray(int circularQueueArrayMaxSize){
        maxSize = circularQueueArrayMaxSize;
        circularQueueArray = new int[maxSize];
    }

    /**
     * 添加队列
     * @param x 值
     */
    public void addQueue(int x){
        if(isFull()){
            throw new RuntimeException("添加失败，队列已满");
        }
        circularQueueArray[rear] = x;
        // rear++; 因为要循环 所以不能用++ 要对其取模
        rear = (rear + 1) % maxSize;
    }

    /**
     * 判断队列是否已满
     * @return 满返回true
     */
    private boolean isFull(){
        return (rear + 1) % maxSize == front;
    }

    /**
     * 取出队列
     * @return 队列数据
     */
    public int getQueue(){
        if(isEmpty()){
            throw new RuntimeException("取出失败，队列已空");
        }
        int data = circularQueueArray[front];
        // front++; 因为循环，所以不能用++ 要对其取模
        front = (front + 1) % maxSize;
        return data;
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
        if(isEmpty()){
            System.out.println("队列已空");
            return;
        }
        for (int i = front; i < front + size(); i++) { // 注意：有效值和头指针相加才是从头指针开始遍历
            System.out.printf("%d=%d\n",i % maxSize,circularQueueArray[i % maxSize]);
        }
    }

    /**
     * 查看当前的输出指针
     */
    public void seeNowFront(){
        if(isEmpty()){
            System.out.println("队列已空");
            return;
        }
        System.out.printf("当前输出指针%d的值是：%d\n",front, circularQueueArray[front]);
    }
	
	/**
     * 计算队列有效值
     * @return 有效值
     */
    private int size(){
        return (rear + maxSize - front) % maxSize;
    }
}
```

