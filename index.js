const { getHorses } = require('./database');
async function main(WhichHorseAreYouLookingFor) {
  const horses = await getHorses();
  const heaviestHorse = horses.find((h) => {
    return !horses.some((h2) => h2.weight > h.weight && h.id != h2.id);
  });
  function howMuchFoodDoesAHorseEat(horse) {
    if (horse.age > 3) {
      return (200 * horse.weight) / horse.age;
    }
    if (horse.age < 3) {
      // Growing horses have different needs
      return 30 * horse.weight * horse.age;
    }
  }

  horses.forEach((h) => {
    const hunger = howMuchFoodDoesAHorseEat(h);
    h.hunger = hunger;
  });

  const hungriestHorse = horses.find((h) => {
    return !horses.some((h2) => h2.hunger > h.hunger && h.id != h2.id);
  });

  function areTheHorsesCompatible(horse1, horse2) {
    if (
      (horse1.likes.includes('neighing') &&
        horse2.hates.includes('loud noises')) ||
      (horse1.weight > 500 && horse2.hates.includes('big horses'))
    )
      return false;
    return true;
  }

  function groupTheHorsesIntoPaddocks() {
    const paddock1 = [];
    const paddock2 = [];
    const lonelyHorses = [];
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
        lonelyHorses.push(horse);
      }
    });
    return {
      paddock1: paddock1.map((e) => e.name),
      paddock2: paddock2.map((e) => e.name),
      lonelyHorses: lonelyHorses.map((e) => e.name),
    };
  }

  if (WhichHorseAreYouLookingFor == 'heaviest') {
    return heaviestHorse.name;
  }
  if (WhichHorseAreYouLookingFor == 'Hungriest') {
    return hungriestHorse.name;
  }
  if (WhichHorseAreYouLookingFor == 'loneliest') {
    const paddocks = groupTheHorsesIntoPaddocks();
    console.log(JSON.stringify(paddocks));
    return paddocks.lonelyHorses.find((x) => x);
  }
}

module.exports = { main };
