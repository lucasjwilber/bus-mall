'use strict';



Product.allProducts = [];
var catalog = Product.allProducts;

function Product(name, image) {
  this.name = name;
  this.image = image;
  this.isDuplicate = false;
  this.isRepeat = false;
  catalog.push(this);
}


function randomProduct() {
  //added +1 becuase of math.floor
  var randomNumber = Math.floor(Math.random() * (catalog.length + 1));
  console.log(randomProduct);
  return catalog[randomNumber];
}

//numberOfOptions parameter to adjust number of products presented, default 3

//pick an image
//if it's a duplicate within current comparison repick
//if it's one of the previous images repick

//render function then replaces previous images array contents with what's displayed


var numberOfOptions = 3;
var previousProducts = [];
var currentProducts = [];

function selectRandomProducts() {

  //wipe the currentProducts array
  currentProducts = [];

  //starting a new round, set all isDuplicates. only the ones in previousProducts should have been changed
  for (var i = 0; i < previousProducts.length; i++) {
    previousProducts[i].isDuplicate = false;
  }


  //select a random product X many times
  for (var i = 0; i < numberOfOptions; i++) {

    var productImage = document.createElement('img');

    //select a random product from the catalog
    do {
      var product = randomProduct();
    } while (
      //if the product is a duplicate or was in last selection, repeat this loop
      (product.isDuplicate === true) && (product.isRepeat === true)
    )

    product.isDuplicate = true;
    currentProducts.push(product);

    productImage.src = product.image;
    displayArea.appendChild(productImage);
  }

//now that we have 3 products selected, we can unset the isDuplicate flag and mark them as repeats to prepare for next round
  for (var i = 0; i < currentProducts.length; i++) {
    currentProducts[i].isDuplicate = false;
    currentProducts[i].isRepeat = true;
  }


  //now that previousProducts has fulfilled its purpose, update/replace it with contents of currentProducts
  previousProducts = currentProducts;



}



//for loop to do this x amount of times:
//1. select a random number from allProducts array that wasn't part of the last selected group
//2. do {select another random number} while (number isn't the last number or part of the last selection)
//3 .do {select another random number} while (number isn't either of the last 2 numbers or part of the last selection)
//4. repeat until x
//var imageX = product, so that you can increment that product's clicks/views after
//push them into an array randomlyGeneratedProducts



// var displayArea = document.getElementById('displayArea');
// displayArea.addEventListener('click', productSelected);



// function resetImages() {
//   var displayAreaChild = displayArea.firstElementChild;
//   while (displayAreaChild) {
//     displayAreaChild.remove();
//     displayAreaChild = displayArea.firstElementChild;
//   }
// }



// function renderProducts() {
//   //remove any previously displayed images first
//   resetImages();


//   //for each product in randomlyGeneratedProducts:

//   var img1 = document.createElement('img');
//   img1.src = `img/${this.image}`;
//   displayArea.appendChild(img1);


//   //productX.src = productX.image;
// }



// function productSelected(event) {

//   //for loop that compares each image with what was clicked on to figure out what it is

//   //when a product is clicked:
//   //get the target of the one that was clicked
//   //update its stats
//   //run renderProducts() again
// }


// //add a tag.removeEventListener for the end

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulu', 'img/cthulu.jpg');
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