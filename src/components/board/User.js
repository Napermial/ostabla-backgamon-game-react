
export default class User {
    constructor(name, colour, id){
        this.name = name;
        this.colour = colour;
        this.id = id;
    }
    id = Number;
    colour = '';
    rocks = [];
    name = "";
    score = 0;
    inGame = false;
    extraRocks = 0;
}