import axios from 'axios';
import BlockInfo from '../lib/blockInfo';
import Block from '../lib/block';

const BLOCHAIN_SERVER = "http://localhost:3000/";
const minerWallet = {
    privateKey : 'miner1',
    publicKey : 'miner1'
}

let TotalMined = 0;

async function mine(){
    console.log('start...');
    const response = await axios.get(`${BLOCHAIN_SERVER}blocks/next`);
    

    const blockInfo = response.data as BlockInfo;
  
    const newBlock = Block.fromBlockInfo(blockInfo);
 
    console.log('Mining block', newBlock.index);

    newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

    console.log('Block mined sending to blockchain', newBlock);

    try{
        await axios.post(`${BLOCHAIN_SERVER}blocks`, newBlock);
        console.log('Block sent to blockchain', newBlock);
        TotalMined++;
        console.log('Total blocks mined', TotalMined);
    }catch(e : any){
        

    }
    setTimeout(() => {
        mine();
    }, 5000);
}

mine();