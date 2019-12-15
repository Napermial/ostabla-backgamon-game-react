
export default class User {
    constructor(name, colour){
        this.name = name;
        this.colour = colour
    }
    colour = '';
    rocks = [];
    name = "";
    score = 0;
    inGame = false;
    extraRocks = 5;
}