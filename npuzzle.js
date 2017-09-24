

function NPuzzle(n_) {

	this.n = n_;

	this.winGrid = [];		// winning grid
	this.winState;			// state object with winning grid

	this.rows = 1;
	this.cols = 1;

	// check a state against the win state
	this.checkStateEquality = function(stateA, stateB) {
		gA = stateA.grid;
		gB = stateB.grid;

		for (var r = 0; r < this.rows; r++) {
			for (var c = 0; c < this.cols; c++) {
				if (gA[r][c] != gB[r][c]) {
					return false;
				}
			}
		}

		return true;
	}

	// check if array contains a given state
	this.checkInclusion = function(stateArray, state) {
		for (var i = 0; i < stateArray.length; i++) {
			if (this.checkStateEquality(stateArray[i], state)) {
				return true;
			}
		}

		return false;
	}

	// get the index of a state in a given array
	this.getIndexOfState = function(stateArray, state) {
		for (var i = 0; i < stateArray.length; i++) {
			if (this.checkStateEquality(stateArray[i], state)) {
				return i;
			}
		}

		return undefined;
	}

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

		this.winState = new State(undefined, 0, 0, this.winGrid, "");
		this.winState.grid = gridCopy(this.winGrid);
	}

	this.constructWinState();

	// generate a random solvable initial state
	this.getRandomState = function() {
		// initialize at win state to guarantee solution
		var state = new State(undefined, 0, 0, this.winGrid, "");
		state.grid = gridCopy(this.winGrid);

		// make arbitrary number of random moves
		for (var i = 0; i < 100; i++) {
			var moves = state.getAllPossibleTransitions();
			state = moves[Math.floor(Math.random() * moves.length)];
		}

		return state;
	}

	this.getLowestFCost = function(states) {
		var min = states[0].fCost;
		var minArray = [];

		// get lowest f cost
		for (var i = 0; i < states.length; i++) {
			if (states[i].fCost < min) {
				min = states[i].fCost;
				minArray = [];
			}

			if (states[i].fCost == min) {
				minArray.push(states[i]);
			}
		}

		if (minArray.length > 1) {
			// if multiple options, take lowest h cost
			var minH = minArray[0];

			for (var i = 0; i < minArray.length; i++) {
				if (minArray[i].hCost < minH.hCost) {
					minH = minArray[i];
				}
			}

			return minH;
		} else {
			return minArray[0];
		}
	}

	// search init state for solution using a*
	this.astar = function(init) {
		var closedSet = [];			// nodes already expanded
		var openSet = [];			// nodes on frontier available to be expanded

		var lowestCost;

		// set up initial values
		init.calcHCost();
		init.gCost = 0;
		init.calcFCost();

		// add initial state to open set
		openSet.push(init);

		while (true) {
			if (openSet.length == 0) {
				break;
			} else {
				lowestCost = this.getLowestFCost(openSet);

				openSet.splice(this.getIndexOfState(openSet, lowestCost), 1);		// remove from open set
				closedSet.push(lowestCost);											// add to closed set

				// if solution found, terminate
				if (this.checkStateEquality(lowestCost, this.winState)) {
					break;
				}

				// get all possible moves
				var children = lowestCost.getAllPossibleTransitions();

				for (var i = 0; i < children.length; i++) {
					// if child not in closed set
					if (!this.checkInclusion(closedSet, children[i])) {
						// calculate all costs
						children[i].calcGCost();
						children[i].calcHCost();
						children[i].calcFCost();

						// if not already in open set, add
						if (!this.checkInclusion(openSet, children[i])) {
							openSet.push(children[i]);
						}
					}
				}
			}
		}

		if (openSet.length != 0) {
			var path = [];

			var state = lowestCost;

			while (!this.checkStateEquality(state, init)) {
				path.push(state);
				state = state.parent;
			}
			path.push(init);

			return path;
		} else {
			return undefined;
		}
	}

	// search init state for solution using iterative deepening a*
	this.threshold;
	this.currentMinCost;
	this.id_astar = function(init) {

		init.calcHCost();
		init.gCost = 1;
		this.threshold = init.hCost;

		this.currentMinCost = Number.POSITIVE_INFINITY;

		var goalState;

		while (true) {

			goalState = this.iddfs(init);

			console.log("Threshold == " + this.threshold);
			console.log("Min cost outside: " + this.currentMinCost);

			if (goalState != undefined) {
				break;
			} else {

				this.threshold = this.currentMinCost;
				this.currentMinCost = Number.POSITIVE_INFINITY;

			}
		}

		if (goalState != undefined) {
			// reconstruct path
			var path = [];

			var state = goalState;
			while (!this.checkStateEquality(state, init)) {
				path.push(state);
				state = state.parent;
			}
			path.push(init);

			return path;
		} else {
			return undefined;
		}

	}

	// iterative deepening depth first search
	this.iddfs = function(state) {
		if (this.checkStateEquality(state, this.winState)) {
			return state;
		} else {
			var children = state.getAllPossibleTransitions();
			for (var i = 0; i < children.length; i++) {
				children[i].calcHCost();
				children[i].calcGCost();
				children[i].calcFCost();

				if (children[i].fCost <= this.threshold) {
					var search = this.iddfs(children[i]);

					if (search != undefined) {
						return search;
					}
				} else {
					if (children[i].fCost < this.currentMinCost) {
						this.currentMinCost = children[i].fCost;
					}
				}
			}

			return undefined;
		}
	}
}