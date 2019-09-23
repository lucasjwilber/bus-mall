'use strict';

var numberOfRounds = 25;
var currentRound = 0;
var catalog = [];
var resultsArea = document.getElementById('results');
var numberOfOptions = 3;
var previousProducts = [];
var currentProducts = [];
var displayArea = document.getElementById('displayArea');
displayArea.addEventListener('click', productSelected);




function Product(name, image) {
  this.name = name;
  this.image = image;
  this.clicks = 0;
  this.views = 0;
  this.isDuplicate = false;
  this.isRepeat = false;
  catalog.push(this);
}



function randomProduct() {
  //may need to revise this, not sure if it's min-max inclusive?
  var randomNumber = Math.floor(Math.random() * (catalog.length));
  return catalog[randomNumber];
}



function selectRandomProducts() {
  //remove the previous one first
  resetImages();

  //select a random product X many times
  for (var i = 0; i < numberOfOptions; i++) {
    var productImage = document.createElement('img');
    //select a random product from the catalog
    do {
      var product = randomProduct();
    } while (
      //if the product is a duplicate or was in last selection, retry
      (product.isDuplicate === true) || (product.isRepeat === true)
    );
    //once a product is selected, mark it as a duplicate for this round
    product.views++;
    product.isDuplicate = true;
    currentProducts.push(product);
    productImage.src = product.image;
    displayArea.appendChild(productImage);
  }

  //unset the isDuplicate flag on what was selected this round and mark them as repeats to prepare for next round
  for (var j = 0; j < currentProducts.length; j++) {
    currentProducts[j].isDuplicate = false;
    currentProducts[j].isRepeat = true;
  }

  //reset the isRepeat flags for the previous products
  for (var k = 0; k < previousProducts.length; k++) {
    previousProducts[k].isRepeat = false;
  }
  //now that previousProducts has fulfilled its purpose, update/replace it with contents of currentProducts and reset currentProducts
  previousProducts = currentProducts;
  currentProducts = [];
}



function resetImages() {
  var displayAreaChild = displayArea.firstElementChild;
  while (displayAreaChild) {
    displayAreaChild.remove();
    displayAreaChild = displayArea.firstElementChild;
  }
}



function productSelected(event) {
  var selection = event.target.src.split('img/');
  console.log(selection);
  currentRound++;

  for (var i = 0; i < catalog.length; i++) {
    if (selection[1] === catalog[i].image.split('/')[1]) {
      catalog[i].clicks++;
    }
  }

  if (currentRound < numberOfRounds) {
    selectRandomProducts();
  } else {
    renderResults();
    displayArea.removeEventListener('click', productSelected);
  }
  console.log(`round ${currentRound} of ${numberOfRounds}`);
}



function renderResults() {
  var ul = document.createElement('ul');
  ul.textContent = 'Thanks for playing! Results:';
  resultsArea.appendChild(ul);

  for (var i = 0; i < catalog.length; i++) {
    var li = document.createElement('li');

    //to avoid dividing by 0:
    var percentage = 0;
    if (catalog[i].clicks > 0) {
      percentage = Math.round((catalog[i].clicks / catalog[i].views) * 100);
    }

    li.textContent = `${catalog[i].name}: ${catalog[i].clicks} clicks, ${catalog[i].views} views. Picked ${percentage}% of the time}`;
    ul.appendChild(li);
  }

}  // <--why tf is this } red?


//forms stuff:
var roundsField = document.getElementById('numberOfRoundsField');
var optionsField = document.getElementById('numberOfOptionsField');
var roundsForm = document.getElementById('roundsForm');
roundsForm.addEventListener('submit', restartGame);

function restartGame(event) {
  event.preventDefault();
  currentRound = 0;
  numberOfRounds = event.target.numberOfRoundsField.value;
  numberOfOptions = event.target.numberOfOptionsField.value;
  resetObjectValues();
  selectRandomProducts();
}





function resetObjectValues() {
  for (var l = 0; l < catalog.length; l++) {
    catalog[l].isRepeat = false;
    catalog[l].isDuplicate = false;
    catalog[l].clicks = 0;
    catalog[l].views = 0;
    previousProducts = [];
    currentProducts = [];
  }
}





new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

selectRandomProducts();
