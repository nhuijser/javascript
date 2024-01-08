let rollsLeft = 3; // het aantal rollen die in de header moeten staan
let highscore = 0;
let p1Turn = true; //true voor player 1, false voor player 2
let dice = []; //sla hierin de dobbesteen html elementen op, zodat je deze kan aanpassen via js
let playerTurn = "p1";

function roll() {
  //deze functie voert uit wanneer de speler op roll klikt
  if (rollsLeft == 0) {
    return alert("Je hebt geen rolls");
  }
  rollsLeft--;
  // if (rollsLeft == 0) {
  //     rollsLeft = 3;
  // }
  document.getElementById("rolls").innerHTML = rollsLeft;
  for (let i = 1; i < 6; i++) {
    if (!dice.includes(`dice${i}`)) {
      console.log("doesnt include");
      let random = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      document.getElementById(`dice${i}`).src = `Images/Dice-${random}.png`;
      document.getElementById(`dice${i}`).value = `${random}`;
    }
  }

  aces();
  twos();
  threes();
  fours();
  fives();
  sixes();
  threeOfAKind();
  fourOfAKind();
  fullHouse();
  smallStraight();
  largeStraight();
  yahtzee();
  chance();
}

function lockScore(id) {
  let button = document.getElementById(id);
  if (button.textContent == "-") return;
  if (button.id.includes("p1") && playerTurn != "p1") return;
  if (button.id.includes("p2") && playerTurn != "p2") return;

  button.disabled = true;
  if (button.disabled) {
    let lockedScore = document.getElementById(`${id}--locked`);
    lockedScore.textContent = button.textContent;
    button.textContent = "-";
    swapTurn();
  }
}

/*functie voor een single zoals, Aces, twos, threes....,
 num is het nummer waar we naar zoeken, zoals aces of twos, en dice is de combinatie van dobbel stenen als array of string*/
function aces() {
  if (document.getElementById(`aces--${playerTurn}`).textContent == "-") return;

  let aces = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    if (number == 1) {
      aces++;
    }
  }

  document.getElementById(`aces--${playerTurn}`).textContent = aces;
}

function twos() {
  if (document.getElementById(`twos--${playerTurn}`).textContent == "-") return;
  let twos = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    if (number == 2) {
      twos += 2;
    }
  }

  document.getElementById(`twos--${playerTurn}`).textContent = twos;
}

function threes() {
  if (document.getElementById(`threes--${playerTurn}`).textContent == "-")
    return;
  let threes = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);
    if (number == 3) {
      threes += 3;
    }
  }

  document.getElementById(`threes--${playerTurn}`).textContent = threes;
}

function fours() {
  if (document.getElementById(`fours--${playerTurn}`).textContent == "-")
    return;
  let fours = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    if (number == 4) {
      fours += 4;
    }
  }

  document.getElementById(`fours--${playerTurn}`).textContent = fours;
}

function fives() {
  if (document.getElementById(`fives--${playerTurn}`).textContent == "-")
    return;
  let fives = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    if (number == 5) {
      fives += 5;
    }
  }

  document.getElementById(`fives--${playerTurn}`).textContent = fives;
}

function sixes() {
  if (document.getElementById(`sixes--${playerTurn}`).textContent == "-")
    return;
  let sixes = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    if (number == 6) {
      sixes += 6;
    }
  }

  document.getElementById(`sixes--${playerTurn}`).textContent = sixes;
}

function getTotalScore() {
  let total = 0;
  for (i = 1; i < 6; i++) {
    let number = getNumber(i);
    total += number;
  }
  return total;
}

function threeOfAKind() {
  if (document.getElementById(`tkind--${playerTurn}`).textContent == "-")
    return;
  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;

  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    switch (number) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
      case 4:
        fours++;
        break;
      case 5:
        fives++;
        break;
      case 6:
        sixes++;
        break;
    }
  }

  if (
    ones >= 3 ||
    twos >= 3 ||
    threes >= 3 ||
    fours >= 3 ||
    fives >= 3 ||
    sixes >= 3
  ) {
    let totalScore = getTotalScore();
    document.getElementById(`tkind--${playerTurn}`).textContent = totalScore;
  }
}

function fourOfAKind() {
  if (document.getElementById(`fkind--${playerTurn}`).textContent == "-")
    return;
  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;

  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    switch (number) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
      case 4:
        fours++;
        break;
      case 5:
        fives++;
        break;
      case 6:
        sixes++;
        break;
    }
  }

  if (
    ones >= 4 ||
    twos >= 4 ||
    threes >= 4 ||
    fours >= 4 ||
    fives >= 4 ||
    sixes >= 4
  ) {
    let totalScore = getTotalScore();
    document.getElementById(`fkind--${playerTurn}`).textContent = totalScore;
  }
}

