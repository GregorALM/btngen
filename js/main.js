//@codekit-prepend "vendor/jquery-1.11.0.js"
//@codekit-prepend "vendor/jquery-ui.js"
//@codekit-prepend "vendor/bootstrap.js"

(function () {

	var btnGen = {

		initialize: function () {
			this.setUpOptoinsUI();
			this.setUpListeners();

		},

		setUpOptoinsUI: function () {
			console.log('1');
			$("#border-radius").slider({
				animate: true,
				min: 0,
				max: 50,
				range: "min",
				value: 0
			});
			$("#border-size").slider({
				animate: true,
				min: 0,
				max: 15,
				range: "min",
				value: 0
			});
		},

		setUpListeners: function () {
			
		}

	};

	btnGen.initialize();
}());
