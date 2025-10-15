// test.js
const Block = require('./Block');

console.log('🔗 Creating a simple blockchain...\n');

// Create Genesis Block (first block)
const genesisBlock = new Block(0, Date.now(), 'Genesis Block', '0');
console.log('Block 0 (Genesis):');
console.log(`  Hash: ${genesisBlock.hash}`);
console.log(`  Previous Hash: ${genesisBlock.previousHash}`);
console.log(`  Data: ${genesisBlock.data}`);
console.log();

// Create Block 1
const block1 = new Block(1, Date.now(), 'Block 1 Data', genesisBlock.hash);
console.log('Block 1:');
console.log(`  Hash: ${block1.hash}`);
console.log(`  Previous Hash: ${block1.previousHash}`);
console.log(`  Data: ${block1.data}`);
console.log();

// Create Block 2
const block2 = new Block(2, Date.now(), 'Block 2 Data', block1.hash);
console.log('Block 2:');
console.log(`  Hash: ${block2.hash}`);
console.log(`  Previous Hash: ${block2.previousHash}`);
console.log(`  Data: ${block2.data}`);
console.log();

// Show the chain
console.log('📊 Chain Structure:');
console.log(`Genesis (0) → Block 1 (${block1.hash.substring(0, 8)}...) → Block 2 (${block2.hash.substring(0, 8)}...)`);
console.log();

// Demonstrate immutability
console.log('🔨 Attempting to tamper with Block 1...');
console.log(`Block 1 original hash: ${block1.hash}`);
block1.data = 'TAMPERED DATA';
const newHash = block1.calculateHash();
console.log(`Block 1 new hash: ${newHash}`);
console.log(`Block 2's previousHash: ${block2.previousHash}`);
console.log();

if (newHash !== block2.previousHash) {
  console.log('❌ TAMPERING DETECTED! Block 2\'s previousHash doesn\'t match Block 1\'s new hash');
  console.log('✅ This is how blockchain detects tampering!');
}