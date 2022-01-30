const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previusHash=''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previusHash = previusHash;
       this.hash = this.calculateHash();
    }
     
    calculateHash(){
        return SHA256(this.index + this.previusHash + this.timestamp +JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"01/01/2017","Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previusHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !==currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previusHash !==previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let sCoin = new Blockchain();
sCoin.addBlock(new Block(1,"10/07/2017",{amount: 4}));
sCoin.addBlock(new Block(2,"10/08/2017",{amount: 10}));

console.log("Is blockchain valid ?" + sCoin.isChainValid());

sCoin.chain[1].data ={amount: 100};
sCoin.chain[1].hash = sCoin.chain[1].calculateHash();
console.log("Is blockchain valid ?" + sCoin.isChainValid());

console.log(JSON.stringify(sCoin, null, 4));