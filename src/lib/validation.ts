export default class Validation {
    sucess: boolean;
    message: string;

    /**
     * Validates the block 
     * @param sucess  
     * @param message 
     * 
     * @returns Returns true if the block is valid, false otherwise
     */

    constructor(sucess: boolean = true, message: string = "") {
        this.sucess = sucess;
        this.message = message;
    }
}