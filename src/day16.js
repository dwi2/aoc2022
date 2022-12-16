const toKey = (x, y) => {
  return `${x},${y}`;
};

const map = new Map();
const valves = {};
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    const [valveText, tunnelsText] = line.split(";");

    const parsedValve = valveText.match(/Valve ([A-Z]{2}) has flow rate=([\d]+)/);
    const valveName = parsedValve[1];
    valves[valveName] = Number.parseInt(parsedValve[2]);
    
    const multipleTunnels = tunnelsText.includes('tunnels');
    if (multipleTunnels) {
      const toValves = tunnelsText.substring(24).split(", ");
      map.set(valveName, toValves);
    } else {
      const toValve = tunnelsText.match(/tunnel leads to valve ([A-Z]{2})/)[1];
      map.set(valveName, [toValve]);
    }
  },
  solving: () => {
    console.log(valves);
    console.log(map);

    // let prev = 'AA';
    // let openedValves = [];
    
  },
};
