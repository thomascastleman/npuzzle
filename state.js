

function State(prevState, voidRow, voidCol, win_) {

	this.parent = prevState;
	this.grid;
	this.voidPos = {row: voidRow, col: voidCol};

	this.gCost;
	this.hCost;
	this.fCost;

	this.win = gridCopy(win_);	// copy of win state grid for this n-puzzle

	// get the solved index of a num (used for heuristic)
	this.getSolvedPosition = function(num) {
		for (var r = 0; r < this.win.length; r++) {
			for (var c = 0; c < this.win[r].length; c++) {
				if (this.win[r][c] == num) {
					return {row: r, col: c};
				}
			}
		}
		return undefined;
	}

	// set up grid based on parent's grid and arguments for new void position
	this.configureGrid = function() {

		if (this.parent != undefined) {
			this.grid = gridCopy(this.parent.grid);

			// make swap
			if (this.parent.voidPos.row != voidRow || this.parent.voidPos.col != voidCol) {
				this.grid[this.parent.voidPos.row][this.parent.voidPos.col] = this.grid[voidRow][voidCol];
				this.grid[voidRow][voidCol] = 0;
			}
		}
	}

	this.configureGrid();	

	this.calcHCost = function() {
		this.hCost = 0;

		for (var r = 0; r < this.grid.length; r++) {
			for (var c = 0; c < this.grid[r].length; c++) {
				var solved = this.getSolvedPosition(this.grid[r][c]);
				this.hCost += this.getIndivHCost(r, c, solved.row, solved.col);
			}
		}
	}

	this.getIndivHCost = function(r, c, solvedR, solvedC) {
		return Math.abs(solvedR - r) + Math.abs(solvedC - c);
	}

	this.calcGCost = function() {
		this.gCost = this.parent.gCost + 1;
	}

	this.calcFCost = function() {
		this.fCost = this.gCost + this.hCost;
	}

	// return array of all possible child states
	this.getAllPossibleTransitions = function() {
		var possible = [];

		// substitution for cleaner syntax
		var vR = this.voidPos.row;
		var vC = this.voidPos.col;

		// up and down moves
		for (var r = vR - 1; r <= vR + 1; r++) {
			if (this.grid[r] != undefined && r != vR) {
				possible.push(new State(this, r, vC, this.win));
			}
		}

		// left and right moves
		for (var c = vC - 1; c <= vC + 1; c++) {
			if (this.grid[vR][c] != undefined && c != vC) {
				possible.push(new State(this, vR, c, this.win));
			}
		}

		return possible;
	}
}