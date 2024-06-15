import { SHA256 } from 'crypto-js';

type MiningResult = {
    hash: string;
    nonce: number;

}

export default class Block {

    index : number;
    timestamp : number;
    data : string;
    previousHash : string;
    hash : string;



    constructor(index : number, data : string, previousHash : string = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        
    }

    calculateHash() : string {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }

    isValid() : boolean {
        if(this.index < 0) return false;
        if(this.timestamp < 0) return false;
        if(this.data === '') return false;
        if(this.hash !== this.calculateHash()) return false;
        if(this.previousHash === '' && this.index !== 0) return false;
        return true;
    }


}


