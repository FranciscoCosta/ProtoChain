import express from 'express';
import morgan from 'morgan';
import  Blockchain  from '../lib/blockchain';
import { is } from 'express/lib/request';
import Block from '../lib/block';


const app = express();
const PORT = 3000;

app.use(morgan('tiny'));
app.use(express.json());

const blockchain = new Blockchain();


app.get('/status', (req, res, next) => {
    res.json({ 
        numberofBlocks: blockchain.chain.length,
        isChainValid: blockchain.isValid(),
        lastBlock: blockchain.getLatestBlock()
    });
});


app.get('/blocks/:indexOrHash', (req, res, next) => {
    const { indexOrHash } = req.params;
    if(/^[0-9]+$/.test(indexOrHash)){
        return res.json(blockchain.chain[parseInt(indexOrHash)]);
    }
    res.json(blockchain.getBlockByHash(indexOrHash));
}
);

app.post('/blocks', (req, res, next) => {

    const { index , data, previousHash} = req.body;
    const block = new Block(index, data, previousHash);
    const result = blockchain.addBlock(block);
    if(result.sucess){
        res.status(201).json(block);
    }
    else{
        res.status(400).json({ error: result.message });
    }
}
)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });


