const { getHorses } = require('./database');

async function main(WhichHorseAreYouLookingFor) {
  const horses = await getHorses();
  const heaviestHorse = findHeaviestHorse(horses);
  const hungriestHorse = findHungriestHorse(horses);
  const paddocks = groupHorsesIntoPaddocks(horses);

  if (WhichHorseAreYouLookingFor == 'heaviest') {
    return heaviestHorse.name;
  }
  if (WhichHorseAreYouLookingFor == 'Hungriest') {
    return hungriestHorse.name;
  }
  if (WhichHorseAreYouLookingFor == 'whoLivesWhere') {
    return paddocks;
  }
}

function findHeaviestHorse(horses) {
  return horses.reduce((prev, curr) =>
    prev.weight > curr.weight ? prev : curr,
  );
}

function findHungriestHorse(horses) {
  horses.forEach((h) => {
    const hunger = howMuchFoodDoesAHorseEat(h);
    h.hunger = hunger;
  });

  const hungriestHorse = horses.find((h) => {
    return !horses.some((h2) => h2.hunger > h.hunger && h.id != h2.id);
  });
  return hungriestHorse;
}
function howMuchFoodDoesAHorseEat(horse) {
  if (horse.age > 3) {
    return (200 * horse.weight) / horse.age;
  }
  if (horse.age < 3) {
    // Growing horses have different needs
    return 30 * horse.weight * horse.age;
  }
}

function groupHorsesIntoPaddocks(horses) {
  const paddocks = { paddock1: [], paddock2: [] };
  horses.forEach((horse) => {
    let horseFoundAHome = false;
    Object.values(paddocks).forEach((paddock) => {
      if (!horseFoundAHome && isHorseCompatibleWithPaddock(horse, paddock)) {
        paddock.push(horse);
        horseFoundAHome = true;
      }
    });
    if (!horseFoundAHome) {
      throw new Error(`Horse ${horse.name} has no friendly paddock!`);
    }
  });
  return {
    paddock1: paddocks.paddock1.map((horse) => horse.name),
    paddock2: paddocks.paddock2.map((horse) => horse.name),
  };
}

function isHorseCompatibleWithPaddock(horse, paddock) {
  return paddock.every((paddockHorse) =>
    areHorsesCompatible(horse, paddockHorse),
  );
}

function areHorsesCompatible(horse1, horse2) {
  if (
    (horse1.likes.includes('neighing') &&
      horse2.hates.includes('loud noises')) ||
    (horse1.weight > 500 && horse2.hates.includes('big horses'))
  ) {
    return false;
  }
  return true;
}

module.exports = { main };
