/* New class for a gift */

/* Empty array for gifts in game */
allGifts = [];
/* Empty array for gifts in game */
activeGifts = [];
/* Empty array for gifts that have been disqualified due to steals */
inactiveGifts = [];

class Gift{
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.firstSteal = 0;
    this.secondSteal = 0;
  }

  /* Methods for a gift */
  sayName() {
    console.log('this gift is a ', this.name + '.');
  }

  sayValue() {
    console.log('this gift has a value of ', this.value + '.');
  }

  stealOne() {
    this.firstSteal = 1;
    console.log(this.name + ' has been stolen once. It can be stolen once more.');
  }

  stealTwo() {
    this.secondSteal = 1;
    console.log(this.name + ' has been stolen twice. It is no longer available.');

    // Since it's now unavailable, remove from available gifts, and add to unavailable
    inactiveGifts.push(this);
    let index = activeGifts.indexOf(this);
    if (index > -1) {
      activeGifts.splice(index, 1);
    }
  }
}

// Create an item and add it to the list
function addGift() {
  // Get the necessary properties
  let name = document.getElementById('name').value;
  let value = document.getElementById('value').value;

  // Init the gift
  let newGift = new Gift(name, value);
  activeGifts.push(newGift);
  allGifts.push(newGift);
  newGift.sayName();

  //Check the list
  console.log('The list is now populated by:\n');
  console.log(activeGifts);
}

// Display all of the items in the list
function displayGifts() {

  // Make sure the list is empty
  $('#actives').empty();

  // Loop over all active gifts
  // Counter for id
  counter = 0;

  for (var i = 0; i < activeGifts.length; i++) {

    // Create the elements: name, radio buttons
    // Name
    let li = document.createElement('li');
    let t = document.createTextNode(activeGifts[i].name + ' | ' + activeGifts[i].value);
    li.appendChild(t);
    document.getElementById('actives').appendChild(li);

    // Radio buttons for steals
    // First steal
    let sOneLabel = document.createElement('label');
    sOneLabel.innerHTML = 'Stolen Once';
    let sOne = document.createElement('input');
    sOne.setAttribute('type', 'radio');
    sOne.setAttribute('onclick', "activeGifts["+counter+"].stealOne();");

    let brk = document.createElement('br');

    // Second steal
    let sTwoLabel = document.createElement('label');
    sTwoLabel.innerHTML = 'Stolen Twice';
    let sTwo = document.createElement('input');
    sTwo.setAttribute('type', 'radio');
    sTwo.setAttribute('onclick', "activeGifts["+counter+"].stealTwo(); displayInactive(); displayGifts(); domStrat();");

    // Create the buttons and labels
    document.getElementById('actives').appendChild(sOneLabel);
    document.getElementById('actives').appendChild(sOne);
    document.getElementById('actives').appendChild(brk);
    document.getElementById('actives').appendChild(sTwoLabel);
    document.getElementById('actives').appendChild(sTwo);

    counter += 1;
  }
}

// Display the gifts that have been stolen twice
function displayInactive() {

  // Make sure the list is empty
  $('#inactives').empty();

  // Loop over all active gifts
  for (var i = 0; i < inactiveGifts.length; i++) {

    // Create the elements: name, radio buttons
    // Name
    let liInactive = document.createElement('li');
    let tInactive = document.createTextNode(inactiveGifts[i].name + ' | ' + inactiveGifts[i].value);
    liInactive.appendChild(tInactive);
    document.getElementById('inactives').appendChild(liInactive);
    let brk = document.createElement('br');
  }
}

// Check to see which gift is the dominant strategy
function domStrat() {
  // Get average value for allGfits
  var tot = 0;
  for (var i = 0; i < allGifts.length; i++) {
    tot += +allGifts[i].value;
    console.log(tot);
  }

  var avg = Math.round(tot / allGifts.length);
  console.log('The average is ', avg);

  // create temp array for those items above average
  aboveAvg = [];
  for (var i = 0; i < activeGifts.length; i++) {
    if (activeGifts[i].value >= avg) {
      aboveAvg.push(activeGifts[i]);
    }
  }

  let msg = '';

  if (aboveAvg.length != 0) {
    let msg = 'Your best choice is ' + aboveAvg[0].name;
    console.log(msg);

    // Flash an alert to the user
    document.getElementById('flashMessage').innerHTML = msg;

  } else {

    let msg = 'Pick a gift...these all suck.';
    console.log(msg);

    // Flash an alert to the user
    document.getElementById('flashMessage').innerHTML = msg;
  }
}
