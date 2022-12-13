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
    if (diff <= 1 && !visited.has(toCoord(point))) {
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
    let now = JSON.parse(JSON.stringify(start));
    let candidates = [now];

    let coord = toCoord(now);
    visited.add(coord);

    while (candidates.length > 0) {
      now = candidates.shift();
      console.log(`REACHED (${now.c}, ${now.r}) ${now.h} ${now.direction}`);

      if (now.c === end.c && now.r === end.r) {
        break;
      }

      let newCandidates = selectCandidates(now, visited);
      newCandidates.forEach(point => {
        visited.add(toCoord(point));
        point.parent = now;
      });
      candidates = candidates.concat(newCandidates);
    }

    let lengthOfPath = 0;
    while (now.parent) {
      lengthOfPath += 1;
      now = now.parent;
    }
    console.log(lengthOfPath);
  },
};
