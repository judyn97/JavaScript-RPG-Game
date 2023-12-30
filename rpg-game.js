//Initial variable
let xp = 0;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const imageArt = document.querySelector(".image-style");
const text = document.querySelector("#text");

const locations = [
    { 
        name: "store",
        "button text": ["Heal 10 Health (Gold 10)", "Buy a weapon (Gold 30)", "Go to town square"],
        "button actions": [healHealth, buyWeapon, goTownSquare],
        art: "store.png",
        text: "You went into the store."     
    },
    { 
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button actions": [goStore, goCave, fightDragon],
        art: "townsquare.jpg",
        text: "You went to the town square."
    }

];

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }

];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button actions"][0];
    button2.onclick = location["button actions"][1];
    button3.onclick = location["button actions"][2];
    imageArt.src = location.art;
    text.innerText = location.text;
}

function goStore(){
    update(locations[0]);
}

function goCave(){
    button1.innerText = "Fight slime";
    button2.innerText = "Fight fanged beast";
    button3.innerText = "Go to town square";
}

function healHealth(){
    if(gold >= 10)
    {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought a Health potion. Increase health by 10.";
        imageArt.src = "potion.jpg"
    }
    else{
        text.innerText = "You do not have enough money to buy a potion.";
        imageArt.src = "store.png"
    }
}

function buyWeapon(){
    if( currentWeapon < weapons.length-1)
    {
        if(gold >= 30)
        {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon ++;
            
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText= "You have bought " + newWeapon + ".";
            text.innerText += " You now have " + inventory + ".";
        }
        else{
            text.innerText = "You do not have enough money to buy a weapon.";
        }
    }
    else{
        text.innerText = "You have bought the strongest weapon!";
    }
}

function goTownSquare(){
    update(locations[1]);
}

function fightDragon(){

}

