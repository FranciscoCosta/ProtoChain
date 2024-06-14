import { SHA256 } from 'crypto-js';

type MiningResult = {
    hash: string;
    nonce: number;
    wallet: string;
    balance?: number;
}

export default class Block {

    index : number;
    timestamp : number;
    data : string;
    previousHash : string;
    hash : string;
    nonce : number;
    coinbase : number;
    wallet? : string;
    balance? : number;
    

    constructor(index : number, timestamp : number, data : string, previousHash : string = '', coinbase : number = 100, wallet : string = '', balance : number = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.coinbase = coinbase;
        this.wallet = wallet;
        this.balance = balance;
    }

    calculateHash() : string {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty : number, wallet : string, balance : number) : MiningResult {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        const result : MiningResult = {
            hash: this.hash,
            nonce: this.nonce,
            wallet: wallet,
            balance: balance + this.coinbase
        };

        return result;
    }
    
 
}

    
    