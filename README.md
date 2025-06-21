## README

### 目前已经完成的功能（大概吧）
- 场景切换：将不同场景的需要绘制和监听事件的对象隔离开
    1. `Canvas` 类为管理画布的不同场景的类，管理调度对象的绘制，并对接系统提供的监听api，在将其封装后提供给向其注册了监听事件的对象，实现不同场景监听的分离
        - `Canvas(canvasid,height,width)`（构造函数）
            > `canvasid`为HTML中`<canvas>`元素的`id`属性，用于识别要管理的`<canvas>` \
            > `height`为`<canvas>`的高度（逻辑分辨率，即与是否有缩放无关）\
            > `width`为`<canvas>`的宽度（同上）\
            > `Canvas`对象中默认会有一个名为`main`的场景
        - `Canvas.draw()`（绘制函数）
            > 会去调用已经注册的对象（一般创建一个`Button`、`Input`等对象时会自动注册）的相应的`draw()`函数（也就是说，想要向`Canvas`注册对象接受管理必须提供`draw()`函数）
        - `Canvas.scene(name)`（获取场景对象引用）
            > 返回名为`name`的场景，若不存在的话则直接报错\
            > 一般创建`Button`、`Input`等对象时需要首先提供这个作为参数，以让对象确定自己所在的场景
        - `Canvas.createNewScene(name,background)`（创建新场景）
            > `name`为新场景名字\
            > `background`为新场景背景，需提供一个`Image`对象\
            > 如果名为`name`的场景已经存在，会直接报错
        - `Canvas.changeScene(name)`（切换场景）
            > 切换至名为`name`的场景\
            > 如果不存在则直接报错\
            > *BUG：在移动端使用虚拟键盘对`Input`进行输入时，切换场景不会打断输入，输入可以继续进行*
    2. `CanvasScene`类为场景类，直接对接具体的需要绘制和监听事件的对象
        - `CanvasScene.setBackground(img)`（设置场景背景）
            > 需向`img`提供`Image`对象
        - `CanvasScene.addClickCallBack(mm,md,mu,tm,ts,te,l)`（注册鼠标以及触摸事件监听）
            > `CanvasScene`提供的监听接口有：
            > `mouseMove`：监听鼠标移动（mm）\
            > `mouseDown`：监听鼠标按下（md）\
            > `mouseUp`：监听鼠标松开（mu）\
            > `touchMove`：监听触摸移动（tm）\
            > `touchStart`：监听触摸开始（ts）\
            > `touchEnd`：监听触摸结束（te）\
            > `l`为对象所在图层，用于解决多个对象重叠时的优先级\
            > 为了兼容电脑端和移动端，一旦一个对象要注册监听，必须提供全部6种的回调函数
- 按钮：可点击可拖动，可触发回调函数（将点击和拖动 取消掉，可以当作普通对象用）
    - new! 添加了透明的功能（JavaScript直接就提供了相应api，真是方便啊）
- 文本输入框：依赖于对HTML标签`<input>`的伪装，支持文本输入、删除、粘贴、光标移动等，但不支持显示选中区域、鼠标点击交互等