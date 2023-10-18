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
  it('Professor Kanel is the loneliest horse :(', async () => {
    const loneliestHorse = await main('loneliest');
    assert.strictEqual(loneliestHorse, 'Professor Kanel');
  });
});
