var shortID = require('shortid');


module.exports = class Player{
    constructor(){
        this.id = shortID.generate();
        this.username = '';
        this.message = '';        
    }
}