const { getHorses } = require('./database');

async function main(WhichHorseAreYouLookingFor) {
  const horses = await getHorses();

  // Check for no horses
  if (!horses || horses.length == 0) {
    return 'No horses found';
  }

  // Check for heaviest horse
  if (WhichHorseAreYouLookingFor.toLowerCase() == 'heaviest'.toLowerCase()) {
    const heaviestHorse = horses.sort((a, b) => b.weight - a.weight)[0];
    return heaviestHorse.name;
  }

  // Check for hungriest horse
  if (WhichHorseAreYouLookingFor.toLowerCase() == 'Hungriest'.toLowerCase()) {
    const foodNeeded = horses.forEach((h) => {
      const hunger = howMuchFoodDoesAHorseEat(h);
      // Do not mutate the original object
      h.hunger = hunger;
    });

    const hungriestHorse = horses.find((h) => {
      return !horses.some((h2) => h2.hunger > h.hunger && h.id != h2.id);
    });
    return hungriestHorse.name;
  }
  
  // Check for paddocks
  if (WhichHorseAreYouLookingFor.toLowerCase() == 'whoLivesWhere'.toLowerCase()) {
    // Bad pattern of not knowing what the return type is
    return groupTheHorsesIntoPaddocks(horses);
  }

  // Return if no matching horse or command found
  return 'No horse found';
}

function areTheHorsesCompatible(horse1, horse2) {
  if (
    (horse1.likes.includes('neighing') &&
      horse2.hates.includes('loud noises')) ||
    (horse1.weight > 500 && horse2.hates.includes('big horses'))
  )
    return false;
  return true;
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

function groupTheHorsesIntoPaddocks(horses) {
  const paddock1 = [];
  const paddock2 = [];
  horses.forEach((horse) => {
    let horseFoundAHome = false;
    let IncompatibleHorsesInPaddock = paddock1.some(
      (h) =>
        !areTheHorsesCompatible(h, horse) ||
        !areTheHorsesCompatible(horse, h),
    );
    if (!IncompatibleHorsesInPaddock) {
      paddock1.push(horse);
      horseFoundAHome = true;
    }
    IncompatibleHorsesInPaddock = paddock2.some(
      (h) =>
        !areTheHorsesCompatible(h, horse) ||
        !areTheHorsesCompatible(horse, h),
    );
    if (!IncompatibleHorsesInPaddock && !horseFoundAHome) {
      paddock2.push(horse);
      horseFoundAHome = true;
    }
    if (!horseFoundAHome) {
      throw new Error(`Horse ${horse.name} has no friendly paddock!`);
    }
  });
  return {
    paddock1: paddock1.map((e) => e.name),
    paddock2: paddock2.map((e) => e.name),
  };
}

module.exports = { main };
