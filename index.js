import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-5f376-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsmentlistinDB = ref(database, "endorsmentsText");

const EndorsmentEl = document.querySelector("textarea");
const ToEl = document.querySelector("#To");
const FromEl = document.querySelector("#From");
const EndorsmentUl = document.querySelector("#endorsment-list");
const publishBtn = document.querySelector("#publish-btn");
publishBtn.addEventListener("click", function () {
  let ToValue = ToEl.value;
  let FromValue = FromEl.value;
  let EndorsmentValue = EndorsmentEl.value;
  if (EndorsmentValue === "") {
    alert("Add an endorsment");
  } else {
    push(endorsmentlistinDB, {
      EndorsmentText: EndorsmentValue,
      To: FromValue,
      From: ToValue,
      Count: 0,
    });
    clearEndorsmentEl();
  }
});

onValue(endorsmentlistinDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearEndorsmentEl();
    clearEndorsmentUl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToEndorsmentUl(currentItem);
    }
  } else {
    EndorsmentUl.innerHTML = "No items here... yet";
  }
});

function appendItemToEndorsmentUl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.innerHTML = `
    <h3>To ${itemValue.To}</h3>
    ${itemValue.EndorsmentText},
    <div class="endorsmentFooter">
        <h3>From ${itemValue.From}</h3>,
        <h3 class="count"> ❤️ ${itemValue.Count}</h3>
    </div>  
    
  `;
  EndorsmentUl.append(newEl);
}

function clearEndorsmentUl() {
  EndorsmentUl.innerHTML = "";
}

function clearEndorsmentEl() {
  EndorsmentEl.value = "";
  FromEl.value = "";
  ToEl.value = "";
}
