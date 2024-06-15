import express from 'express';
import morgan from 'morgan';
import  Blockchain  from '../lib/blockchain';
import { is } from 'express/lib/request';


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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });


