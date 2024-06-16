import { SHA256 } from 'crypto-js';
import Validation from './validation';
import BlockInfo from './blockInfo';

type MiningResult = {
    hash: string;
    nounce: number;
    miner: string;
}

export default class Block {

    index : number;
    timestamp : number;
    data : string;
    previousHash : string;
    hash : string;
    nounce : number;
    miner : string;



    constructor(index : number, data : string, previousHash : string = '', nounce : number = 0, miner : string = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = nounce;
        this.miner = miner;
    }

    calculateHash() : string {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nounce + this.miner).toString();
    }

    isValid(difficulty : number) : Validation {
        if(this.index < 0) return new Validation(false, 'Invalid index');
        if(this.timestamp < 0) return new Validation(false, 'Invalid timestamp');
        if(this.data === '') return new Validation(false, 'Invalid data');
       
        if(this.nounce < 0) return new Validation(false, 'Invalid nounce');
        

        // const prefix = new Array(difficulty + 1).join('0');
        // if(this.hash.substring(0, difficulty) !== prefix) return new Validation(false, 'Invalid hash');
        // if(this.previousHash === '' && this.index !== 0) return new Validation(false, 'Invalid previous hash');
        return new Validation();
    }

    mine(difficulty: number, miner: string) {
        this.miner = miner;
        const prefix = new Array(difficulty + 1).join("0");

        do {
            this.nounce++;
            this.hash = this.calculateHash();
        }
        while (!this.hash.startsWith(prefix));
    }

    static fromBlockInfo(blockInfo : BlockInfo) : Block {
        const block = new Block();
        block.index = blockInfo.index;
        block.data = blockInfo.data;
        block.previousHash = blockInfo.previousHash;
        console.log('block', block);
        return block;
    }


}


