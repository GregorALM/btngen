//@codekit-prepend "colorpicker.js"

(function () {

	var btnGen = {

		// Начальные настройки всех опшенов
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

		// Текушие значения
		currentValue: {},

		// Инициализация
		initialize: function () {
			this.setUpListeners();
			this.setUpOptoinsUI();
			this.initTabs();
			this.initModal();
		},

		// Устанавливаем лиснеры
		setUpListeners: function () {
			$(this.getIDs('slider')).bind('slide', this.changeCurrentValue);
			$(this.getIDs('colorpicker')).bind('colorpickerchange', this.changeCurrentValue);
			$('#submit').on('click', this.sendMail);
			$('#email').on('keyup', function () {$('#email').removeClass('alert').tooltip('hide');});
			$('#button-text').on('keyup', this.setText);
		},

		// Установим обработчик вкладок
		initTabs: function () {
			$('#optionTabs a').click(function (e) {
			  e.preventDefault();
			  $(this).tab('show');
			});
		},

		initModal: function () {
			$('#modal').dialog({
				modal: true,
				resizable: false,
				title: 'Отправка письма',
				closeText: "Закрыть",
				autoOpen: false
			});
		},

		// Составим разделенный пробелами список ID элементов на которые должен быть повешан опшен определенного типа
		getIDs: function (type) {
			var output = '';
			$.each(btnGen.settings, function (key, val) {
				if (val.type === type) {
					output += '#' + key + ', ';
				}
			});
			return output.slice(0, output.length - 2);
		},

		// Установим обработчики опшенов
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

		// Изменяем текушие значения, вызывается лиснером
		changeCurrentValue: function (event, ui) {
			var option = $(ui.handle).parent().attr('id');
			console.log(option);
			btnGen.currentValue[option] = ui.value;
			btnGen.outputValue();
		},

		// Изменяем текст кнопки, вызывается лиснером
		setText: function () {
			var text = $('#button-text').val();
			$('#result-button').text(text);
			btnGen.currentValue.text = text;
			console.log(btnGen.currentValue.text);
			btnGen.outputValue();
		},

		// Обновим значения полей HTML и CSS
		outputValue: function () {
			var html = '<button id="my-button">',
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
				$('#result-css').text('#my-button {\n' + css + '}');
			} else {
				$('#result-css').text('');
			}
		},

		// Отправим письмо с результатами
		sendMail: function () {
			var inp = $('#email'),
				data = 'mail='+$('#email').val()+'&html='+$('#result-html').text()+'&css='+$('#result-css').text();
			if (btnGen.valid()) {
				$.ajax({
					type: 'post',
					url: 'send-mail.php',
					cache: false,
					data: data,
					success: function (data) {
						$('#modal').text(data);
						$('#modal').dialog('open');
					}
				});
				inp.addClass('success');

			} else {
				inp.addClass('alert').tooltip({
					title: 'Введите корректный Email',
					trigger: 'manual'
				}).tooltip('show');
			}
		},

		// Валидация поля Email
		valid: function () {
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				val = $('#email').val();
			if (!val.length) {return false;}
			return rv_email.test(val);
		}

	};

	btnGen.initialize();
}());
