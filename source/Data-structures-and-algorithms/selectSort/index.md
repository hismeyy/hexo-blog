---
title: 选择排序
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---

# 一、什么是选择排序
选择排序属于内部排序，是从欲排序的数据中，按指定的规则选出某一元素，再依规定交换位置后达到排序目的
![](https://img.yublog.top/img/202211131552192.gif)

> 1、第一轮，找到最小的元素，和数组第一个数交换位置。
> 2、第二轮，找到第二小的元素，和数组第二个数交换位置…
> 3、直到最后一个元素，排序完成。

# 二、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {
    public static void main(String[] args) {
        int[] array = {0,5,-1,4};

        // 默认下表为0的为最小值
        int minIndex;
        int min;
        int temp;
        for (int i = 0; i < array.length - 1; i++) {
            minIndex = i;
            min = array[minIndex];
            for (int j = i + 1; j < array.length; j++) {
                if(min > array[j]){
                    min = array[j];
                    minIndex = j;
                }
            }
            temp = array[i];
            array[i] = min;
            array[minIndex] = temp;

        }
        System.out.println(Arrays.toString(array));
    }
}
```

