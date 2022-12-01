let calories = 0;
const allCalories = [];

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      allCalories.push(calories);
      calories = 0;
    } else {
      calories += Number.parseInt(line);
    }
  },
  solving: () => {
    allCalories.sort((a,b) => {
      return b - a;
    });
    console.log(allCalories[0]);
    console.log(allCalories[0] + allCalories[1] + allCalories[2]);  
  }
};
