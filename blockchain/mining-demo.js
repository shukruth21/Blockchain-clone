// mining-demo.js
const Block = require('./Block');

console.log('='.repeat(60));
console.log(' PROOF OF WORK MINING DEMONSTRATION');
console.log('='.repeat(60));
console.log();

// Test different difficulties
const difficulties = [1, 2, 3, 4,5,6];

difficulties.forEach(difficulty => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`DIFFICULTY ${difficulty} (${difficulty} leading zeros required)`);
  console.log('='.repeat(60));
  
  const block = new Block(
    1,
    Date.now(),
    { amount: 100, from: 'Alice', to: 'Bob' },
    '0000000000000000000000000000000000000000000000000000000000000000'
  );
  
  console.log(`Target: ${'0'.repeat(difficulty)}...`);
  console.log();
  
  block.mineBlock(difficulty);
  
  console.log(`\nFinal hash: ${block.hash}`);
  console.log(`Starts with ${difficulty} zeros? ${block.hash.substring(0, difficulty) === '0'.repeat(difficulty) ? '✅ YES' : '❌ NO'}`);
});

console.log('\n' + '='.repeat(60));
console.log(' MINING DEMONSTRATION COMPLETE');
console.log('='.repeat(60));
console.log();
console.log('Key Observations:');
console.log('1. Each additional zero makes mining ~16x harder');
console.log('2. Same data + different nonce = different hash');
console.log('3. Finding valid nonce requires brute force (trying many nonces)');
console.log('4. This is why Bitcoin uses LOTS of electricity!');
console.log();