const { describe, it } = require('mocha');
const assert = require('assert');
// Import functions to test
const { main } = require('../index');

describe('Test 1', () => {
  it('Filstråle is the heaviest horse', async () => {
    const heaviestHorse = await main('heaviest');
    assert.strictEqual(heaviestHorse, 'Filstråle');
  });
});

describe('Test 2', () => {
  it('Lövilevi is the hungriest horse', async () => {
    const hungriestHorse = await main('Hungriest');
    assert.strictEqual(hungriestHorse, 'Lövilevi');
  });
});

describe('Test 3', () => {
  it('The paddocks are well balanced', async () => {
    const paddocks = await main('whoLivesWhere');
    console.log(JSON.stringify(paddocks));
    assert.strictEqual(paddocks.paddock1.length, 2);
    assert.strictEqual(paddocks.paddock2.length, 2);
  });
});
