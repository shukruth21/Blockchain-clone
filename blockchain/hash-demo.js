// hash-demo.js
const crypto = require('crypto');

// Function to create a SHA-256 hash
function hash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Experiment 1: Hash a simple string
console.log('=== Experiment 1: Basic Hashing ===');
console.log('Input: "Hello World"');
console.log('Hash:', hash('Hello World'));
console.log();

// Experiment 2: Small change = completely different hash
console.log('=== Experiment 2: Avalanche Effect ===');
console.log('Input: "Hello World"');
console.log('Hash:', hash('Hello World'));
console.log();
console.log('Input: "Hello World!" (added one character)');
console.log('Hash:', hash('Hello World!'));
console.log();

// Experiment 3: Same input = same hash (deterministic)
console.log('=== Experiment 3: Deterministic ===');
console.log('Hash 1:', hash('Blockchain'));
console.log('Hash 2:', hash('Blockchain'));
console.log('Are they the same?', hash('Blockchain') === hash('Blockchain'));
console.log();

// Experiment 4: Hash different data types
console.log('=== Experiment 4: Hashing Different Data ===');
const data = {
  index: 1,
  timestamp: Date.now(),
  data: 'Transaction data',
  previousHash: '0'
};
console.log('Object:', data);
console.log('Hash:', hash(JSON.stringify(data)));

//What happens if you hash "Hello World" 100 times?
const dataa = "hello world"
for(let i=0;i<100;i++){
    console.log("hashing 100 times:",hash(dataa))
}