//Initial variable
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let inventory = ["stick"];
let bag = [];
let monsterHealth;
let specialLoot;
let itemDropped;
let healthDamaged;
let monsterHealthDamaged;
let goldReceived;
let xpReceived;
let weaponBreak = false;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const imageArt = document.querySelector(".image-style");
const text = document.querySelector("#text");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");
const monsterStatsBar = document.querySelector("#monsterStats");

const locations = [
    { 
        name: "store",
        "button text": ["Heal 10 Health (Gold 10)", "Buy a weapon (Gold 30)", "Go to town square"],
        "button actions": [healHealth, buyWeapon, goTownSquare],
        art: "images/store.jpg",
        text: "You went into the store."     
    },
    { 
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button actions": [goStore, goCave, fightDragon],
        art: "images/townSquare.jpg",
        text: "You went to the town square."
    },
    { 
        name: "dungeon",
        "button text": ["Fight slime monster", "Fight fanged beast", "Go to town square"],
        "button actions": [fightSlime, fightFangedBeast, goTownSquare],
        art: "images/dungeon.jpg",
        text: "You went to the city outskirts and found a dungeon."
    },
    { 
        name: "fight",
        "button text": ["Attack", "Use Item", "Run"],
        "button actions": [attack, useItem, goTownSquare],
        art: "images/dungeon.jpg",
        text: "You found a monster inside the dungeon."
    },
    { 
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button actions": [goTownSquare, goTownSquare, goTownSquare],
        art: "images/dungeon.jpg",
        text: "You killed the monster!"
    },
    { 
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button actions": [restart, restart, restart],
        art: "images/youDied.jpg",
        text: "You die. ☠️"
    },
    { 
        name: "win game",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button actions": [restart, restart, restart],
        art: "images/dungeon.jpg",
        text: "You have defeated the Dragon! The world has gone back to peace."
    },
    { 
        name: "item found",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button actions": [goTownSquare, goTownSquare, goTownSquare],
        art: "images/dungeon.jpg",
        text: "You killed the monster. It seems that the monster drops something.."
    },
    { 
        name: "continue fight",
        "button text": ["Attack", "Use Item", "Run"],
        "button actions": [attack, useItem, goTownSquare],
        art: "images/dungeon.jpg",
        text: "The monster wants to fight you! What do you want to do?"
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

const items = [
    {
        name: "Bioluminescent Algae Orb",
        power: 10
    },
    {
        name: "Venomous Fang Dart",
        power: 12
    },
    {
        name: "Poison Bomb",
        power: 11
    }
];

const monsters = [
    {
      name: "Slime Monster",
      level: 2,
      health: 15
    },
    {
      name: "Fanged Beast",
      level: 8,
      health: 60
    },
    {
      name: "Dragon",
      level: 20,
      health: 300
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goFight(){
    update(locations[3]);
    updateMonsterImage();
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function continueFight(){
    update(locations[8]);
    updateMonsterImage();
    //monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
}

function update(location){
    monsterStatsBar.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button actions"][0];
    button2.onclick = location["button actions"][1];
    button3.onclick = location["button actions"][2];
    imageArt.src = location.art;
    text.innerText = location.text;
}

function updateMonsterImage(){
    if( monsterHealth <= 0)
    {
        monsterStatsBar.style.display = "none";
    }
    else{
        monsterStatsBar.style.display = "block";
    }
    if( fighting === 0)
    {
        imageArt.src = "images/slimeMonster.jpg"
    }
    else if( fighting === 1){
        imageArt.src = "images/fangedBeastMonster.jpg"
    }
    else{
        imageArt.src = "images/dragon.jpg"
    }
}

function goStore(){
    update(locations[0]);
    //text.innerText += " A strange hooded robe man is in the store. He's looking at you...";
}

function goCave(){
    update(locations[2]);
}

function healHealth(){
    if(gold >= 10)
    {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought a Health potion. Increase health by 10.";
        //imageArt.src = "store.jpg"
    }
    else{
        text.innerText = "You do not have enough money to buy a potion.";
        //imageArt.src = "store.jpg"
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

function fightSlime(){
    fighting = 0;
    goFight(fighting);
    text.innerText += " The monster wants to engage you into a fight ! ";
    text.innerText += " What do you want to do ? ";
    monsterStatsBar.style.display = "block";
    imageArt.src = "images/slimeMonster.jpg";
}

function fightFangedBeast(){
    fighting = 1;
    goFight(fighting);
    text.innerText += " The monster wants to engage you into a fight ! ";
    text.innerText += " What do you want to do ? ";
    monsterStatsBar.style.display = "block";
    imageArt.src = "images/fangedBeastMonster.jpg";
}

function fightDragon(){
    fighting = 2;
    goFight(fighting);
    text.innerText += " The dragon wants to engage you into a fight ! ";
    text.innerText += " What do you want to do ? ";
    monsterStatsBar.style.display = "block";
    imageArt.src = "images/dragon.jpg";
}

function attack(){
    healthDamaged = getMonsterAttackValue(monsters[fighting].level);
    health -= healthDamaged;
    healthText.innerText = health;
    text.innerText = "The " + monsters[fighting].name + " attacks.\n";
    text.innerText += " The monster deals " + healthDamaged + " damage to your health!\n";

    if( Math.random() <= .1 && inventory.length !== 1){
        text.innerText += "\nYou attack it with your " + weapons[currentWeapon].name + ". However..\n";
        text.innerText += "Your " + inventory.pop() + " breaks.";
        text.innerText += "\nNo damage was inflicted to the monster!";
        currentWeapon--;
        weaponBreak = true;
    }

    if( weaponBreak !== true ){
        text.innerText += "\nYou attack it with your " + weapons[currentWeapon].name + ".\n";
        if( isMonsterHit()){
            monsterHealthDamaged = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
            monsterHealth -= monsterHealthDamaged;
            text.innerText += " Your inflicted " + monsterHealthDamaged +" damage to the enemy health!";
            imageArt.classList.add("blinking");
            setTimeout(removeBlink, 500);           
        }
        else{
            text.innerText += " You missed!";
        }
        monsterHealthText.innerText = monsterHealth;
        weaponBreak = false;
    }
    else{
        weaponBreak = false;
    }
    
    if( health <= 0 )
    {
        lose();
    }
    else if( monsterHealth <= 0)
    {
        fighting > 2 ? winGame():defeatMonster();
    }
}

function removeBlink() {
    imageArt.classList.remove("blinking");
    }

function getMonsterAttackValue(level){
    const hit = (level*5) - (Math.floor(Math.random()*xp));
    return hit>0 ? hit:0;
}

function isMonsterHit(){
    return Math.random() >= .2 || health < 20;
}

function useItem(){
    if(bag.length !== 0)
    {
        //update(locations[8]);
        pickItem();
        text.innerText = "Select the item you want to use!\n";
        text.innerText += "Tips: Using an item is a guarantee hit! The monster will not be able to attack you.\n";

    }
    else{
        text.innerText = "You have no item in your bag!\n";
    }
}

function pickItem(){
    updateMonsterImage();

    if( bag.length === 1){
        button1.innerText = "Use " + bag[0];
        button2.innerText = "Exit bag";
        button3.innerText = "Exit bag";
        button1.onclick = useThrowables1;
        button2.onclick = continueFight;
        button3.onclick = continueFight;
    }
    else if( bag.length ===2)
    {
        button1.innerText = "Use " + bag[0];
        button2.innerText = "Use " + bag[1];
        button3.innerText = "Exit bag";
        button1.onclick = useThrowables1;
        button2.onclick = useThrowables2;
        button3.onclick = continueFight;
    }
    else if( bag.length === 3){
        button1.innerText = "Use " + bag[0];
        button2.innerText = "Use " + bag[1];
        button3.innerText = "Use " + bag[2];
        button1.onclick = useThrowables1;
        button2.onclick = useThrowables2;
        button3.onclick = useThrowables3;
    }
    else{
        updateMonsterImage();
        button1.innerText = "Exit bag";
        button2.innerText = "Exit bag";
        button3.innerText = "Exit bag";
        button1.onclick = continueFight;
        button2.onclick = continueFight;
        button3.onclick = continueFight;
        text.innerText += "\nYou have no more item!";
        text.innerText += "\nWhat do you want to do?";
    }
}

function lose(){
    gold = 50;
    xp = 0;
    health = 100;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    update(locations[5]);
    const deathScreenTips = Math.random();
    if(deathScreenTips <= 0.3 )
    {
        text.innerText += "\nTips: Buy stronger weapons and make sure you have enough health before fighting an enemy!";
    }
    else if(deathScreenTips > 0.3 && deathScreenTips <= 0.6)
    {
        text.innerText += "\nTips: Your weapons may sometime breaks during a fight. In this case, RUN!";
    }
    else{
        text.innerText += "\nTips: Monsters may sometimes drop items! You can use it in battle without getting hit.";
    }
}

function defeatMonster(){
    goldReceived = Math.floor(monsters[fighting].level*6.7);
    gold += goldReceived;
    goldText.innerText = gold;
    xpReceived = monsters[fighting].level;
    xp += xpReceived;
    xpText.innerText = xp;
    update(locations[4]);
    updateMonsterImage();
    text.innerText += "\nYou received " + goldReceived + " gold and " + xpReceived + " experience points.";
    specialLoot = Math.random();
    if( specialLoot <= .9 && bag.length <= 2){
        itemDropped = Math.floor(Math.random()*3);
        bag.push(items[itemDropped].name);
        text.innerText += "\nYou found " + items[itemDropped].name + "!";
        text.innerText += "\n" + items[itemDropped].name + " added into bag.";
        text.innerText += "\nYou received " + goldReceived + " gold and " + xpReceived + " experience points.";
    }
    else{
        text.innerText += "\nYou found " + items[itemDropped].name + ". However..";
        text.innerText += "\nYour bag is at maximum capacity!";
    }
    text.innerText += "\n\nTips: You can heal yourself by buying potions from the store.";
}

function winGame(){
    update(locations[6]);
}

function restart(){
    goTownSquare();
}

function updateBag(){
    pickItem();
}

function useThrowables1(){
    text.innerText = " You attack it with your " + bag[0] + ".";
    let currentThrowable;
    if( bag[0] === items[0].name){
        currentThrowable = 0;
    }
    else if( bag[0] === items[1].name ){
        currentThrowable = 1;
    }
    else{
        currentThrowable =2;
    }
    monsterHealthDamaged = items[currentThrowable].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= monsterHealthDamaged;
    text.innerText += "\nYour inflicted " + monsterHealthDamaged +" damage to the enemy health!"

    monsterHealthText.innerText = monsterHealth;

    text.innerText += "\nYour " + bag[0] +" is no longer in your bag.";
    bag.splice(0,1);
    text.innerText += "\nYour bag contains: " + bag;
    console.log(bag);
    updateBag();

    if( health <= 0 )
    {
        lose();
    }
    else if( monsterHealth <= 0)
    {
        fighting > 2 ? winGame():defeatMonster();
    }
}

function useThrowables3(){
    text.innerText = " You attack it with your " + bag[2] + ".";
    let currentThrowable;
    if( bag[2] === items[0].name){
        currentThrowable = 0;
    }
    else if( bag[2] === items[1].name ){
        currentThrowable = 1;
    }
    else{
        currentThrowable =2;
    }
    monsterHealthDamaged = items[currentThrowable].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= monsterHealthDamaged;
    text.innerText += "\nYour inflicted " + monsterHealthDamaged +" damage to the enemy health!"

    monsterHealthText.innerText = monsterHealth;
    

    text.innerText += "\nYour " + bag[2] +" is no longer in your bag.";
    bag.splice(2,1);
    text.innerText += "\nYour bag contains: " + bag;
    console.log(bag);
    updateBag();
    if( health <= 0 )
    {
        lose();
    }
    else if( monsterHealth <= 0)
    {
        fighting > 2 ? winGame():defeatMonster();
    }
}

function useThrowables2(){
    text.innerText = " You attack it with your " + bag[1] + ".";
    let currentThrowable;
    if( bag[1] === items[0].name){
        currentThrowable = 0;
    }
    else if( bag[1] === items[1].name ){
        currentThrowable = 1;
    }
    else{
        currentThrowable =2;
    }
    monsterHealthDamaged = items[currentThrowable].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= monsterHealthDamaged;
    text.innerText += "\nYour inflicted " + monsterHealthDamaged +" damage to the enemy health!"

    monsterHealthText.innerText = monsterHealth;
    if( health <= 0 )
    {
        lose();
    }
    else if( monsterHealth <= 0)
    {
        fighting > 2 ? winGame():defeatMonster();
    }

    text.innerText += "\nYour " + bag[1] +" is no longer in your bag.";
    bag.splice(1,1);
    text.innerText += "\nYour bag contains: " + bag;
    console.log(bag);
    updateBag();

    if( health <= 0 )
    {
        lose();
    }
    else if( monsterHealth <= 0)
    {
        fighting > 2 ? winGame():defeatMonster();
    }
}
