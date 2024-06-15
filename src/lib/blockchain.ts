import Block from "./block";

export default class Blockchain {
    chain: Block[];
    nextIndex: number = 0;

    constructor() {
        this.chain = [new Block(this.nextIndex, 'Genesis block')];
        this.nextIndex = 1;  
    }
    
    addBlock(block: Block): boolean {
        const latestBlock = this.getLatestBlock();

        // Check if the block's index is valid
        if (block.index !== latestBlock.index + 1) {
            return false;
        }

        // Check if the block's previousHash matches the latest block's hash
        if (block.previousHash !== latestBlock.hash) {
            return false;
        }

        // Check if the block's hash is valid
        if (!block.isValid()) {
            return false;
        }

        this.chain.push(block);
        this.nextIndex++;
        return true;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    isValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.isValid()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


// const blockchain = new Blockchain();

// const block = new Block(1, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block);
// const block2 = new Block(2, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block2);

// console.log(blockchain);