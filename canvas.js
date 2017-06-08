	/*	
		@param option: {object}
	*/

	(function(){
		var Canvas = function(id){
		this.canvas = document.getElementById(id);
		this.point = 35;
		this.canner = [];
	}
	Canvas.prototype = {
		_init: function(option){
			option = option || {};
			this.canvas.width = option.width || window.innerWidth;
			this.canvas.height = option.height || window.innerHeight;
			this.ctx = this.canvas.getContext('2d');
			this.ctx.fillStyle = option.fillStyle || 'rgba(0,0,0,0.05)';
			this._initCircle();
			this._draw();
			this._doAnimate();
		},
		_getRandom: function(max, min){
			min = min || 0;
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		_drawCircle: function(x, y, r, _moveX, _moveY){
			var circle = {};
			circle.x = x;
			circle.y = y;
			circle.r = r;
			circle._moveX = _moveX;
			circle._moveY = _moveY;
			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fill();
			return circle;
		},
		_drawLine: function(x, y, _x, _y, color){
			this.ctx.beginPath();
			this.ctx.strokeStyle = 'rgba(0,0,0,'+ color +')';
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(_x, _y);
			this.ctx.closePath();
			this.ctx.stroke();
		},
		_draw: function(){
			this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
			for(var i = 0; i < this.canner.length; i++){
				this._drawCircle(this.canner[i].x, this.canner[i].y, this.canner[i].r, this._getRandom(10, -10)/40, this._getRandom(10, -10)/40); 
				//每颗小球移动距离需要每次计算 如果所有小球移动距离一样 无法形成相对运动 你会看到画布在动一样~
			}
			for(var i = 0; i < this.canner.length; i++){
				for(var j = 0; j < this.canner.length; j++){
					if(i + j < this.canner.length){
						var wAbs = Math.abs(this.canner[i + j].x - this.canner[i].x),
							hAbs = Math.abs(this.canner[i + j].y - this.canner[i].y),
							lineLength = Math.sqrt(Math.pow(wAbs, 2) + Math.pow(hAbs, 2));
						var C = 1 / lineLength * 8 - 0.009; 
	                    var lineOpacity = C > 0.03 ? 0.03 : C;
	                    if (lineOpacity > 0) {
							this._drawLine(this.canner[i].x, this.canner[i].y, this.canner[i + j].x, this.canner[i + j].y, lineOpacity);
                        }
					}
				}
			}

		},
		_initCircle: function(){
			for(var i = 0; i < this.point; i++){
				this.canner.push(this._drawCircle(this._getRandom(this.canvas.width), this._getRandom(this.canvas.height), this._getRandom(15, 2), this._getRandom(10, -10)/40, this._getRandom(10, -10)/40));
			}
		},
		_doAnimate: function(){
			var that = this;
			setInterval(function(){
				for(var i = 0; i < that.canner.length; i++){
					var circle = that.canner[i];
					circle.x += circle._moveX;
					circle.y += circle._moveY;
					if(circle.x > that.windowWidth){
					 	circle.x = 0;
					}
                    else if(circle.x < 0){
                    	circle.x = that.windowWidth;
                    }
                    if(circle.y > that.windowHeight){
                    	circle.y = 0;
                    } 
                    else if(circle.y < 0){
                    	circle.y = that.windowHeight;
                    } 

				}
				that._draw();
			}, 1)
		},
		init: function(option){
			this._init(option)
		}
	}
		var c = new Canvas('canvas');
		c.init();
})()