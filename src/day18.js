const cubes = new Set();

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    cubes.add(line);
  },
  solving: () => {
    let totalSides = cubes.size * 6;

    cubes.forEach((cube) => {
      const [x, y, z] = cube.split(",").map(n => Number.parseInt(n));

      if (cubes.has(`${x + 1},${y},${z}`)) {
        totalSides -= 1;
      }
      if (cubes.has(`${x - 1},${y},${z}`)) {
        totalSides -= 1;
      }
      if (cubes.has(`${x},${y + 1},${z}`)) {
        totalSides -= 1;
      }
      if (cubes.has(`${x},${y - 1},${z}`)) {
        totalSides -= 1;
      }
      if (cubes.has(`${x},${y},${z + 1}`)) {
        totalSides -= 1;
      }
      if (cubes.has(`${x},${y},${z - 1}`)) {
        totalSides -= 1;
      }

    });

    console.log(totalSides);
  },
};
