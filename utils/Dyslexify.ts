//intefaces
interface Boundary {
  index: number;
  char: string;
}

function separateWords(word: string) {
  //separate words by boundaries
  //identify boundaries and groups
  const boundaries = [] as Boundary[];
  const groups = [] as string[];

  //boudary dictionary
  const boundaryDictionary = [
    ' ',
    '-',
    '/',
    '\\',
    "'",
    '"',
    '|',
    ',',
    '.',
    '_',
  ];

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

function unifyWords(boundaries: Boundary[], groups: string[]) {
  const unified = boundaries.reduce(
    (acc, boundry, index) => `${acc}${boundry.char}${groups[index + 1]}`,
    groups[0]
  );
  return unified;
}

function generateRandomIndexes(
  num: number,
  max: number,
  restrain: number[] = []
) {
  //Test if can generate al unique
  if (num + restrain.length > max + 1) {
    throw new Error('cannot generate unique random number');
  }

  const randArray = [] as number[];

  const recursiveNewRand = function () {
    let rand = Math.round(Math.random() * max);
    if ([...restrain, ...randArray].includes(rand)) {
      rand = recursiveNewRand();
    }
    return rand;
  };

  for (let i = 0; i < num; i++) {
    //todo do not repeat
    randArray.push(recursiveNewRand());
  }
  return randArray;
}

function swapLetters(word: string, toChange: number[]) {
  //Roll right

  //test to Change
  const errors = [] as Error[];
  toChange.forEach((num) => {
    if (num >= word.length)
      errors.push(Error('array toChange contains invalid numbers'));
  });

  if (errors.length) {
    throw errors;
  }

  //extract chars from word
  const extractedLetters = toChange.map((index) => word[index]);
  const shiftedLetters = [extractedLetters.pop(), ...extractedLetters];
  const wordSwapped = toChange.reduce(
    (prev, changing, currentIndex) =>
      `${prev.substr(0, changing)}${shiftedLetters[currentIndex]}${prev.substr(
        changing + 1
      )}`,
    word
  );

  return wordSwapped;
}

function swapMiddle(nickname: string) {
  //alg1 change any 2 char of place, in a specific word Separated with( space, dashes, /, underline, boundaries of uppaer and lower case)
  //chars next to boundarys do not change

  //separate words
  const { boundaries, groups } = separateWords(nickname);

  //repeat any number of times
  //todo: change number of times executing it
  const dyslexicGroups = groups.map((group) => {
    const { length } = group;
    const maxIndex = length - 1;

    const changeTimes = Math.min(length - 3, 5);

    //special case
    if (length <= 3) return group;

    let auxGroup = group;
    for (let i = 0; i <= changeTimes; i++) {
      const indexes = generateRandomIndexes(2, maxIndex, [0, maxIndex]);
      console.log(indexes);
      auxGroup = swapLetters(auxGroup, indexes);
      console.log(indexes, auxGroup);
    }

    return auxGroup;
  });

  const dyslexyfied = unifyWords(boundaries, dyslexicGroups);

  return dyslexyfied;
}

//todo separate
function swapInitials() {}

function createDyslexify(options?: {}) {
  const Dyslexify = { swapMiddle };
  return Dyslexify;
}

(() => {
  console.log('aah', generateRandomIndexes(9, 10, [0, 10]));
})();
export default createDyslexify;
