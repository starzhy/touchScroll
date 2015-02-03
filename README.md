# touchScroll
#兼容PC和移动端的流动页面切换
广泛应用于微信朋友圈中的营销页

``` html
页面动画建议在end中通过修改每个item的class来实现不同效果
Eg: item-scale 实现缩放
.item-scale{
  -webkit-transform: scale(.2);
  -ms-transform: scale(.2);
  -o-transform: scale(.2);
  transform: scale(.2);
}

demo地址：http://appzhy.meitu.com/touchScroll
手机打开，微信扫描二维码
<p><img src="http://cli.clewm.net/qrcode/2015/02/03/1516108749.png?Tue%20Feb%2003%202015%2015:16:13%20GMT+0800%20(CST)" alt="" style="display:block">
</p>
``` 
引入touchScroll.js后执行：
``` js
new touchScroll(id,{

  start:function(scroll){
      //触摸事件
  },
  move:function(scroll){
    //移动
  },
  end:function(scroll){
    //scroll 中返回scroll.len scroll.current  scroll.preCurrent  scroll.direction
  },
  itemClass:'.item' //.item为默认，如修改样式才需传入对应，用于JS获取对应项
})
```