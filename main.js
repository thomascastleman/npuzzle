
var p;

function main() {
	p = new NPuzzle(8);


}

function gridCopy(grid) {
	var copy = [];
	for (var row = 0; row < grid.length; row++) {
		copy.push([]);
		for (var col = 0; col < grid[row].length; col++) {
			copy[row].push(grid[row][col]);
		}
	}
	return copy;
}

// thanks to Johnny Lindbergh for prime factorization
function primeFactor(n) {
	var primFac = [];
	var d = 2;
	while (d * d <= n) {
		while (n % d == 0) {
			primFac.push(d);
			n = Math.floor(n / d);
		}
		d++;
	}
	if (n > 1) {
		primFac.push(n);
	}
	return primFac;
}