---
title: 希尔排序
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是希尔排序

希尔排序是希尔在1959年提出的一种排序算法。希尔排序也是一种插入排序。他是简单插入排序经过改进之后的一个更高效的版本也称**缩小增量排序**

![](https://img.yublog.top/img/202211161145978.gif)

# 二、希尔排序的思想

希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法进行排序，随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰好被分成一组，算法便终止

# 三、希尔排序的两种方法

## 3.1 交换法

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {
    public static void main(String[] args) {
        int[] array = {3,4,1,2,0,6};

        for(int n = array.length / 2; n > 0; n = n / 2){
            for(int i = n; i < array.length; i++){
                for (int j = i - n; j >= 0; j = j - n) {
                    if(array[j] > array[j+n]){
                        int temp = array[j];
                        array[j] = array[j+n];
                        array[j+n] = temp;
                    }
                }
            }
        }
        System.out.println(Arrays.toString(array));
    }
}
```

## 3.2 移动法

```java
package com.dsaat;

import java.util.Arrays;

public class Dome02 {
    public static void main(String[] args) {
        int[] array = {3,4,1,2,0,6};
        
        // 分组for
        for (int n = array.length / 2; n > 0; n = n /2){
            // 从分组后的n开始提取出进行插入
            for (int i = n; i < array.length ; i++) {
                // 保存索引值和索引
                int j = i;
                int temp = array[j];
                // 判断第j个和第j-n的大小
                if(array[j] < array[j - n]){
                    // 进行循环位移 保证j-n>=0 和temp<j-n的值
                    while (j - n >= 0 && temp < array[j - n]){
                        // 进行位移 后一个等于前一个
                        array[j] = array[j - n];
                        j = j - n; //继续向前移动一个
                    }
                    // 把temp插入进去
                    array[j] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(array));
    }

}
```

