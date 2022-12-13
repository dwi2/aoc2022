const monkeys = [];
let state = {inspects: 0};
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    if (line.startsWith("Monkey")) {
      const id = Number.parseInt(line.substring(7, 8));
      if (id > 0) {
        monkeys.push(state);
        state = {inspects: 0};
      }
      state.id = id;
    } else if (line.includes("Starting items:")) {
      let items = line.substring(18).split(",");
      items = items.map((item) => {
        return Number.parseInt(item);
      });
      state.items = items;
    } else if (line.includes("Operation:")) {
      const operator = line.substring(23, 24);
      const constant = line.substring(25);
      if (constant === "old") {
        state.operator = "**";
        state.operatorConstant = 2;
      } else {
        state.operator = operator;
        state.operatorConstant = Number.parseInt(constant);
      }
      state.operation = line.substring(22);
    } else if (line.includes("Test: divisible by")) {
      state.dividedBy = Number.parseInt(line.substring(21));
    } else if (line.includes("If true:")) {
      state.yes = Number.parseInt(line.substring(29));
    } else if (line.includes("If false:")) {
      state.no = Number.parseInt(line.substring(30));
    }
  },
  solving: () => {
    monkeys.push(state);

    let common = 1;
    monkeys.forEach(monkey => {
      common = common * monkey.dividedBy;
    });
    console.log(common);

    // console.log(monkeys);
    let FINAL_ROUND = 10000;
    for (let round = 0; round < FINAL_ROUND; round += 1) {

      monkeys.forEach((monkey) => {
        // console.log(`Monkey ${monkey.id}:`);
        const numberOfItems = monkey.items.length;
        for (let i = 0; i < numberOfItems; i += 1) {
          const item = monkey.items.shift();
          monkey.inspects += 1;
          // console.log(`  Monkey inspects an item with a worry level of ${item}`);
          let worryLevel = eval(
            `${item}${monkey.operator}${monkey.operatorConstant}`
          );
          worryLevel = worryLevel % common;
          // console.log(
          //   `    Worry level is ${monkey.operator}${monkey.operatorConstant} to ${worryLevel}.`
          // );
          if (worryLevel % monkey.dividedBy === 0) {
            // console.log(`    Current worry level is divisible by ${monkey.dividedBy}.`)
            monkeys[monkey.yes].items.push(worryLevel);
            // console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.yes}`);
          } else {
            // console.log(`    Current worry level is not divisible by ${monkey.dividedBy}.`)
            monkeys[monkey.no].items.push(worryLevel);
            // console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.no}`);
          }
        }
      });

      // monkeys.forEach((monkey, index) => console.log(round + 1, index, monkey.items));
    }

    monkeys.forEach((monkey, index) => console.log(`Monkey ${index} inspected items ${monkey.inspects} times`));
  },
};
