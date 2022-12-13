const allPackets = [];

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
    allPackets.push(eval(line));
  },
  solving: () => {
    allPackets.push([[2]]);
    allPackets.push([[6]]);
    allPackets.sort(compare).reverse();
    // console.log(allPackets);

    const decoderKeys = [];
    allPackets.forEach((packet, index) => {
      const inString = JSON.stringify(packet);
      if (inString === '[[2]]' || inString === '[[6]]') {
        decoderKeys.push(index + 1);
      }
    });
    console.log(decoderKeys, decoderKeys[0] * decoderKeys[1]);
  },
};
