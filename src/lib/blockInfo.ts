export default interface BlockInfo {
    index: number;
    previousHash: string;
    difficulty: number;
    maxDifficulty: number;
    ferPerTx: number;
    data: string;
}