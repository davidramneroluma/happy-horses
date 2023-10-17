const { describe, it } = require('mocha');
const assert = require('assert');
// Import functions to test
const { main } = require('../index');

describe('Test 1', () => {
  it('Filstråle is the heaviest horse', async () => {
    const testcase = await main('heaviest');
    assert.strictEqual(testcase, 'Filstråle');
  });
});

describe('Test 2', () => {
  it('Lövilevi is the hungriest horse', async () => {
    const testcase = await main('Hungriest');
    assert.strictEqual(testcase, 'Lövilevi');
  });
});

describe('Test 3', () => {
  it('The paddocks are well balanced', async () => {
    const testcase = await main('whoLivesWhere');
    const paddocks = JSON.stringify(testcase);
    console.log(paddocks);
    assert.strictEqual(
      paddocks,
      `{"paddock1":["Brölfale","Lövilevi"],"paddock2":["Filstråle","Himmelnos"]}`,
    );
  });
});
