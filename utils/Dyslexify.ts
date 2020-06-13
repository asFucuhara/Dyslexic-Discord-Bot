//intefaces
interface Boundary {
  index: number;
  char: string;
}

const boundaryDictionary = [' ', '-', '/', '\\', "'", '"', '|', ',', '.', '_'];

//todo separate
function swapInitials() {}

function swapLetters(word: string, indexes: number[]) {
  //if inexes.length = 2: swap, else rotation
  //todo more than 2 indexes
}

function separateWords(word: string) {
  //separate words by boundaries
  //identify boundaries and groups
  const boundaries = [] as Boundary[];
  const groups = [] as string[];

  //accumulator
  let accumulator = '';
  //todo change to reduce
  word.split('').forEach((char, index) => {
    if (boundaryDictionary.find((x) => x === char)) {
      //when on baoundary, add to arrays and reset accumulator
      boundaries.push({ index, char });
      groups.push(accumulator);
      accumulator = '';
    } else {
      //did not find boundary, accumulate
      accumulator += char;
    }
  });
  //push last group to groups
  groups.push(accumulator);

  return { boundaries, groups };
}

function swapMiddle(nickname: string) {
  //alg1 change any 2 letter of place, in a specific word Separated with( space, dashes, /, underline, boundaries of uppaer and lower case)
  //letters next to boundarys do not change

  //separate words
  const { boundaries, groups } = separateWords(nickname);

  //repeat any number of times
  //todo: change number of times executing it
  const dyslexicGroups = groups.map((group) => {
    const { length } = group;
    const changeTimes = Math.min(length - 3, 5);

    //special case
    if (length <= 3) return group;

    let auxGroup = group;
    for (let i = 0; i <= changeTimes; i++) {
      //swap any 2 letters that is not near boundaries for each group
      //rand1/rand2 cannot be 0 nor length - 1, //todo: nor equals
      const rand1 = Math.round(Math.random() * (length - 3) + 1);
      const rand2 = Math.round(Math.random() * (length - 3) + 1);
      const aux = auxGroup[rand1];
      auxGroup =
        auxGroup.substr(0, rand1) +
        auxGroup[rand2] +
        auxGroup.substr(rand1 + 1);
      auxGroup = auxGroup.substr(0, rand2) + aux + auxGroup.substr(rand2 + 1);
    }
    return auxGroup;
  });

  const dyslexyfied = boundaries.reduce(
    (acc, boundry, index) =>
      `${acc}${boundry.char}${dyslexicGroups[index + 1]}`,
    dyslexicGroups[0]
  );

  return dyslexyfied;
}

//todo factory
function createDyslexify(options?: {}) {
  const Dyslexify = { swapMiddle };
  return Dyslexify;
}

export default createDyslexify;
