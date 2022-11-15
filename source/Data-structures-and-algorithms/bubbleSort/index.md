---
title: 冒泡排序
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是冒泡排序
1. 冒泡排序的基本思想是：通过对待排序序列从前向后（从下标较小的元素开始），依次比较相邻元素的值，若发现逆序则交换，使值较大的元素逐渐从前移向后部，就像水底下的气泡一样逐渐向上冒。
![](https://img.yublog.top/img/202211131549527.gif)

> 1、比较相邻的元素。如果第一个比第二个大，就交换它们两个；
> 2、对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素就是最大的数；
> 3、排除最大的数，接着下一轮继续相同的操作，确定第二大的数…
> 4、重复步骤1-3，直到排序完成。

# 二、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {
    public static void main(String[] args) {
        int[] array = {9, 5, 10, 4, 6, 7, 1};
        for (int i = 1; i < array.length; i++) {
            for (int j = 0; j < array.length - i; j++) {
                if(array[j] > array[j+1]){
                    int temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(array));
    }
}
```

# 三、算法优化
因为排序的过程中，各元素不断接近自己的位置，如果一趟比较下去没有进行交换说明是有序的。因此要在排序过程中设置一个标志flag判断元素是否交换过。从而减少不必要的比较。

# 四、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {

    public static void main(String[] args) {
        int[] array = {1,2,3,4};

        boolean flag = false;
        for (int i = 1; i < array.length; i++) {
            for (int j = 0; j < array.length - i; j++) {
                if(array[j] > array[j+1]){
                    int temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    flag = true;
                }else {
                    flag = false;
                }
            }
            if(!flag){ break;}
        }
        System.out.println(Arrays.toString(array));
    }
}
```
