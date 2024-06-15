import Block from "./block";
import Validation from "./validation";

export default class Blockchain {
    chain: Block[];
    nextIndex: number = 0;

    constructor() {
        this.chain = [new Block(this.nextIndex, 'Genesis block')];
        this.nextIndex = 1;  
    }
    
    addBlock(block: Block): Validation {
        const latestBlock = this.getLatestBlock();
        
        // Check if the block's index is valid
        if (block.index !== latestBlock.index + 1) {
            return new Validation(false, 'Invalid index');
        }
        console.log('block.previousHash', block.previousHash);
            // Check if the block's previousHash matches the latest block's hash
        if (block.previousHash !== latestBlock.hash) {
            return new Validation(false, 'Invalid previous hash');
        }

        // Check if the block's hash is valid
        if (!block.isValid()) {
            return new Validation(false, 'Invalid hash');
        }

        this.chain.push(block);
        this.nextIndex++;
        return new Validation();
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    isValid(): Validation {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.isValid()) {
                return new Validation(false, `Block at index ${i} is invalid`);
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return new Validation(false, `Block at index ${i} has invalid previous hash`);
            }
        }
        return new Validation();
    }

    getBlockByHash(hash: string): Block | undefined {
        return this.chain.find(block => block.hash === hash);
    }           
}


// const blockchain = new Blockchain();

// const block = new Block(1, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block);
// const block2 = new Block(2, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block2);

// console.log(blockchain);