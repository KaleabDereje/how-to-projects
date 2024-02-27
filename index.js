//Import initializeApp function from the database
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://kerchat-app-default-rtdb.firebaseio.com/",
};
 
const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const shoppingListInDB = ref(dataBase, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
 
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);

    clearInputField();
});

onValue(shoppingListInDB, function(packetlist){
    //check if there is an element exists in the firebaseDB
    if(packetlist.exists()){

    //array of elements in the firebaseDb key value pair
    let itemList = Object.entries(packetlist.val());

    clearShoppingListEl();

   for (let i = 0; i < itemList.length; i++){
    let  elements = itemList[i];    
       
    //looping through key value pair of database 
    //get ID(key) of the element from the database   
    let elementID = elements[0];
    let elementValue= elements[1];

    appendItem(elements);
   } 
}   
   else {
       shoppingListEl.innerHTML = `No Items Here To Display...Yet!`; 
   }
});

function clearShoppingListEl () {
    shoppingListEl.innerHTML = ``;
}

function appendItem(value){
    let itemID = value[0];
    let itemValue = value[1];

    let newEl = document.createElement("li");
        newEl.textContent = itemValue;
    //add the <li> eleemnt to the parent <ul> element    
    shoppingListEl.append(newEl);

    //add a delete function on element when double-clicked
    newEl.addEventListener("dblclick", function(){
        let itemPointer = ref(dataBase, `shoppingList/${itemID}`);
        
        remove(itemPointer);
    });
}

function clearInputField() {
    inputFieldEl.value = ``;
}