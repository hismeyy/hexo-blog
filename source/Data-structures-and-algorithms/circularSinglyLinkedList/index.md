---
title: 单向环形链表
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、实际问题
Josephu（约瑟夫环）问题
设编号1，2，3...n的n个人围坐一圈，约定编号为K（1<=k<=n）的人从1开始报数，数到m的那个人出列，他的洗一位又开始1报数，数到m的那个人由出列，依次类推，直到所有人出列为止，由此产生一个出队编号序列

# 二、什么是单向环形链表
![](https://img.yublog.top/img/202211091402962.png)

# 三、单向环形链表实现原理
1. 创建第一个节点，让first指向该节点，并形成环形
![](https://img.yublog.top/img/202211091404968.png)
2. 后面当每创建一个节点，就把新的节点加入到已有的环形链表中
# 四、遍历环形链表
1. 先让一个辅助指针（变量）curBoy，指向first节点
2. 通过while循环遍历该环形链表即可curBoy.next == first为结束

# 五、代码实现

```java
package com.dsaat;

public class Dome01 {
    public static void main(String[] args) {
        CircularSinglyLinkedList linkedList = new CircularSinglyLinkedList();
        linkedList.add(9);
        linkedList.show();
    }
}

/**
 * 环形单向链表
 */
class CircularSinglyLinkedList{
    private Node first = null;

    /**
     * 添加指定数量的链表
     * @param num 节点数量
     */
    public void add(int num){
        if(num < 0){
            System.out.println("请输入大于0的数");
        }

        Node curNode = null;
        // 循环num次，创建num个节点
        for(int i = 1; i <= num; i++){
            Node node = new Node(i);
            // 第一次first是null，所以把第一个节点给他
            if(first == null){
                first = node;
                first.setNode(first);
                curNode = first;
            }else {
                // 设置curNode指向的节点
                curNode.setNode(node);
                // 设置node的next指向first
                node.setNode(first);
                // 把curNode后移
                curNode = curNode.getNode();
            }
        }

    }

    /**
     * 遍历链表
     */
    public void show(){
        Node curNode = first;
        while (true){
            System.out.println("id=" + curNode.getId() + " " + curNode);
            if(curNode.getNode() == first){
                break;
            }
            curNode = curNode.getNode();

        }
    }
}

/**
 * 节点
 */
class Node{
    private Integer id;
    private Node node;

    public Node() {
    }

    public Node(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Node getNode() {
        return node;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNode(Node node) {
        this.node = node;
    }

    @Override
    public String toString() {
        return "Node{" +
                "id=" + id +
                '}';
    }
}
```

# 五、解决Josephu问题

![image-20221109201049381](D:\A MyBlog\hexo-blog\source\Data-structures-and-algorithms\circularSinglyLinkedList\index.assets\image-20221109201049381.png)

1. 定义first和cur

   - first指向开始数数的node
   - cur指向first的后一位

2. 首先先判断传入的数据是否符合要求

3. 找到开始的数对应的node first.id = startNode

4. 循环遍历链表

5. cur和first移动countNum - 1个位置（因为报数要从自己报）

6. 删除first表示的node，先first向前移动，再把cur的下一个指向节点变为first

7. 代码实现

   ```java
   /**
        * 数Node
        * @param startNode 开始的节点
        * @param countNum 数多少出一次
        * @param nodeNum 节点的个数
        */
       public void countNode (int startNode, int countNum, int nodeNum){
           // 判断是否满足数数条件
           if(startNode < 0 || startNode > nodeNum){
               System.out.println("输入不合法");
               return;
           }
           Node cur = null;
           Node first = this.first;
           while (first.getId() != startNode){
               cur = first;
               first = first.getNode();
           }
           while (cur != first){
               for(int i = 0; i < countNum - 1; i++){
                   cur = first;
                   first = first.getNode();
               }
               System.out.println(first);
               first = first.getNode();
               cur.setNode(first);
           }
           System.out.println(first);
       }
   ```

   