function fullHouse() {
  if (document.getElementById(`fouse--${playerTurn}`).textContent == "-")
    return;
  let count = [0, 0, 0, 0, 0, 0];
  let totalScore = 0;

  for (let i = 1; i < 6; i++) {
    let number = getNumber(i);
    count[number - 1]++;
  }

  let threeFound = false;
  let twoFound = false;

  for (let i = 0; i < 6; i++) {
    if (count[i] === 3) {
      threeFound = true;
    } else if (count[i] === 2) {
      twoFound = true;
    }
  }

  if (threeFound && twoFound) {
    totalScore = 25;
  }

  document.getElementById(`fouse--${playerTurn}`).textContent = totalScore;
}

// Updated smallStraight function
function smallStraight() {
  if (document.getElementById(`small--${playerTurn}`).textContent == "-")
    return;

  let totalScore = 0;
  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;

  for (let i = 1; i < 6; i++) {
    let number = getNumber(i);

    switch (number) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
      case 4:
        fours++;
        break;
      case 5:
        fives++;
        break;
      case 6:
        sixes++;
        break;
    }
  }

  if (ones >= 1 && twos >= 1 && threes >= 1 && fours >= 1) {
    totalScore = 30;
  } else if (twos >= 1 && threes >= 1 && fours >= 1 && fives >= 1) {
    totalScore = 30;
  } else if (threes >= 1 && fours >= 1 && fives >= 1 && sixes >= 1) {
    totalScore = 30;
  }

  document.getElementById(`small--${playerTurn}`).textContent = totalScore;
}

// Updated largeStraight function
function largeStraight() {
  if (document.getElementById(`large--${playerTurn}`).textContent == "-")
    return;
  let totalScore = 0;

  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;

  for (let i = 1; i < 6; i++) {
    let number = getNumber(i);

    switch (number) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
      case 4:
        fours++;
        break;
      case 5:
        fives++;
        break;
      case 6:
        sixes++;
        break;
    }

    if (ones == 1 && twos == 1 && threes == 1 && fours == 1 && fives == 1) {
      totalScore = 40;
    } else if (
      twos == 1 &&
      threes == 1 &&
      fours == 1 &&
      fives == 1 &&
      sixes == 1
    ) {
      totalScore = 40;
    }
  }
  document.getElementById(`large--${playerTurn}`).textContent = totalScore;
}

function yahtzee() {
  if (document.getElementById(`yahtzee--${playerTurn}`).textContent == "-")
    return;
  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;

  for (i = 1; i < 6; i++) {
    let number = getNumber(i);

    switch (number) {
      case 1:
        ones++;
        break;
      case 2:
        twos++;
        break;
      case 3:
        threes++;
        break;
      case 4:
        fours++;
        break;
      case 5:
        fives++;
        break;
      case 6:
        sixes++;
        break;
    }
  }

  if (
    ones == 5 ||
    twos == 5 ||
    threes == 5 ||
    fours == 5 ||
    fives == 5 ||
    sixes == 5
  ) {
    document.getElementById(`yahtzee--${playerTurn}`).textContent = "50";
  }
}

function chance() {
  if (document.getElementById(`chance--${playerTurn}`).textContent == "-")
    return;
  let total = getTotalScore();
  document.getElementById(`chance--${playerTurn}`).textContent = total;
}

function getNumber(dice) {
  let data = document.getElementById(`dice${dice}`).src;

  let number = 0;

  if (data.includes("Dice-1")) {
    number = 1;
  } else if (data.includes("Dice-2")) {
    number = 2;
  } else if (data.includes("Dice-3")) {
    number = 3;
  } else if (data.includes("Dice-4")) {
    number = 4;
  } else if (data.includes("Dice-5")) {
    number = 5;
  } else if (data.includes("Dice-6")) {
    number = 6;
  }

  return number;
}
/* functie die een dobbelsteen opslot zet zodat tijdens het rollen deze niet rolt*/
function lockDice(die) {
  if (dice.includes(die)) {
    dice = dice.filter((d) => d !== die); // Remove the die from the array
    console.log("Unselect %s", die);
    document.getElementById(die).style.border = "none";
  } else {
    dice.push(die); // Add the die to the array
    console.log("Select %s", die);
    document.getElementById(die).style.border = "4px solid red";
  }
}

