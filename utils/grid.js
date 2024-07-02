/**
 * This file contains functions for creating and manipulating the grid that
 * keeps track of empty and occupied cells in the schedule.
*/

export const initializeGrid = (rows, cols, val) => {
  const grid = []
  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++) {
      grid[i][j] = val
    }
  }
  return grid
}

export const fillGridArea = (grid, coords, val) => {
  const { xStart, xEnd, yStart, yEnd } = coords
  for (let i = yStart; i < yEnd; i++) {
    for (let j = xStart; j < xEnd; j++) {
      grid[i][j] = val
    }
  }
  return grid
}

const expandRectangle = (grid, yStart, xStart) => {
  const minSize = 8
  let size = 1
  const yEnd = yStart
  let xEnd = xStart
  let canExpandRight = true
  let canExpandDown = true

  // Expand rectangle in both directions
  while (canExpandDown && canExpandRight) {
    // Sweep the expanded sides to check if blocked
    for (let i = 0; i < size; i++) {
      canExpandDown = yEnd - size >= 0 && grid[yEnd - size][xStart + i] === false
      canExpandRight = xStart + size < grid[yEnd].length && grid[yEnd - i][xStart + size + 1] === false
      if (!canExpandRight || !canExpandDown) {
        break
      }
    }

    // If block is found after sweep, break
    if (!canExpandRight || !canExpandDown) {
      if (!canExpandRight && !canExpandDown) {
        canExpandDown = true
        size--
      }
      break
    }

    size++
  }

  const saveCanExpandDown = canExpandDown
  const saveCanExpandRight = canExpandRight

  yStart = yEnd - size
  xEnd = xStart + size + 1

  // Expand rectangle in the direction that is not blocked
  let canExpand = true

  if (canExpandDown) {
    while (yStart >= 0 && canExpand) {
      for (let i = 0; i < size; i++) {
        if (grid[yStart][xStart + i] === true) {
          canExpand = false
        }
      }
      if (canExpand) yStart--
    }
  } else if (canExpandRight) {
    while (xEnd < grid[yEnd].length && canExpand) {
      for (let i = 0; i < size; i++) {
        if (grid[yEnd - i][xEnd + 1] === true) {
          canExpand = false
          break
        }
      }
      if (canExpand) xEnd++
    }
  }

  // Check if rectangle is big enough
  if (Math.abs(xEnd - xStart) > minSize && Math.abs(yEnd - yStart) > minSize) {
    return { xStart, xEnd, yStart: yStart + 1, yEnd: yEnd + 1, saveCanExpandDown, saveCanExpandRight }
  } else {
    return []
  }
}

const isInsideRectangle = (rectangle, y, x) => {
  if (!rectangle) return false

  const { xStart, xEnd, yStart, yEnd } = rectangle
  return x >= xStart && x <= xEnd && y <= yEnd && y >= yStart
}

export const findEmptyRectangles = (grid) => {
  const emptyRectangles = []

  for (let y = 99; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      // OPTIMIZATION: could skip some iterations by setting x and y to the end of the found rectangle
      if (grid[y][x] === false && !emptyRectangles.some(rectangle => isInsideRectangle(rectangle, y, x))) {
        const rectangle = expandRectangle(grid, y === 99 ? y : y + 1, x)
        if (rectangle.length != 0) {
          emptyRectangles.push(rectangle)
        }
      }
    }
  }

  return emptyRectangles
}
