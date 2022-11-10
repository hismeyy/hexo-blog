---
title: 数组栈
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、实际需求
1. 输入一个表达式 [7*2*2-5+1+3]计算结果
2. 子程序的调用，在跳往子程序前，会先将下一个指令的地址存在堆栈中，直到子程序执行完后再将地址取出，以回到原来的程序中
3. 处理递归调用
4. 表达式的转换[中缀表达式转换后缀表达式]与求值（实际问题）
5. 二叉树的遍历
6. 图像的深度优先（depth-first）搜索法

# 二、什么是栈
1. 英文（Stack）
2. 栈是**先入后出**的有序列表
3. 栈是限制线性表中元素的插入和删除之恶能在线性表的同一端进行的一种特殊的线性表，允许插入和删除的一端，称为栈底（Bottome）
4. 根据栈的定义可知，最先放入栈中的元素在栈底，最后放入的元素在栈顶，而删除元素刚好相反，最后放入的元素最先删除，最先放入的元素最后删除。
![](https://img.yublog.top/img/202211092304730.png)
![](https://img.yublog.top/img/202211092305406.png)
# 三、栈用数组实现原理
1. 定义一个栈，设置top=-1

2. push方法 判断栈是否已满top==maxSize-1，如果未满，top+, stack[top] = data;

3. pop方法 判断栈是否已空top==-1，如果未空，x = stack[top], top--

4. 代码实现

   ```java
   package com.dsaat;
   
   import java.util.Arrays;
   
   public class Dome01 {
       public static void main(String[] args) {
           ArrayStack stack = new ArrayStack(5);
           // 测试
           stack.push(1);
           stack.push(2);
           stack.push(3);
           stack.push(4);
           stack.push(5);
           stack.push(6);
           System.out.println(stack);
           System.out.println(stack.pop());
           System.out.println(stack.pop());
           System.out.println(stack.pop());
           System.out.println(stack.pop());
           System.out.println(stack.pop());
           System.out.println(stack.pop());
       }
   }
   
   class ArrayStack{
       private int top = -1;
       private int maxSize;
       private int[] stack;
   
       public ArrayStack(int maxSize) {
           this.maxSize = maxSize;
           stack = new int[this.maxSize];
       }
   
       /**
        * 栈是否满
        */
       private boolean isFull(){
           return top == maxSize - 1;
       }
   
       /**
        * 栈是否空
        */
       private boolean isEmpty(){
           return top == -1;
       }
   
       /**
        * 压栈
        * @param data 栈数据
        */
       public void push(int data){
           if(isFull()){
               System.out.println("栈已满!");
               return;
           }
           top++;
           stack[top] = data;
       }
   
       /**
        * 弹栈
        * @return 栈中数据
        */
       public Integer pop(){
           if(isEmpty()){
               System.out.println("栈已空!");
               return null;
           }
           int x = stack[top];
           top--;
           return x;
       }
       
       @Override
       public String toString() {
           return "ArrayStack{" +
                   "stack=" + Arrays.toString(stack) +
                   '}';
       }
   }
   ```

# 四、用栈解决表达式计算结果问题
![](https://img.yublog.top/img/202211101056963.png)
```java
package com.dsaat;

import java.util.Stack;

public class Dome01 {
    public static void main(String[] args) {
        String cal = "1+1+12";
        char[] data = cal.toCharArray();
        int index = -1;
        Stack numberStack = new Stack();
        Stack operatorStack = new Stack();
        String number = "";

        while(true){
            index++;
            // 首先判断一下index是否大于data的长度,小于执行循环，大于退出
            if(index < data.length){
                // 判断data是否为运算符
                if(isOperator(data[index])){// 是运算符
                    // 判断operatorStack是否未空
                    if(operatorStack.size() == 0){ //符号栈为空
                        // 直接放入运算符
                        operatorStack.push(data[index]);
                    }else {//符号栈不为空
                        // 判断优先级 将要push到operatorStack中的运算符和已经在operatorStack中的运算符比较
                        if(getPriority(data[index]) <= getPriority((char)operatorStack.peek())){ // 小或者相同
                            // 取出numberStack中的两个数字和operatorStack中的运算符进行计算
                            int result = cal((int)numberStack.pop(),(int)numberStack.pop(),(char)operatorStack.pop());
                            // 将算出的结果放入numberStack中
                            numberStack.push(result);
                            // 将未放入的运算符放入operatorStack中
                            operatorStack.push(data[index]);
                        }else {// 优先级大直接放入operatorStack中
                            operatorStack.push(data[index]);
                        }
                    }
                }else {// 不是运算符
                    // 看一下index的下一个是否大于data.length
                    int i = index + 1;
                    if(i  < data.length){ // 没有越界
                        // 查看下一个是否是运算符
                        if(isOperator(data[i])){// 是运算符
                            // 直接将数字让如numberStack中 因为是char类型需要转换
                            number = number + data[index];
                            int x = Integer.parseInt(number);
                            numberStack.push(x);
                            number = "";
                        }else { // 不是运算符
                            // 进行拼接
                            number = number + data[index];
                        }
                    }else {//越界直接将最后一个数字放入numberStack中
                        // 看一下number是否为空
                        if(number == ""){ // 空
                            // 说明上一个不是数字
                            numberStack.push(Integer.parseInt(String.valueOf(data[index])));
                        }else {// 不空说明是数字
                            // 拼接后放入
                            number = number + data[index];
                            int x = Integer.parseInt(number);
                            numberStack.push(x);
                            number = "";
                        }
                    }
                }
            }else {break;}
        }

        // 遍历numberStack和operatorStack进行运算
        int result = 0;
        while (operatorStack.size() != 0){
            // 取出numberStack中的两个数字和operatorStack中的运算符进行计算
            result = cal((int)numberStack.pop(),(int)numberStack.pop(),(char)operatorStack.pop());
            // 将算出的结果放入numberStack中
            numberStack.push(result);
        }
        System.out.println("最后结果是" + result);
    }

    /**
     * 判断是否为运算符
     */
    private static boolean isOperator(char data){
        return data == '+' || data == '-' || data == '*' || data == '/';
    }

    /**
     * 获取优先级
     * @return 1表示优先级最低 依次增加类推
     */
    private static int getPriority(char data){
        if(data == '+' || data == '-'){
            return 1;
        } else if (data == '*' || data == '/') {
            return 2;
        }else {
            return 0; // 错误的符号
        }
    }

    /**
     * 计算
     * @param num1 数字1
     * @param num2 数字2
     * @param o 符号
     * @return 计算结果
     */
    private static int cal(int num1, int num2, char o){
        int result;
        // 判断符号进行计算
        switch (o){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result= -(num1 - num2);
                break;
            case '*':
                result= num1 * num2;
                break;
            case '/':
                result= num2 / num1;
                break;
            default:
                throw new RuntimeException("运算符错误！");
        }
        return result;
    }
}
```



