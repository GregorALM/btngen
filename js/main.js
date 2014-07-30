//@codekit-prepend "colorpicker.js"

(function () {

	var btnGen = {

		settings: {
			'border-radius': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 10
				}
			},
			'background-color': {
				type: 'colorpicker',
				initial: {
					value: '24D7B9'
				}
			},
			'border-size': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 15,
					range: 'min',
					value: 0
				}
			},
			'width': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 25
				}
			},
			'heigth': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 5
				}
			},
			'border-color': {
				type: 'colorpicker',
				initial: {
					value: 'ffffff'
				}
			},
			'text-color': {
				type: 'colorpicker',
				initial: {
					value: '137d6b'
				}
			},
			'font-size': {
				type: 'slider',
				initial: {
					animate: true,
					min: 4,
					max: 36,
					range: 'min',
					value: 16
				}
			},
			'x-offset': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 0
				}
			},
			'y-offset': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 3
				}
			},
			'shadow-blur': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: 'min',
					value: 0
				}
			},
			'shadow-color': {
				type: 'colorpicker',
				initial: {
					value: '137d6b'
				}
			}
		},

		currentValue: {},

		initialize: function () {
			this.setUpListeners();
			this.setUpOptoinsUI();
		},

		setUpListeners: function () {
			$(this.getIDs('slider')).bind('slide', this.changeCurrentValue);
			$(this.getIDs('colorpicker')).bind('colorpickerchange', this.changeCurrentValue);
			$('#submit').on('click', this.sendMail);
			$('#email').on('keyup', function () {$('#email').removeClass('alert').tooltip('hide');});
			$('#button-text').on('keyup', this.setText);
		},

		getIDs: function (type) {
			var output = '';
			$.each(btnGen.settings, function (key, val) {
				if (val.type === type) {
					output += '#' + key + ', ';
				}
			});
			return output.slice(0, output.length - 2);
		},

		setUpOptoinsUI: function () {
			$.each(this.settings, function (key, val) {
				switch (val.type) {
					case 'slider':
						$("#" + key).slider(val.initial);
						break;
					case 'colorpicker':
						$("#" + key).colorpicker(val.initial);
						break;
				}
			});
			$.each(this.settings, function (key, val) {
				btnGen.currentValue[key] = val.initial.value;
			});
			this.setText();
			this.outputValue();
		},

		changeCurrentValue: function (event, ui) {
			var option = $(ui.handle).parent().attr('id');
			console.log(option);
			btnGen.currentValue[option] = ui.value;
			btnGen.outputValue();
		},

		setText: function () {
			var text = $('#button-text').val();
			$('#result-button').text(text);
			btnGen.currentValue.text = text;
			console.log(btnGen.currentValue.text);
			btnGen.outputValue();
		},

		outputValue: function () {
			var html = '<button id="generated-button">',
				css = '';
			$.each(this.currentValue, function (key, val) {
				switch (key) {
					case 'border-size':
						if (val > 0) {css += 'border: ' + val + 'px solid #' + btnGen.currentValue['border-color'] + '; \n';}
						break;
					case 'border-radius':
						if (val > 0) {css += 'border-radius: ' + val + 'px; \n';}
						break;
					case 'width':
						if (val > 0 ) {css += 'padding: ' + btnGen.currentValue.heigth + 'px ' + val + 'px; \n';}
						break;
					case 'heigth':
						if (val > 0 && btnGen.currentValue.width === 0) {css += 'padding: ' + val + 'px 0px; \n';}
						break;
					case 'background-color':
						if (val.length) {css += 'background-color: #' + val + '; \n';}
						break;
					case 'font-size':
						if (val > 0) {css += 'font-size: ' + val + 'px; \n';}
						break;
					case 'text-color':
						if (val.length) {css += 'color: #' + val + '; \n';}
						break;
					case 'x-offset':
						if (val > 0 ) {css += 'box-shadow: ' + val + 'px ' + btnGen.currentValue['y-offset'] + 'px ' + btnGen.currentValue['shadow-blur'] + 'px #' + btnGen.currentValue['shadow-color'] + '; \n';}
						break;
					case 'y-offset':
						if (val > 0 && btnGen.currentValue['x-offset'] === 0) {css += 'box-shadow: 0px ' + val + 'px ' + btnGen.currentValue['shadow-blur'] + 'px #' + btnGen.currentValue['shadow-color'] + '; \n';}
						break;
					case 'shadow-blur':
						if (val > 0 && btnGen.currentValue['x-offset'] === 0 && btnGen.currentValue['y-offset'] === 0) {css += 'box-shadow: 0px 0px ' + val + 'px #' + btnGen.currentValue['shadow-color'] + '; \n';}
						break;
					case 'text':
						html += val;
						break;
				}
			});
			$('#result-button').attr('style', css.slice(0, css.length - 3));
			html += '</button>';
			$('#result-html').text(html);
			if (css !== '') {
				$('#result-css').text('#generated-button {\n' + css + '}');
			} else {
				$('#result-css').text('');
			}
		},

		sendMail: function () {
			var inp = $('#email');
			if (btnGen.valid()) {
				inp.addClass('success');

			} else {
				inp.addClass('alert').tooltip({
					title: 'Введите корректный Email',
					trigger: 'manual'
				}).tooltip('show');
			}
		},

		valid: function () {
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				val = $('#email').val();
			if (!val.length) {return false;}
            return rv_email.test(val);
		}

	};

	btnGen.initialize();
}());
