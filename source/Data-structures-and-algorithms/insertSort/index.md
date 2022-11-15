---
title: 插入排序
cover: https://img.yublog.top/img/202211041745573.jpg
top_img: https://img.yublog.top/img/202211041745573.jpg
---
# 一、插入排序
插入排序属于内部排序，是对于欲排序的元素以插入的方式寻找该元素的适当位置，以达到排序的目的。
![](https://img.yublog.top/img/202211131632451.gif)
> 1、从第一个元素开始，该元素可以认为已经被排序；
> 2、取出下一个元素，在前面已排序的元素序列中，从后向前扫描；
> 3、如果该元素（已排序）大于新元素，将该元素移到下一位置；
> 4、重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
> 5、将新元素插入到该位置后；
> 6、重复步骤2~5。

# 二、代码实现

```java
package com.dsaat;

import java.util.Arrays;

public class Dome01 {
    public static void main(String[] args) {
        int[] array = {9,8,7,6,5};

        for(int i = 1; i < array.length; i++){
            // 定义要插入的数
            int insertVal = array[i];
            // 插入数的前一个数
            int insertIndex = i-1;

            // insertIndex >= 0 不能越界
            // insertVal < array[insertIndex] 插入的数要比前一个数小
            while(insertIndex >= 0 && insertVal < array[insertIndex]){
                // 把前一个数后移
                array[insertIndex+1] = array[insertIndex];
                insertIndex--;
            }
            // 把将要插入的数放到找到的适合位置，但是因为insertIndex比原来的小1所以要加1
            array[insertIndex + 1] = insertVal;
        }
        System.out.println(Arrays.toString(array));
    }
}
```

