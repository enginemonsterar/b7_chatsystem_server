var shortID = require('shortid');
var Vector2 = require('./Vector2.js')

module.exports = class Player{
    constructor(){
        this.id = shortID.generate();
        this.username = '';
        this.message = '';
        this.position = new Vector2();
    }
}