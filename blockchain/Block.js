const crypto = require('crypto')

class Block {
    constructor(index,timestamp,data,previousHash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash;
        this.nonce = 0
        this.hash = this.calculateHash()
    }

    calculateHash(){
        return crypto
          .createHash('sha256')
          .update(
            this.index+
            this.previousHash+
            this.timestamp+
            JSON.stringify(this.data)+
            this.nonce
          )
          .digest('hex')// completes the hashing process and produces output hex specifies the encoding format     
    }
    mineBlock(difficulty){
      // Create a string of zeros with length = difficulty
      // Example: difficulty 3 → "000"
      const target = '0'.repeat(difficulty);
    
      console.log(`⛏️  Mining block ${this.index}...`);
      const startTime = Date.now();
    
      // Keep trying nonces until hash starts with target zeros
      while (this.hash.substring(0, difficulty) !== target) {
        this.nonce++;
        this.hash = this.calculateHash();
      
        // Optional: Show progress every 100,000 attempts
        if (this.nonce % 100000 === 0) {
          process.stdout.write(`\r   Tried ${this.nonce.toLocaleString()} nonces...`);
        }
      }
    
      const endTime = Date.now();
      const timeSpent = ((endTime - startTime) / 1000).toFixed(2);
    
      console.log(`\n Block mined! Nonce: ${this.nonce} | Time: ${timeSpent}s | Hash: ${this.hash}`);
    }
}

module.exports = Block