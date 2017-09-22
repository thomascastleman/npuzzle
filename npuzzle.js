

function NPuzzle(n_) {

	this.n = n_;
	this.winState = [];

	this.rows = 1;
	this.cols = 1;

	this.constructWinState = function() {
		// if n + 1 perfect square
		if (Number.isInteger(Math.sqrt(this.n + 1))) {
			this.rows = Math.sqrt(this.n + 1);
			this.cols = this.rows;
		} else {
			var factors = primeFactor(this.n + 1);
			var mid = Math.floor(factors.length / 2);

			for (var i = 0; i < factors.length; i++) {
				if (i <= mid) {
					this.rows *= factors[i];
				} else {
					this.cols *= factors[i];
				}
			}
		}


		var num = 0;
		for (var r = 0; r < this.rows; r++) {
			this.winState.push([]);
			for (var c = 0; c < this.cols; c++) {
				this.winState[r].push(num);
				num++;
			}
		}
	}

	this.constructWinState();

	this.getRandomState = function() {

	}

	this.aStar = function(init) {

	}
}