function resetTempScore() {
  console.log(document.getElementById(`aces--${playerTurn}`).textContent);
  if (document.getElementById(`aces--${playerTurn}`).textContent !== "-") {
    document.getElementById(`aces--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`twos--${playerTurn}`).textContent !== "-") {
    document.getElementById(`twos--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`threes--${playerTurn}`).textContent !== "-") {
    document.getElementById(`threes--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`fours--${playerTurn}`).textContent !== "-") {
    document.getElementById(`fours--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`fives--${playerTurn}`).textContent !== "-") {
    document.getElementById(`fives--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`sixes--${playerTurn}`).textContent !== "-") {
    document.getElementById(`sixes--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`tkind--${playerTurn}`).textContent !== "-") {
    document.getElementById(`tkind--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`fkind--${playerTurn}`).textContent !== "-") {
    document.getElementById(`fkind--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`fouse--${playerTurn}`).textContent !== "-") {
    document.getElementById(`fouse--${playerTurn}`).textContent = "0";
  }
  if (
    document.getElementById(`small--${playerTurn}`).textContent !== "-" &&
    document.getElementById(`small--${playerTurn}`).textContent !== "30"
  ) {
    console.log("smalll");
    document.getElementById(`small--${playerTurn}`).textContent = "0";
  }
  if (
    document.getElementById(`large--${playerTurn}`).textContent !== "-" &&
    document.getElementById(`large--${playerTurn}`).textContent !== "40"
  ) {
    document.getElementById(`large--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`yahtzee--${playerTurn}`).textContent !== "-") {
    document.getElementById(`yahtzee--${playerTurn}`).textContent = "0";
  }
  if (document.getElementById(`chance--${playerTurn}`).textContent !== "-") {
    document.getElementById(`chance--${playerTurn}`).textContent = "0";
  }
}

function calculateTotalTop() {
  let totalScore = 0;

  let aces = parseInt(
    document.getElementById(`aces--${playerTurn}--locked`).textContent
  );
  let twos = parseInt(
    document.getElementById(`twos--${playerTurn}--locked`).textContent
  );
  let threes = parseInt(
    document.getElementById(`threes--${playerTurn}--locked`).textContent
  );
  let fours = parseInt(
    document.getElementById(`fours--${playerTurn}--locked`).textContent
  );
  let fives = parseInt(
    document.getElementById(`fives--${playerTurn}--locked`).textContent
  );
  let sixes = parseInt(
    document.getElementById(`sixes--${playerTurn}--locked`).textContent
  );

  totalScore = aces += twos += threes += fours += fives += sixes;

  if (totalScore >= 63) {
    document.getElementById(`bonus--${playerTurn}--locked`).textContent = "35";
    document.getElementById(
      `subtotal--${playerTurn}--locked--top`
    ).textContent = totalScore;
    document.getElementById(`total--${playerTurn}--locked--top`).textContent =
      totalScore + 35;
    document.getElementById(`top--${playerTurn}--total`).textContent =
      totalScore + 35;
  } else {
    document.getElementById(
      `subtotal--${playerTurn}--locked--top`
    ).textContent = totalScore;
    document.getElementById(`total--${playerTurn}--locked--top`).textContent =
      totalScore;
    document.getElementById(`top--${playerTurn}--total`).textContent =
      totalScore;
  }
}

function calculateSubTotalBottom() {
  let totalScore = 0;

  let tkind = parseInt(
    document.getElementById(`tkind--${playerTurn}--locked`).textContent
  );
  let fkind = parseInt(
    document.getElementById(`fkind--${playerTurn}--locked`).textContent
  );
  let fouse = parseInt(
    document.getElementById(`fouse--${playerTurn}--locked`).textContent
  );
  let small = parseInt(
    document.getElementById(`small--${playerTurn}--locked`).textContent
  );
  let large = parseInt(
    document.getElementById(`large--${playerTurn}--locked`).textContent
  );
  let yahtzee = parseInt(
    document.getElementById(`yahtzee--${playerTurn}--locked`).textContent
  );
  let chance = parseInt(
    document.getElementById(`chance--${playerTurn}--locked`).textContent
  );

  totalScore = tkind += fkind += fouse += small += large += yahtzee += chance;

  document.getElementById(`total--${playerTurn}--locked--bottom`).textContent =
    totalScore;
  document.getElementById(`bottom--${playerTurn}--total`).textContent =
    totalScore;
}

function calculateTotal() {
  let totalScore = 0;

  let totalTop = parseInt(
    document.getElementById(`total--${playerTurn}--locked--top`).textContent
  );
  let totalBottom = parseInt(
    document.getElementById(`total--${playerTurn}--locked--bottom`).textContent
  );

  totalScore = totalTop + totalBottom;
  document.getElementById(`grand--${playerTurn}--locked`).textContent =
    totalScore;
}

function checkIfDone() {}

/*als je 2 players maakt,
 kun je deze functie maken om van ronde te wisselen.*/
function swapTurn() {
  resetTempScore();
  calculateTotalTop();
  calculateSubTotalBottom();
  calculateTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = rollsLeft;
  for (let i = 1; i < 6; i++) {
    document.getElementById(`dice${i}`).style.border = "none";
    dice = [];
  }
  if (p1Turn) {
    p1Turn = false;
    playerTurn = "p2";
    document.getElementById("turn").textContent = "Player 2";
  } else {
    playerTurn = "p1";
    document.getElementById("turn").textContent = "Player 1";
    p1Turn = true;
  }
  roll();
}
//schrijf hier de rest van je code
