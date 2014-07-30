(function( $ ) {
	$.widget( 'kataev.colorpicker',  {
 
		
		options: { 
		 isCollapsed: true,
		 valueR: 255,
		 valueG: 255,
		 valueB: 255,
		 value: ''
		},
 
		
		_create: function() {
			$(this.element).addClass('ui-colorpicker').text('#');
			$('<input/>', {'class': 'ui-colorpicker-hex'}).appendTo(this.element);
			$('<div></div>', {'class': 'ui-colorpicker-rgb-sliders'}).appendTo(this.element);
			$('<div></div>', {'class': 'ui-colorpicker-red-slider', 'color': 'red'}).appendTo(this.element.children('.ui-colorpicker-rgb-sliders'));
			$('<div></div>', {'class': 'ui-colorpicker-green-slider', 'color': 'green'}).appendTo(this.element.children('.ui-colorpicker-rgb-sliders'));
			$('<div></div>', {'class': 'ui-colorpicker-blue-slider', 'color': 'blue'}).appendTo(this.element.children('.ui-colorpicker-rgb-sliders'));
			$('.ui-colorpicker-red-slider').slider({
				animate: true,
				min: 0,
				max: 255,
				range: 'min',
				value: this.options.valueR
			});
			$('.ui-colorpicker-green-slider').slider({
				animate: true,
				min: 0,
				max: 255,
				range: 'min',
				value: this.options.valueG
			});
			$('.ui-colorpicker-blue-slider').slider({
				animate: true,
				min: 0,
				max: 255,
				range: 'min',
				value: this.options.valueB
			});

			this.setUpListeners();
			this.setSliders();
		},

		_setOption: function () {
			this.setRGB(this.options.value);
			this.setSliders();
		},
 
		_init: function () {
			this.setRGB(this.options.value);
			this.element.find('.ui-colorpicker-hex').val(this.options.value);
			this.setBG(this.options.value);
			this.setSliders();
		},
 
 		//Деструктор не стал писать, нет времени(надеюсь никто не собирается в этом приложении деинициализировать виджет)
		destroy: function() {
			
		},

		getHEX: function () {
			var r = parseInt(this.options.valueR).toString(16),
				g = parseInt(this.options.valueG).toString(16),
				b = parseInt(this.options.valueB).toString(16);
				if (r.length === 1) {if (this.options.valueR > 15) {r += '0';} else {r = '0' + r;}}
				if (g.length === 1) {if (this.options.valueG > 15) {g += '0';} else {g = '0' + g;}}
				if (b.length === 1) {if (this.options.valueB > 15) {b += '0';} else {b = '0' + b;}}
			return r + g + b;
		},

		setRGB: function (hex) {
			if (hex.length === 6) {
				this.options.valueR = parseInt(hex.substring(0,2),16);
				this.options.valueG = parseInt(hex.substring(2,4),16);
				this.options.valueB = parseInt(hex.substring(4,6),16);
			}	
		},

		setBG: function (hex, e) {
			this.element.children('.ui-colorpicker-hex').css('background-color', '#' + hex);
			this.options.value = hex;
			var ui = {};
			ui.handle = this.element.children('.ui-colorpicker-hex').get();
			ui.value = this.options.value;
			this._trigger('change', e, ui);
		},

		value: function () {
			return this.options.hex;
		},

		changeColor: function (e, ui) {
			switch ($(e.target).attr('color')) {
				case 'red':
				e.data.options.valueR = ui.value;
				break;
				case 'green':
				e.data.options.valueG = ui.value;
				break;
				case 'blue':
				e.data.options.valueB = ui.value;
				break;
			}
			e.data.element.find('.ui-colorpicker-hex').val(e.data.getHEX());
			e.data.setBG(e.data.getHEX());
		},

		changeByKey: function (e) {
			e.data.setRGB($(e.target).val());
			console.log(e.data.getHEX());
			e.data.setBG(e.data.getHEX());
			e.data.setSliders();
		},

		setSliders: function () {
			this.element.find('.ui-colorpicker-red-slider').slider('value', this.options.valueR);
			this.element.find('.ui-colorpicker-green-slider').slider('value', this.options.valueG);
			this.element.find('.ui-colorpicker-blue-slider').slider('value', this.options.valueB);
			console.log(this.options);
		},

		setUpListeners: function () {
			this.element.on({
				'mouseenter': function(){
					$(this).children('.ui-colorpicker-rgb-sliders').slideDown(200);
				},
				'mouseleave': function(){
					$(this).children('.ui-colorpicker-rgb-sliders').slideUp(200);
					
				}
				
			});
			this.element.children('.ui-colorpicker-hex').on('keyup', this, this.changeByKey);
			this.element.find('.ui-colorpicker-red-slider, .ui-colorpicker-green-slider, .ui-colorpicker-blue-slider').bind('slide', this, this.changeColor);
		}

	});
}( jQuery ) );