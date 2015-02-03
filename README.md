# touchScroll
#兼容PC和移动端的流动页面切换
广泛应用于微信朋友圈中的营销页

页面动画建议在end中通过修改每个item的class来实现不同效果 
	eg: item-scale 实现缩放
	

在页面中执行：
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
