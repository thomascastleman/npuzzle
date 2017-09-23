

function NPuzzle(n_) {

	this.n = n_;
	this.winGrid = [];

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

			if (factors.length > 2) {
				for (var i = 0; i < factors.length; i++) {
					if (i <= mid) {
						this.rows *= factors[i];
					} else {
						this.cols *= factors[i];
					}
				}
			} else if (factors.length == 2) {
				this.rows = factors[0];
				this.cols = factors[1];
			} else {
				this.rows = 1;
				this.cols = factors[0];
			}
		}


		var num = 0;
		for (var r = 0; r < this.rows; r++) {
			this.winGrid.push([]);
			for (var c = 0; c < this.cols; c++) {
				this.winGrid[r].push(num);
				num++;
			}
		}
	}

	this.constructWinState();

	// check a state against the win state
	this.checkForWinState = function(currentState) {
		g = currentState.grid;

		for (var r = 0; r < this.rows; r++) {
			for (var c = 0; c < this.cols; c++) {
				if (g[r][c] != this.winGrid[r][c]) {
					return false;
				}
			}
		}

		return true;
	}

	// generate a random solvable initial state
	this.getRandomState = function() {
		// initialize at win state to guarantee solution
		var state = new State(undefined, 0, 0, this.winGrid);
		state.grid = gridCopy(this.winGrid);

		// make arbitrary number of random moves
		for (var i = 0; i < 100; i++) {
			var moves = state.getAllPossibleTransitions();
			state = moves[Math.floor(Math.random() * moves.length)];
		}

		return state;
	}

	// search init state for solution using iterative deepening a*
	this.id_astar = function(init) {

	}
}