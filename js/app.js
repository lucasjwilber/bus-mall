'use strict';

var numberOfRounds = 25;
var currentRound = 0;
var numberOfOptions = 3;
var previousProducts = [];
var currentProducts = [];
var displayArea = document.getElementById('displayArea');
displayArea.addEventListener('click', productSelected);
var headline = document.getElementById('headline');
var currentChart;
var roundsForm = document.getElementById('roundsForm');
roundsForm.addEventListener('submit', restartGame);
var catalog = [];



function populateCatalog() {
  new Product('bag', 'img/bag.jpg', 0, 0);
  new Product('banana', 'img/banana.jpg', 0, 0);
  new Product('bathroom', 'img/bathroom.jpg', 0, 0);
  new Product('boots', 'img/boots.jpg', 0, 0);
  new Product('breakfast', 'img/breakfast.jpg', 0, 0);
  new Product('bubblegum', 'img/bubblegum.jpg', 0, 0);
  new Product('chair', 'img/chair.jpg', 0, 0);
  new Product('cthulhu', 'img/cthulhu.jpg', 0, 0);
  new Product('dog-duck', 'img/dog-duck.jpg', 0, 0);
  new Product('dragon', 'img/dragon.jpg', 0, 0);
  new Product('pen', 'img/pen.jpg', 0, 0);
  new Product('pet-sweep', 'img/pet-sweep.jpg', 0, 0);
  new Product('scissors', 'img/scissors.jpg', 0, 0);
  new Product('shark', 'img/shark.jpg', 0, 0);
  new Product('sweep', 'img/sweep.png', 0, 0);
  new Product('tauntaun', 'img/tauntaun.jpg', 0, 0);
  new Product('unicorn', 'img/unicorn.jpg', 0, 0);
  new Product('usb', 'img/usb.gif', 0, 0);
  new Product('water-can', 'img/water-can.jpg', 0, 0);
  new Product('wine-glass', 'img/wine-glass.jpg', 0, 0);
}



function Product(name, image, clicks, views) {
  this.name = name;
  this.image = image;
  this.clicks = clicks;
  this.views = views;
  this.isDuplicate = false;
  this.isRepeat = false;
  catalog.push(this);
}



function randomProduct() {
  var randomNumber = Math.floor(Math.random() * (catalog.length));
  return catalog[randomNumber];
}



function selectRandomProducts() {
  //remove the previous ones first
  resetImages();
  headline.textContent = "Of the products below, which would you be most likely to buy?";

  //select X random products, where x = numberOfOptions
  for (var i = 0; i < numberOfOptions; i++) {
    var productImage = document.createElement('img');

    //keep getting random products until they aren't duplicates or repeats
    do {
      var product = randomProduct();
    } while (
      (product.isDuplicate === true) || (product.isRepeat === true)
    );
    //once a product is selected, mark it as a duplicate for this round
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
  if (event.target.src) {
    var selection = event.target.src.split('img/');
    currentRound++;

    //compare clicked-on image with every catalog image :/
    for (var i = 0; i < catalog.length; i++) {
      if (selection[1] === catalog[i].image.split('/')[1]) {
        catalog[i].clicks++;
      }
    }

    //update views counter for each image that was displayed:
    for (var i = 0; i < previousProducts.length; i++) {
      previousProducts[i].views++;
    }

    if (currentRound < numberOfRounds) {
      selectRandomProducts();
    } else {
      resetImages();
      renderChart();
      displayArea.removeEventListener('click', productSelected);
    }
  } else {
    console.log('nothing of importance was clicked on');
  }
}



function restartGame(event) {
  event.preventDefault();
  //add event listener if it's gone:
  displayArea.removeEventListener('click', productSelected);
  displayArea.addEventListener('click', productSelected);

  if (event.target.numberOfOptionsField.value <= catalog.length / 2) {
    currentRound = 0;
    numberOfRounds = event.target.numberOfRoundsField.value;
    numberOfOptions = event.target.numberOfOptionsField.value;
    resetObjectValues();
    selectRandomProducts();
    //destroy the current chart if one exists:
    if (currentChart) { currentChart.destroy(); }
  } else {
    alert('You\'re trying to get too many options!');
  }
}



function resetObjectValues() {
  for (var l = 0; l < catalog.length; l++) {
    catalog[l].isRepeat = false;
    catalog[l].isDuplicate = false;
    previousProducts = [];
    currentProducts = [];
  }
}



function renderChart() {

  //update the local storage to reflect the results of this game.
  localStorage.setItem('catalog', JSON.stringify(catalog));

  headline.textContent = "Here are the results:";


  var ctx = document.getElementById('myChart').getContext('2d');

  var labelsArr = [];
  for (var i = 0; i < catalog.length; i++) {
    labelsArr.push(catalog[i].name);
  }
  var clickChartData = [];
  for (var j = 0; j < catalog.length; j++) {
    clickChartData.push(catalog[j].clicks);
  }
  var viewChartData = [];
  for (var k = 0; k < catalog.length; k++) {
    viewChartData.push(catalog[k].views);
  }
  var clicksChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArr,
      datasets: [{
        label: 'Clicks',
        data: clickChartData,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: viewChartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 18
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'white',
            fontSize: 18,
            stepSize: 1,
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white',
            fontSize: 14,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });
  currentChart = clicksChart;
}



//if there's a catalog array already in local storage, use that data to construct Product objects, otherwise make a new one:
if (localStorage.getItem('catalog')) {
  var storedData = JSON.parse(localStorage.getItem('catalog'));
  for (var i = 0; i < storedData.length; i++) {
    new Product(storedData[i].name, storedData[i].image, storedData[i].clicks, storedData[i].views);
  }
} else {
  populateCatalog();
}



//start game
selectRandomProducts();