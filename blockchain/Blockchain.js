// Blockchain.js
const Block = require('./Block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;  // Start with difficulty 3
  }

  createGenesisBlock() {
    const genesis = new Block(0, Date.now(), 'Genesis Block', '0');
    console.log('\n Creating Genesis Block...');
    genesis.mineBlock(this.difficulty);
    return genesis;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    // Set previous hash
    newBlock.previousHash = this.getLatestBlock().hash;
    
    // Mine the block (this takes time!)
    newBlock.mineBlock(this.difficulty);
    
    // Add to chain
    this.chain.push(newBlock);
  }

  isChainValid() {
    // Check all blocks except genesis
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify current block's hash is correct
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`❌ Block ${i} hash is invalid`);
        return false;
      }

      // Verify link to previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`❌ Block ${i} previous hash doesn't match`);
        return false;
      }

      // NEW: Verify proof of work
      const target = '0'.repeat(this.difficulty);
      if (currentBlock.hash.substring(0, this.difficulty) !== target) {
        console.log(`❌ Block ${i} doesn't meet difficulty requirement`);
        return false;
      }
    }

    console.log('✅ Blockchain is valid!');
    return true;
  }

  // Helper method to display chain
  displayChain() {
    console.log('\n' + '='.repeat(80));
    console.log(' BLOCKCHAIN STATUS');
    console.log('='.repeat(80));
    console.log(`Difficulty: ${this.difficulty}`);
    console.log(`Chain Length: ${this.chain.length} blocks`);
    console.log('='.repeat(80));
    
    this.chain.forEach(block => {
      console.log(`\nBlock #${block.index}`);
      console.log(`  Timestamp: ${new Date(block.timestamp).toLocaleString()}`);
      console.log(`  Data: ${JSON.stringify(block.data)}`);
      console.log(`  Nonce: ${block.nonce.toLocaleString()}`);
      console.log(`  Hash: ${block.hash}`);
      console.log(`  Previous Hash: ${block.previousHash.substring(0, 64)}`);
    });
    
    console.log('\n' + '='.repeat(80));
  }
}

module.exports = Blockchain;
