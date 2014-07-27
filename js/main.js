(function () {

	var btnGen = {

		settings: {
			'border-radius': {
				type: "slider",
				initial: {
					animate: true,
					min: 0,
					max: 50,
					range: "min",
					value: 0,
				}
			},
			'border-size': {
				type: "slider",
				initial: {
					animate: true,
					min: 0,
					max: 15,
					range: "min",
					value: 0
				}
			}
		},

		initialize: function () {
			this.setUpListeners();
			this.setUpOptoinsUI();
			this.setValue();
		},

		setUpOptoinsUI: function () {
			$.each(this.settings, function (key, val) {
				switch (val.type) {
					case "slider":
						$("#" + key).slider(val.initial);
				}
			});
		},

		setUpListeners: function () {
			$("#border-radius, #border-size").bind("create slide change", this.changeValue);
		},

		// setValue: function (settings) {

		// },

		changeValue: function (event, ui) {
			console.log(ui.value);
		}

	};

	btnGen.initialize();
}());
