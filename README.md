# npuzzle-astar
Generalized solution to any N-puzzle

Given any n number of tiles, a square grid can be created only if n + 1 is a perfect square.

If n + 1 is not, factors must be used to create a rectangle grid as close to a square as possible (where factors are closest to each other)

This grid is then filled with numbers 0 - n, where 0 represents the void tile.

To search for solutions, I implemented first A*, using the sum of Manhattan distances to solved positions of all tiles as my heuristic.

Realizing this approach has limits (runtime becomes an issue as n grows to even small values like 15) I tried implementing IDA* (Iterative Deepening A*) which has been shown to be effective for this problem.

However, I've noticed no improvement in performance and it seems to perform worse than A* at the moment. 