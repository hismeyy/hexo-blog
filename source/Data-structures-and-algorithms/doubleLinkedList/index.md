---
title: 双向链表
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是双向链表
![](https://img.yublog.top/img/202211082214613.png)
1. next指向下一个节点
2. pre指向上一个节点
# 二、双向链表实现原理
## 2.1 定义双向链表

```java
/**
 * 双向链表
 */
class DoubleLinkedList{
    private Node headNode;

    public DoubleLinkedList() {
        headNode = new Node(null,null);
    }
    
}

/**
 * 双向链表节点
 */
class Node{
    public Integer id;
    public Integer data;
    public Node pre = null;
    public Node next = null;

    public Node(Integer id, Integer data) {
        this.id = id;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Node{" +
                "id=" + id +
                ", data=" + data +
                '}';
    }
}
```

## 2.2 在末尾添加节点

```java
/**
     * 在链表尾部添加节点
     * @param node
     */
    public void add(Node node){
        Node temp = headNode;
        boolean flag = false;
        while (temp.next != null) {
            temp = temp.next;
        }
        if(!flag){
            node.pre = temp;
            temp.next = node;
        }


}
```

## 2.3 遍历输出链表中的节点

```java
@Override
    public String toString() {
        StringBuilder linkedList = new StringBuilder();
        Node temp = headNode;
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
```

## 2.4 删除指定节点

```java
/**
     * 删除数据
     * @param id 要删除数据对应的id
     * @return 删除的node
     */
    public Node delete(int id){
        Node temp = headNode.next;
        boolean flag = false;
        while (true){
            if(temp == null){break;}
            if(temp.id == id){
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if(flag){
            temp.pre.next = temp.next; // temp的父节点的next指向temp的子节点
            temp.next.pre = temp.pre; //  temp的子节点的pre指向temp的父节点 temp被回收
            return temp;
        }else {
            System.out.printf("未找到id为%d的Node", id);
            return null;
        }
    }
```

## 2.5 修改指定节点

```java
/**
     * 修改数据
     * @param node 修改的node
     */
    public void update(Node node){
        Node temp = headNode.next;
        boolean flag = false;

        while (true){
            // 遍历到空时，直接停止
            if(temp == null){break;}
            // 找到node.id和temp.id相同
            if(Objects.equals(node.id, temp.id)){
                flag = true;
                break;
            }
            temp = temp.next;
        }

        if(flag){
            // 如果id相同可以修改，就直接把找到的节点用新节点替换掉
            // 1. 把temp节点的next和pre赋给新节点
            node.next = temp.next;
            node.pre = temp.pre;
            // 2. 再把父节点的next指向node和子节点的pre指向node，temp就会被回收
            temp.pre.next = node;
            if(temp.next != null){
                temp.next.pre = node;
            }
            System.out.printf("id为%d的Node修改成功!\n", node.id);
        }else {
            System.out.printf("id为%d的Node未找到!\n", node.id);
        }
    }
```



   
