## 如何计算保证最佳的性能

-   保证最小的内存 + 最少的函数调用

-   @ques pos scale rotation 只要有一个改变 matrix 就需要改变

    -   是每一次改变 pos, 都去改变 matrix
        -   多个函数的调用
    -   还是最后一次拿所有的值去计算 matrix
        -   只需要计算一次
        -   每次都需要拿所有的值去修改

-   有没有可能只将改变的合并计算...
    -   一次计算改变的值

## cache

-   https://simonsarris.com/increasing-performance-by-caching-paths-on-canvas/
-   https://stackoverflow.com/questions/31255241/how-to-cache-static-canvas-areas-in-order-to-gain-performance
-   https://stackoverflow.com/questions/7674421/html5-canvas-better-to-re-draw-objects-or-use-bitmaps
-   https://www.html5rocks.com/en/tutorials/canvas/performance/#toc-ref
