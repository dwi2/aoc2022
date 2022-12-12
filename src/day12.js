const hmap = [];
const start = {};
const end = {};
let maxRow = 0;
let maxColumn = 0;

const toCoord = (pos) => {
  return `${pos.c},${pos.r}`;
};

const convert = (height) => {
  if (height === 'S') {
    return 'a';
  } else if (height === 'E') {
    return 'z'
  }
  return height;
};
const getDiff = (a, b) => {
  let heightOfA = convert(a);
  let heightOfB = convert(b);
  return heightOfA.codePointAt(0) - heightOfB.codePointAt(0);
};

const selectCandidates = (now, visited) => {
  let left =
    now.c - 1 >= 0
      ? { c: now.c - 1, r: now.r, h: hmap[now.r][now.c - 1], direction: '<' }
      : null;
  let right =
    now.c + 1 < maxColumn
      ? { c: now.c + 1, r: now.r, h: hmap[now.r][now.c + 1], direction: '>' }
      : null;
  let up =
    now.r - 1 >= 0
      ? { c: now.c, r: now.r - 1, h: hmap[now.r - 1][now.c], direction: '^' }
      : null;
  let down =
    now.r + 1 < maxRow
      ? { c: now.c, r: now.r + 1, h: hmap[now.r + 1][now.c], direction: 'v' }
      : null;

  const candidates = [];
  [right, down, left, up].forEach((point) => {
    if (!point) {
      return;
    }
    const diff = getDiff(point.h, now.h);
    if (diff <= 1 && diff >= -4 && !visited.has(toCoord(point))) {
      candidates.push(point);
    } else if (point.h === 'E' && (now.h === 'z' || now.h === 'y')) {
      candidates.unshift(point);
    }
  });

  candidates.sort((a, b) => {
    if (a.h === 'E') {
      return -1;
    } else if (b.h === 'E') {
      return 1;
    }
    return getDiff(b.h, a.h) || b.c - a.c || b.r - a.r;
  });

  return candidates;
};

const records = [];
// process.on('uncaughtException', () => {
//   records.forEach(rec => {
//     console.log(rec);
//   })
// });

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    hmap.push(line.split(""));
  },
  solving: () => {
    maxRow = hmap.length;
    hmap.forEach((row, rowIndex) => {
      if (row.includes("E")) {
        end.c = row.indexOf("E");
        end.r = rowIndex;
        end.h = "z";
      }
      if (row.includes("S")) {
        start.c = row.indexOf("S");
        start.r = rowIndex;
        start.h = "a";
      }

      if (maxColumn === 0) {
        maxColumn = row.length;
      }
    });

    // console.log(start, end, maxColumn, maxRow);
    // console.log(hmap);

    const visited = new Set();
    const path = [];
    const candidateMap = new Map();
    let now = JSON.parse(JSON.stringify(start));
    let loop = 0;

    while (!(now.c === end.c && now.r === end.r) && loop < maxRow * maxColumn * 2) {
      let coord = toCoord(now);
      visited.add(coord);
      path.push(now);
      records.push(`(${now.c + 1}, ${now.r + 1}) ${now.h}`);
      console.log(`Reached (${now.c + 1}, ${now.r + 1}) ${now.h} ${now.direction}`);

      let candidates = selectCandidates(now, visited);
      // console.log(candidates);

      while (!candidates || candidates.length === 0) {
        // Backtrack
        console.log(`BACKTRACK from (${now.c + 1}, ${now.r + 1}) candidateMap(${candidateMap.size})`);
        path.pop();
        visited.delete(coord);
        // candidateMap.delete(coord)

        now = path[path.length - 1];
        // candidates = selectCandidates(now, visited);
        candidates = candidateMap.get(toCoord(now));
        console.log(`get candidateMap of (${now.c + 1}, ${now.r + 1}), ${candidates && candidates.length}`);
        // console.log(candidates, candidateMap);
      }

      now = candidates.shift();
      if (candidates.length > 0) {
        candidateMap.set(toCoord(now), candidates);
        console.log(`Added ${candidates.length} candidates of (${now.c + 1}, ${now.r + 1}) in candidateMap(${candidateMap.size})`);
      }
      loop += 1;
    }

    console.log(visited.size);

    const fullPath = path.reduce((acc, point) => {
      return point.direction ? acc + point.direction : '';
    }, '');
    console.log(fullPath, fullPath.length);
    // console.log(path, loop);
  },
};
