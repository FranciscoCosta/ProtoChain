import { SHA256 } from 'crypto-js';
import Validation from './validation';

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

    isValid() : Validation {
        if(this.index < 0) return new Validation(false, 'Invalid index');
        if(this.timestamp < 0) return new Validation(false, 'Invalid timestamp');
        if(this.data === '') return new Validation(false, 'Invalid data');
        if(this.hash !== this.calculateHash()) return new Validation(false, 'Invalid hash');
        if(this.previousHash === '' && this.index !== 0) return new Validation(false, 'Invalid previous hash');
        return new Validation();
    }


}


