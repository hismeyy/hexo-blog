---
title: 单向链表
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是链表
1. 链表是有序的列表，如图是在内存中存储的样子
![](https://img.yublog.top/img/202211072133171.png)
2. 链表是以节点的方式来存储的
3. 每个节点包含data域，next域，指向下一个节点
4. 链表的各个节点不一定是连续存储的
5. 链表分带头节点和没有头节点的链表、根据实际的需求来确定
# 二、单向链表带头节点逻辑结构示意图
![](https://img.yublog.top/img/202211072136082.png)
# 三、单向链表实现原理
## 2.1 不可排序链表
![](https://img.yublog.top/img/202211072141663.png)
1. 添加（创建）
- 先创建一个head头节点，作用就是表示单链表的头
- 后面没添加一个节点，就直接加入到链表的后面
- 遍历
2. 代码实现

  ```java
  package com.dsaat;
  
  public class Dome01 {
      public static void main(String[] args) {
          SinglyLinkedList singlyLinkedList = new SinglyLinkedList();
          Node node1 = new Node(0, "张三");
          Node node2 = new Node(1, "李四");
          Node node3 = new Node(2, "王五");
          Node node4 = new Node(3, "赵六");
  
          singlyLinkedList.add(node1);
          singlyLinkedList.add(node2);
          singlyLinkedList.add(node3);
          singlyLinkedList.add(node4);
  
          System.out.println(singlyLinkedList);
      }
  }
  
  /**
   * 单链表
   */
  class SinglyLinkedList{
      private static final Node HEAD_NODE = new Node(null,null);
  
      public SinglyLinkedList() {
      }
  
      /**
       * 添加
       * @param node
       */
      public void add(Node node){
          Node temp = HEAD_NODE;
          while(true){
              if(temp.next == null){
                  temp.next = node;
                  break;
              }
              temp = temp.next;
          }
      }
  
      @Override
      public String toString() {
          StringBuilder linkedList = new StringBuilder();
          Node temp = HEAD_NODE;
          while(true){
              if(temp.next != null){
                  linkedList.append("[").append(temp.next).append("]\n");
                  temp = temp.next;
              }else {
                  break;
              }
  
          }
          return linkedList.toString();
      }
  }
  
  /**
   * 节点类
   */
  class Node{
      public Integer id;
      public String data;
      public Node next;
  
      public Node(Integer id, String data) {
          this.id = id;
          this.data = data;
      }
  
      @Override
      public String toString() {
          return "Node = {" +
                  "id=" + id +
                  ", data=" + data +
                  '}';
      }
  }
  
  ```

## 2.2 按顺序添加

1. 首先找到新添加的节点的位置，是通过辅助变量（指针），通过遍历找到的

2. 新的节点.next=temp.next

3. 将temp.next=新节点

4. 代码实现

   ```java
   /**
    * 按顺序添加添加
    * @param node
    */
       public void addOderBy(Node node){
           Node temp = HEAD_NODE;
           boolean flag = false;   //表示id是否存在
           while(true){
               if(temp.next == null){
                   // 如果是空说明到了最后一个
                   break;
               }
   
               if(temp.next.id > node.id){
                   break;
               }else if(temp.next.id.equals(node.id)){
                   // 如果相等，就不添加
                   flag = true;
                   break;
               }
               // 向后移动
               temp = temp.next;
           }
   
           if(!flag){
               // 1. 先把原先的temp的next放到node的next
               node.next = temp.next;
               // 2. 再把temp的next变为node
               temp.next = node;
           }
   }
   ```


## 2.3 删除节点

1. 遍历，找到节点id与指定删除id相同的节点

2. 把找到节点的上一个节点指向修改为节点的指向 temp.next = temp.next.next;

3. Java垃圾回收机制会把找到的节点回收掉，因为该节点没有任何节点引用他

4. 代码实现

   ```java
   /**
     * 删除数据
     * @param id 要删除数据对应的id
     * @return 删除的node
     */
       public Node delete(int id){
           Node temp = HEAD_NODE;
           boolean flag = false;
   
           while (true){
               if(temp.next == null){break;}
   
               if(temp.next.id == id){
                   flag = true;
                   break;
               }
               temp = temp.next;
           }
   
           if(flag){
               Node oldNode = temp.next;
               temp.next = temp.next.next; // 关键代码
               System.out.printf("id为%d的Node已经删除\n", id);
               return oldNode;
           }else {
               System.out.printf("未找到id为%d的Node", id);
               return null;
           }
   }
   ```

## 2.4 修改节点

1. 遍历，找到节点id与所修改节点的id相同的节点

2. 找到以后把原来的节点的next赋给修改节点的next

3. 再把原来节点的上一个节点的指向，指向到修改的节点

4. 原来节点因为没有被引用，所以被垃圾回收器回收

5. 代码实习

   ```java
   /**
    * 修改数据
    * @param node 修改的node
    */
       public void update(Node node){
           Node temp = HEAD_NODE;
           boolean flag = false;
   
           while (true){
               // 遍历到空时，直接停止
               if(temp.next == null){break;}
               // 找到node.id和temp.id相同
               if(Objects.equals(node.id, temp.next.id)){
                   flag = true;
                   break;
               }
               temp = temp.next;
           }
   
           if(flag){
               // 如果id相同可以修改，就直接把找到的节点用新节点替换掉
               // 1. 把原来的节点的next赋给修改节点的next
               node.next = temp.next.next;
               // 2. 再把找到节点的上一个节点指向新的节点
               temp.next = node;
               System.out.printf("id为%d的Node修改成功!\n", node.id);
           }else {
               System.out.printf("id为%d的Node未找到!\n", node.id);
           }
       }
   ```

## 2.5 查询节点

1. 遍历，找到节点id与指定查询id相同的节点

2. 返回找到的节点

3. 代码实现

   ```java
   /**
     * 查找数据
     * @param id 要查找数据的id
     * @return 查找的node
     */
       public Node findNode(int id){
           Node temp = HEAD_NODE;
           boolean flag = false;
   
           while (true){
               if(temp.next == null){break;}
   
               if(temp.next.id == id){
                   flag = true;
                   break;
               }
               temp = temp.next;
           }
   
           if(flag){
               System.out.printf("id为%d的Node已找到\n", id);
               return temp.next;
           }else {
               System.out.printf("未找到id为%d的Node", id);
               return null;
           }
   }
   ```

# 单链表面试题

1. 求单链表中节点的个数

   ```java
   /**
     * 得到链表中的节点个数
     * @return 节点数
     */
       public int size(){
           Node temp = HEAD_NODE;
           int length = 0;
           if(temp.next == null){return 0;}
   
           while (temp.next != null){
               length++;
               temp = temp.next;
           }
           return length;
   }
   ```

2. 查找单链表中的倒数第K个节点

   ```java
   /**
     * 获取倒数第K个节点
     * @param k 倒数K
     * @return 节点
     */
       public Node getLastKNode(int k){
           Node temp = HEAD_NODE.next;
           if(temp == null || size() < k){return null;}
           for(int i = 0; i < size() - k; i++){
               temp = temp.next;
           }
           return temp;
   }
   ```

3. 单链表反转

   ```java
   /**
     * 获取反转后的单链表
     * @return 返回反转后的单链表
     */
       public SinglyLinkedList reversal(){
           // 判断链表是否为空
           if(headNode.next == null){
               System.out.println("单链表为空，不能反转");
               return null;
           }
   
           Node node = headNode.next; // 节点
           Node next;  // 用来保存下一个节点
           Node reversalNode = new Node(null,null); // 反转后的节点头
           while (node != null){
               // 1. 把节点的指向赋给下一个节点的临时变量，用来保存该节点的下一个节点，防止单链表断开
               next = node.next;
               // 2. 把反转头节点的指向赋给节点的指向
               node.next = reversalNode.next;
               // 3. 让反转头的指向指向到节点
               reversalNode.next = node;
               node = next;
           }
           return new SinglyLinkedList(reversalNode);
   ```

   

4. 从尾到头打印单链表
   - 反向遍历

     ```java
     /**
       * 从尾部打印单链表，反向遍历版
       */
         public void printFromTail(){
             Node temp;
             // 从头遍历到尾取最后一个进行打印
             for(int i = 0; i < size(); i++){
                 temp = headNode;
                 for (int j = 0; j < size() - i; j++) {
                     temp = temp.next;
                 }
                 System.out.println(temp);
             }
         }
     ```

   - Stack栈

     ```java
     /**
       * 从尾部打印单链表，栈版
       */
         public void printFromTailUserStack(){
             Node temp = headNode.next;
             Stack<Node> nodes = new Stack<>();
             while(temp != null){
                 nodes.push(temp);
                 temp = temp.next;
             }
     
             while(nodes.size() > 0){
                 System.out.println(nodes.pop());
             }
         }
     ```

5. 合并两个有序的单链表，合并之后的链表依然有序

   ```java
   /**
     * 合并两个有顺序的单链表
     * @param linkedList1 链表1
     * @param linkedList2 链表2
     * @return 合并后的链表
     */
     public static SinglyLinkedList mergeLinkedList(SinglyLinkedList linkedList1, SinglyLinkedList linkedList2){
           // 首先看一下两个链表是否为空，如果是空的话，就直接返回另一个链表，都是空，则返回null
           if(linkedList1.size() == 0 || linkedList2.size() == 0){
               if(linkedList1.size() != 0){
                   return linkedList1;
               } else if (linkedList2.size() != 0) {
                   return linkedList2;
               }
               return null;
           }
           // 都不等于空就可以开始合并，遍历一个链表的节点插入到另一个链表中
           Node node2 = linkedList2.getHeadNode().next;
           Node next;
           // 可以直接利用有序插入的方法，遍历节点2然后插入到节点1中
           while (node2 != null) {
               next = node2.next;
               linkedList1.addOderBy(node2);
               node2 = next;
           }
           return linkedList1;
   
     }
   ```

   
