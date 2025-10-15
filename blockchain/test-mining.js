// test-mining.js
const Blockchain = require('./Blockchain');
const Block = require('./Block');

console.log('🚀 Starting Blockchain with Proof of Work\n');

// Create blockchain (will mine genesis block)
const myBlockchain = new Blockchain();

console.log('\n⛏️  Mining Block 1...');
myBlockchain.addBlock(
  new Block(1, Date.now(), { amount: 100, from: 'Alice', to: 'Bob' })
);

console.log('\n⛏️  Mining Block 2...');
myBlockchain.addBlock(
  new Block(2, Date.now(), { amount: 50, from: 'Bob', to: 'Charlie' })
);

// Display the chain
myBlockchain.displayChain();

// Validate
console.log('\n🔍 Validating blockchain...');
myBlockchain.isChainValid();

// Test tampering
console.log('\n\n🔨 TAMPERING TEST');
console.log('='.repeat(80));
console.log('Attempting to change Block 1 data...\n');

myBlockchain.chain[1].data = { amount: 1000, from: 'Alice', to: 'Hacker' };
console.log('Data changed to:', myBlockchain.chain[1].data);
console.log('\n🔍 Re-validating blockchain...');
const isValid = myBlockchain.isChainValid();

if (!isValid) {
  console.log('\n💡 KEY INSIGHT:');
  console.log('Even though we changed the data, we didn\'t re-mine the block!');
  console.log('The hash no longer matches the data.');
  console.log('To "fix" this, the attacker would need to:');
  console.log('  1. Re-mine this block (costly)');
  console.log('  2. Re-mine ALL subsequent blocks (extremely costly!)');
  console.log('\nThis is why Proof of Work provides security! 🔒');
}