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
var canvas = document.getElementById('myChart');
var currentChart;





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
  var randomNumber = Math.floor(Math.random() * (catalog.length));
  return catalog[randomNumber];
}





function selectRandomProducts() {
  //remove the previous one first
  resetImages();

  for (var i = 0; i < numberOfOptions; i++) {
    var productImage = document.createElement('img');

    do {
      var product = randomProduct();
    } while (
      (product.isDuplicate === true) || (product.isRepeat === true)
    );
    //once a product is selected, mark it as a duplicate for this round
    product.isDuplicate = true;
    product.views++;
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

function resetResultsForm() {
  var resultsChild = resultsArea.firstElementChild;
  while (resultsChild) {
    resultsChild.remove();
    resultsChild = resultsArea.firstElementChild;
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

    if (currentRound < numberOfRounds) {
      selectRandomProducts();
    } else {
      renderChart();
      //renderResults();
      displayArea.removeEventListener('click', productSelected);
    }
  } else {
    console.log('nothing of importance was clicked on');
  }
}




//commenting out the UL stuff for now. remember it gets called in productSelected()

// function renderResults() {
//   var ul = document.createElement('ul');
//   ul.textContent = 'Thanks for playing! Results:';
//   resultsArea.appendChild(ul);

//   for (var i = 0; i < catalog.length; i++) {
//     var li = document.createElement('li');

//     //to avoid dividing by 0:
//     var percentage = 0;
//     if (catalog[i].clicks > 0) {
//       percentage = Math.round((catalog[i].clicks / catalog[i].views) * 100);
//     }

//     li.textContent = `${catalog[i].name}: ${catalog[i].clicks} clicks, ${catalog[i].views} views. Picked ${percentage}% of the time}`;

//     ul.appendChild(li);
//   }
//   renderChart();
// }




//forms stuff:
var roundsForm = document.getElementById('roundsForm');
roundsForm.addEventListener('submit', restartGame);

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
    resetResultsForm();
    selectRandomProducts();
    //destroy the current chart if one exists:
    if (currentChart) { currentChart.destroy(); }
  } else {
    alert(`You're trying to get too many options!`);
  }
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





//chart:
function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var labelsArr = [];
  for (var i = 0; i < catalog.length; i++) {
    labelsArr.push(catalog[i].name);
  }
  var clickChartData = [];
  for (var i = 0; i < catalog.length; i++) {
    clickChartData.push(catalog[i].clicks);
  }
  var viewChartData = [];
  for (var i = 0; i < catalog.length; i++) {
    viewChartData.push(catalog[i].views);
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
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  currentChart = clicksChart;
}
