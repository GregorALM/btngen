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
					value: 2
				}
			},
			'border-size': {
				type: 'slider',
				initial: {
					animate: true,
					min: 0,
					max: 15,
					range: 'min',
					value: 3
				}
			},
			'border-color': {
				type: 'colorpicker',
				initial: {
					value: 'ff0000'
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
			this.outputValue();
		},

		changeCurrentValue: function (event, ui) {
			var option = $(ui.handle).parent().attr('id');
			console.log(option);
			btnGen.currentValue[option] = ui.value;
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
						if (val > 0) {css += 'border-radius: ' + val + '%; \n';}
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
		}

	};

	btnGen.initialize();
}());
