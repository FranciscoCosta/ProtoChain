import Block from "./block";
import Validation from "./validation";
import BlockInfo from "./blockInfo";

export default class Blockchain {
    chain: Block[];
    nextIndex: number = 0;
    static readonly DIFFICULTY_FACTOR = 1;
    static readonly MAXDIFFICULTY = 62 ;

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
        if (!block.isValid( this.getDifficulty())) {
            return new Validation(false, 'Invalid hash');
        }

        const validation = block.isValid(this.getDifficulty());
        if (!validation.sucess) {
            return validation;
        }
        else {


        this.chain.push(block);
        this.nextIndex++;
        return new Validation();
    }
}

    getDifficulty(): number {
        return Math.ceil(this.chain.length /  Blockchain.DIFFICULTY_FACTOR);
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    isValid(): Validation {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.isValid(this.getDifficulty())) {
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
    getFeePerTx(): number {
        return 1;
    }

    getNextBlock() : BlockInfo {
        const data = 'asdasdfdgdsfd'
        const difficulty = this.getDifficulty();
        const previousHash = this.getLatestBlock().hash;
        const index = this.chain.length;
        const ferPerTx = this.getFeePerTx();
        const maxDifficulty = Blockchain.MAXDIFFICULTY;
        const newBlockInfo = { index, previousHash, difficulty, maxDifficulty, ferPerTx, data } as BlockInfo;
        return newBlockInfo;
}
}


// const blockchain = new Blockchain();

// const block = new Block(1, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block);
// const block2 = new Block(2, "data123", blockchain.getLatestBlock().hash);
// blockchain.addBlock(block2);

// console.log(blockchain);