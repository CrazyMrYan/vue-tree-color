<p align="center">
    <img width="120" src="http://crazy-x-lovemysoul-x-vip.img.abc188.com/images/TREE-LOGO.png">
    <h2 align="center"> vue-tree-color </h2>
</p>
<p align="center">
 <img src="https://img.shields.io/github/stars/CrazyMrYan/vue-tree-color?style=social.svg" />
</p>
本项目是 针对 vue-org-tree 做得一个 demo ,并且根据公司项目进行修改 上传了 npm 包 下面我们开始讲解

## 浏览器兼容

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions

## 前言

> 最近公司项目（`Vue` + `Element` ）需求有用到 `tree` ，所以呢我去网上找了很多插件，都不是很符合我的要求。最后在GitHub上面找到了一款插件是 `iview` 的组织结构树  `vue-org-tree` ,但是由于文档不是特别易懂，自己踩了很多坑。不过定制性特别高，基本上会用到的方法都有了。所以今天来给大家讲解下。
>
> 自己也根据业务需求修改了部分内容，下面我也会介绍到我修改的内容，重新修改了包上传到了npm

![image-20200326094911709](https://user-gold-cdn.xitu.io/2020/3/26/17114cc093c42e43?w=909&h=282&f=png&s=6711)

## 安装

### NPM

``` javascript
# use npm
npm install vue-tree-color

```

### 安装 loader 

温馨提示：不安装less-loader基本上都会报错

``` javascript
npm install --save-dev less less-loader
```

### Import Plugins

``` javascript
import Vue from 'vue'
import Vue2OrgTree from 'vue-tree-color'

Vue.use(Vue2OrgTree)
```

## 简单起步

严老湿这边呢，就直接使用` Vue-cli `起步了，`vue-tree-color`安装成功之后，我们就直接使用了，在`Vue`页面或者组件中使用`vue2-org-tree` 标签，动态绑定data

### 基本创建

``` html
<vue2-org-tree :data="data"/>
```

data数据放入页面中

id 每个元素不同的ID ，label为name， children为自己的子集数据

``` javascript
data: {
        id: 0,
        label: "XXX科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          }
        ]
      }
```

效果图：


![](https://user-gold-cdn.xitu.io/2020/3/26/17114cd3d86d600d?w=909&h=282&f=png&s=6186)

### 排列方式

刚刚我们看到的是默认排列方式 ，其实还有一种排列方式，我们一起来看看

#### 水平排列

`horizontal`  是水平排列方式，我们来实践一下吧，它的参数是`true`、`false`

``` html
<vue2-org-tree
	:data="data"
    :horizontal="true"
/>
```

看看效果如何：


![](https://user-gold-cdn.xitu.io/2020/3/26/17114cd9b7ad8807?w=579&h=556&f=png&s=7412)

### 修改背景色

​	使用 `label-class-name `  我们还可以动态绑定自定义`class`

``` html
<vue2-org-tree 
	:data="data" 
    :horizontal="true"      
    :label-class-name="labelClassName"           
/>
```

我们一起来尝试一下吧！

js:

``` javascript
 data() {
    return {
		labelClassName:"bg-color-orange"
    }
 }
```

css：

``` css
.bg-color-orange{
    color: #fff;
    background-color: orange;
}
```

**警告⚠ ：`style`标签里不能加  `scoped` 不然自定义样式无效**

看看效果图


![](https://user-gold-cdn.xitu.io/2020/3/26/17114cdc73d12fe8?w=522&h=586&f=png&s=6332)

### 折叠展示

折叠展示效果

``` html
<vue2-org-tree 
	:data="data" 
    :horizontal="true"      
    :label-class-name="labelClassName"    
    collapsable
/>
```


![](https://user-gold-cdn.xitu.io/2020/3/26/17114ce106585fbf?w=340&h=209&f=png&s=1601)

折叠效果是有了，那么怎么展开呢？

``` html
<vue2-org-tree 
	:data="data" 
    :horizontal="true"      
    :label-class-name="labelClassName"    
    collapsable
	@on-expand="onExpand"
/>
```

js:

``` javascript
collapse(list) {
   	var _this = this;
    list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
	});
},
onExpand(e,data) {
    if ("expand" in data) {
       data.expand = !data.expand;
    	if (!data.expand && data.children) {
       		this.collapse(data.children);
    	}
    } else {
        this.$set(data, "expand", true);
    }
},
```

请看效果图：

![](https://user-gold-cdn.xitu.io/2020/3/26/17114cc09d015cae?w=639&h=438&f=gif&s=35899)

问题又来了，默认展开如何实现？

请看大屏幕

``` javascript
toggleExpand(data, val) {
	var _this = this;
    if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
      	});
    } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
    }
}
```

在请求完数据之后直接调用,或者生命周期调用，可以自由发挥

第一个参数是你的资源data，第二个参数是全部展开或否

``` javascript
this.toggleExpand(this.data,true)
```

上效果图：


![](https://user-gold-cdn.xitu.io/2020/3/26/17114cfca059bc86?w=506&h=567&f=png&s=6817)



## 深入观察

`vue2-org-tree` 向我们抛出了几个事件，我们先看看有哪些事件

### 点击事件

`on-node-click` 就是被抛出的点击事件

``` html
<vue2-org-tree 
	:data="data" 
	@on-node-click="NodeClick"
/>
```

我们在方法里面写一个NodeClick用来接受点击触发的值

``` javascript
NodeClick(e,data){
	console.log(e)
    // e 为 event
	console.log(data)
    // 当前项的所有详情 如：id label children
}
```

打印结果：

``` javascript
// e 的打印
{
    isTrusted: true
    screenX: 720
    screenY: 308
    clientX: 720
    clientY: 205
    ctrlKey: false
    shiftKey: false
    altKey: false
    metaKey: false
    button: 0
    buttons: 0
    relatedTarget: null
    pageX: 720
    ......
}
// data的打印
{
    id: 2
	label: "产品研发部"
	children: Array(4)
}
```

### 移入移出

它还向我们抛出了移入移出事件，返回值与点击事件大致相同

``` javascript
<vue2-org-tree 
	:data="data" 
    :horizontal="true"      
    :label-class-name="labelClassName"    
    collapsable
	@on-expand="onExpand"
	@on-node-mouseover="onMouseover"
    @on-node-mouseout="onMouseout"
/>
```

### 拓展移入移出

​	来了老弟？我们做移入移出，肯定是要有功能的对不对？

每当我们的鼠标移入到小盒子里就出现一个模态框用来展示data内容

``` html
<vue2-org-tree 
	:data="data" 
    :horizontal="true"  
	name="test"    
    :label-class-name="labelClassName"
	collapsable
	@on-expand="onExpand"
	@on-node-mouseover="onMouseover"
    @on-node-mouseout="onMouseout"
/>
<!-- 创建浮窗盒子 -->
<div v-show="BasicSwich" class="floating">
    <p>ID:{{BasicInfo.id}}</p>
    <p>Name:{{BasicInfo.label}}</p>
</div>
```

js:

``` javascript
// 声明变量
data() {
    return {
		BasicSwich:false,
		BasicInfo:{id:null,label:null}
    }
}
// 方法
onMouseout(e, data) {
    this.BasicSwich = false
},
onMouseover(e, data) {
    this.BasicInfo = data;
    this.BasicSwich = true;
    var floating =  document.getElementsByClassName('floating')[0];
    floating.style.left = e.clientX +'px';
    floating.style.top = e.clientY+'px';
},
```

css:

``` css
/* 盒子css */
.floating{
    background: rgba(0, 0, 0, 0.7);
    width: 160px;
    height: 100px;
    position: absolute;
    color: #fff;
    padding-top: 15px;
    border-radius: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    left:0;
    top: 0;
    transition: all 0.3s;
	z-index: 999;
	text-align: left;
	font-size: 12px;
}
```

上效果图：

![GIF](https://user-gold-cdn.xitu.io/2020/3/26/17114cc0959604ab?w=976&h=566&f=gif&s=30669)

### 自定义方块颜色

这个地方是严老湿在原有的基础上进行了封装改良，我在内部文件中修改了部分内容话不多说，我们上代码看看

传`judge`值给组件

--------------------------------------------------------------------------------------------------
**2.1.5 船新版本：** 

judge 是一个`Object`格式 里面存在着一个值 `{swtich:true || false}`
不传或者传入false 都默认为不需要自定义class

新增`NodeClass` 参数 `NodeClass` 是一个`Array`格式 类似于`Echarts`的 `color` 参数，

如果有放入你需要的`class` 如果没有则采取默认格式
``` javascript
  NodeClass:[
      "myred",
      "myger",
      "myblue"
  ]
```
在`data`数据中需要的项中添加 你就需要这样做
``` javascript
  {
      id: 5,
      label: "研发-前端",
      swtich: "myred"
  },
  {
      id: 6,
      label: "研发-后端",
      swtich: "myger"
  },
```

html

``` html
<vue2-org-tree 
	:data="data" 
  :horizontal="true"  
	name="test"    
  :label-class-name="labelClassName"
	collapsable
	@on-expand="onExpand"
	@on-node-mouseover="onMouseover"
  @on-node-mouseout="onMouseout"
  :judge="judge"
  :NodeClass="NodeClass"
/>
```
![](http://crazy-x-lovemysoul-x-vip.img.abc188.com/images/tree.png)

更多详细文章 可以查阅 https://mp.weixin.qq.com/s/QLzXPxloTJh1fVAY77sZzg

--------------------------------------------------------------------------------------------------

**旧版本**
js

``` javascript
judge: { id: 6 },
```

judge是传给组件分辨区别的对象

id和6同时为判断条件，

上面的那段代码的意思就是，如果id为6的那一项进行修改颜色

康康效果图吧

![](http://crazy.lovemysoul.vip/images/judge.jpg)


如果你要修改更多的项，那就得换个判断条件了

比如数据里面携带了判断条件你可以这样

``` javascript
judge: { swtich: false },
```

data

``` javascript
data: {
	id: 0,
	label: "XXX科技有限公司",
    children: [
        {
             id: 2,
             label: "产品研发部",
             children: [
                 {
                      id: 5,
                      label: "研发-前端",
                      swtich: false
                  },
                  {
                      id: 6,
                      label: "研发-后端",
                      swtich: false
                   },
                   {
                      id: 9,
                      label: "UI设计"
                   },
                   {
                      id: 10,
                      label: "产品经理"
                   }
              ]
          },
          {
              id: 3,
              label: "销售部",
              children: [
                  {
                      id: 7,
                      label: "销售一部",
                      swtich: false
                  },
                  {
                      id: 8,
                      label: "销售二部",
                      swtich: false
                  }
              ]
          },
          {
               id: 4,
               label: "财务部"
          },
          {
               id: 9,
               label: "HR人事"
          }
      ]
 },
```

效果图：

![](http://crazy.lovemysoul.vip/images/judge1.jpg)

但是值得你注意的是，这两个颜色是通过类名来自定义的

条件中查询成功的class是`.org-bg-err ` 

条件中查询失败的class是 `.org-bg-res `

## API

### props


| prop              | descripton                         |          type          |                          default                           |
| ----------------- | ---------------------------------- | :--------------------: | :--------------------------------------------------------: |
| data              |                                    |        `Object`        |                                                            |
| props             | configure props                    |        `Object`        | `{label: 'label', children: 'children', expand: 'expand'}` |
| labelWidth        | node label width                   |  `String` \| `Number`  |                           `auto`                           |
| collapsable       | children node is collapsable       |       `Boolean`        |                           `true`                           |
| renderContent     | how to render node label           |       `Function`       |                             -                              |
| labelClassName    | node label class                   | `Function` \| `String` |                             -                              |
| selectedKey       | The key of the selected node       |        `String`        |                             -                              |
| selectedClassName | The className of the selected node | `Function` \| `String` |                             -                              |

### events

| event name | descripton        | type       |
| ---------- | ----------------- | :--------- |
| click      | Click event       | `Function` |
| mouseover  | onMouseOver event | `Function` |
| mouseout   | onMouseOut event  | `Function` |

  * ### Call events

#### on-expand

鼠标点击时调用它。

- params `e` `Event`
- params `data` `Current node data`

#### on-node-click

well be called when the node-label clicked

- params `e` `Event`
- params `data` `Current node data`     

#### on-node-mouseover

当鼠标悬停时调用它。

- params `e` `Event`
- params `data` `Current node data`   

#### on-node-mouseout

当鼠标离开时调用它。

- params `e` `Event`
- params `data` `Current node data`

## 总结

最后附上Git地址：https://github.com/CrazyMrYan/vue-tree-color 

预览地址：http://crazy.lovemysoul.vip/gitdemo/vue-tree-color 

关注“悲伤日记”查看更多精彩文章
![](https://user-gold-cdn.xitu.io/2020/3/26/17114de4a8c27045?w=414&h=415&f=png&s=77015)
