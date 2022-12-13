const pairs = [];
let isReadingFirstPair = false;

const compare = (left, right) => {
  const isLeftNumber = typeof left === 'number';
  const isRightNumber = typeof right === 'number';
  const isLeftArray = Array.isArray(left);
  const isRightArray = Array.isArray(right);

  // console.log(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);
  if (typeof left === 'undefined' && typeof right !== 'undefined') {
    return 1;
  } else if (typeof left !== 'undefined' && typeof right === 'undefined') {
    return -1;
  } else if (isLeftNumber && isRightNumber) {
    return right - left;
  } else if (isLeftArray && isRightArray) {
    for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
      const result = compare(left[i], right[i]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  } else if ((isLeftNumber && isRightArray)) {
    return compare([left], right);
  } else if (isLeftArray && isRightNumber) {
    return compare(left, [right]);
  } else {
    console.log('?!');
    return 0;
  }
};

let pairBuffer = {};
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    isReadingFirstPair = !isReadingFirstPair;
    if (isReadingFirstPair) {
      pairBuffer.left = eval(line);
    } else {
      pairBuffer.right = eval(line);
    }

    if (!isReadingFirstPair) {
      pairs.push(pairBuffer);
      pairBuffer = {};
    }
  },
  solving: () => {

    console.log(pairs);
    let result = 0;
    for (let p = 0; p < pairs.length; p += 1) {
      const pair = pairs[p];
      const comparison = compare(pair.left, pair.right);
      if (comparison >= 0) {
        result += p + 1;
        console.log(`Inputs ${p + 1} are in right order`);
      } else {
        console.log(`Inputs ${p + 1} are not in right order`);
      }
    }
    console.log(result);
  },
};
