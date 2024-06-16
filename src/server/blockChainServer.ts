import express from 'express';
import morgan from 'morgan';
import Blockchain from '../lib/blockchain';
import Block from '../lib/block';

const app = express();
const PORT = 3000;

app.use(morgan('tiny'));
app.use(express.json());

const blockchain = new Blockchain();

app.get('/status', (req, res) => {
    res.json({ 
        numberOfBlocks: blockchain.chain.length,
        isChainValid: blockchain.isValid(),
        lastBlock: blockchain.getLatestBlock()
    });
});

app.get('/blocks/next', (req, res) => {
    res.json(blockchain.getNextBlock());
});

app.get('/blocks/:indexOrHash', (req, res) => {
    const { indexOrHash } = req.params;
    if (/^[0-9]+$/.test(indexOrHash)) {
        return res.json(blockchain.chain[parseInt(indexOrHash)]);
    }
    res.json(blockchain.getBlockByHash(indexOrHash));
});

app.post('/blocks', (req, res) => {
    const { index, data, previousHash } = req.body;
    console.log('Received block', req.body);
    const block = new Block(index, data, previousHash);
    const result = blockchain.addBlock(block);
    console.log('Block added', result)
    if (result.sucess) {
        res.status(201).json(block);
    } else {
        res.status(400).json({ error: result.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
