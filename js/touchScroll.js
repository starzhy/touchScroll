/*
 * touchScroll  
 * param:el,evt
 * evt:{start:function(){},move:function(){},end:function(){}}
*/

(function(window,document,undefined){
	var hasTouch = 'ontouchstart' in window,
		hasPointer= navigator.msPointerEnabled,
		winW = document.body.clientWidth,
		winH = document.body.clientHeight;
		
	function touchScroll(el,evt){
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		var itemClass = evt.itemClass || '.item';
		this.preCurrent = this.current = 0;
		this.direction =1;
		this.item = this.wrapper.querySelectorAll(itemClass);
		this.len = this.item.length;
		this.point={x:0,y:0,endX:0,endY:0}
		this.evt = evt;
		this.isLoop = evt.isLoop ? evt.isLoop : false;
		this.init().initEvents();
	}

	touchScroll.prototype = {
		init:function(){
			winW = document.body.clientWidth,
			winH = document.body.clientHeight;
			this.wrapper.style.height = this.len*winH+'px';
			this.item.item(this.current).classList.add('current');
			Array.prototype.forEach.call(this.item,function(el){
				el.style.height=winH+'px';
			});
			window.addEventListener('touchmove MSPointerMove pointermove', function (e) { e.preventDefault(); }, false);
			return this;
		},
		start:function(e){
			var touches = e.touches ? e.touches[0] : e;
			this.point.x = this.point.endX = touches.pageX;
			this.point.y = this.point.endY = touches.pageY;
			this.moved=false;
			this.enabled=true;
			//console.log(0,this.point)
			if(typeof this.evt.start == 'function') this.evt.start(this);
		},
		move:function(e){
			e.preventDefault();
			e.stopPropagation();
			if(!this.enabled) return;
			var touches = e.touches ? e.touches[0] : e,
				diffX = parseInt(touches.pageX - this.point.x),
				diffY = parseInt(touches.pageY - this.point.y);
			if((this.current>= this.len-1 && diffY<0) || (this.current==0 && diffY>0) || !this.enabled) return false;
			this.point.endX = parseInt(touches.pageX);
			this.point.endY = parseInt(touches.pageY);
			//console.log(1,this.point,diffY)
			this.moveY(parseInt(-this.current*winH+diffY),0);
			this.moved = true;
			if(typeof this.evt.move == 'function') this.evt.move(this);
		},
		end:function(e){	
			var touches = e.touches ? e.touches[0] : e,
				diffX = this.point.endX - this.point.x,
				diffY = this.point.endY - this.point.y;
			this.enabled = false;
			//console.log(2,this.point,diffY,this.current,this.moved)
			if((this.current>= this.len-1 && diffY<0) || (this.current==0 && diffY>0) || !this.moved) return false;
			this.direction = diffY>0 ? -1 : 1;
			if(Math.abs(diffY)<10){
				this.moveY(parseInt(-this.current*winH),0);
				return false;
			}
			this.preCurrent = this.current;
			this.current+= this.direction;
			this.current = this.current>this.len-1 ? this.len-1 : this.current;
			this.current = this.current<0 ? 0 : this.current;
			this.moveY(parseInt(-this.current*winH),.5);
			Array.prototype.forEach.call(this.item,function(item){
				item.classList.remove('current');
			});
			this.item.item(this.current).classList.add('current');
			if(typeof this.evt.end == 'function') this.evt.end(this);
		},
		transitionEnd:function(){
			//CSS动画结束时操作
		},
		resize:function(){
			this.init();
		},
		moveY:function(y,t){
			var timer = t || 0;
			this.wrapper.style.webkitTransform = 'translate3D(0,'+y+'px,0)';
			this.wrapper.style.webkitTransition = t+'s';
		},
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'MSPointerDown':
				case 'mousedown':
					this.start(e);
					break;
				case 'touchmove':
				case 'MSPointerMove':
				case 'mousemove':
					this.move(e);
					break;
				case 'touchend':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this.end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this.resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this.transitionEnd(e);
					break;
				case 'DOMMouseScroll':
				case 'mousewheel':
					//this._wheel(e);
					break;
				case 'keydown':
					//this._key(e);
					break;
			}
		},
		initEvents: function (remove) {
			var eventType = remove ? this.removeEvent : this.addEvent;
			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);
			
			/*PC*/
			eventType(this.wrapper, 'mousedown', this);
			eventType(window, 'mousemove', this);
			eventType(window, 'mousecancel', this);
			eventType(window, 'mouseup', this);

			/*windows phone*/
			if ( hasPointer ) {
				eventType(this.wrapper, 'MSPointerDown', this);
				eventType(window, 'MSPointerMove', this);
				eventType(window, 'MSPointerCancel', this);
				eventType(window, 'MSPointerUp', this);
			}
			/*IOS android*/
			if ( hasTouch ) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(window, 'touchmove', this);
				eventType(window, 'touchcancel', this);
				eventType(window, 'touchend', this);
			}
			eventType(this.wrapper, 'transitionend', this);
			eventType(this.wrapper, 'webkitTransitionEnd', this);
			eventType(this.wrapper, 'oTransitionEnd', this);
			eventType(this.wrapper, 'MSTransitionEnd', this);
			
		},
		destroy: function () {
			this._initEvents(true);
		},
		addEvent:function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		},
		removeEvent:function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		}
	}
	window.touchScroll = touchScroll;
})(window,document);

