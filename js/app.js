'use strict';



function Product(name, image) {
  this.name = name;
  this.image = image;
  this.isRepeat = false;
  this.allProducts.push(this);
}
Product.allProducts = [];
catalog = Product.allProducts;


function randomProduct() {
  randomNumber = Math.floor(Math.random() * (catalog.length + 1));  //added +1 becuase of math.floor
  console.log(randomProduct);
  return catalog[randomNumber];
}

//numberOfOptions parameter to adjust number of products presented, default 3
var numberOfOptions = 3;
function selectRandomProducts(numberOfOptions) {

  var previousImages = [];


  for (var i = 0; i < numberOfOptions; i++) {

    var productImage = image.createElement('img');

    //select a random product from the catalog
    do {
      var product = randomProduct();
    } while (
      //if the product is a repeat, repeat this loop
      product.isRepeat === true
    )

    //if product was selected, now set it's isRepeat to true
    product.isRepeat = true;
    productImage.src = product.image;


  }
  //for loop to do this x amount of times:
  //1. select a random number from allProducts array that wasn't part of the last selected group
  //2. do {select another random number} while (number isn't the last number or part of the last selection)
  //3 .do {select another random number} while (number isn't either of the last 2 numbers or part of the last selection)
  //4. repeat until x
  //var imageX = product, so that you can increment that product's clicks/views after
  //push them into an array randomlyGeneratedProducts

}


var displayArea = document.getElementById('displayArea');
displayArea.addEventListener('click', productSelected);



function resetImages() {
  var displayAreaChild = displayArea.firstElementChild;
  while (displayAreaChild) {
    displayAreaChild.remove();
    displayAreaChild = displayArea.firstElementChild;
  }
}



function renderProducts() {
  //remove any previously displayed images first
  resetImages();


  //for each product in randomlyGeneratedProducts:

  var img1 = document.createElement('img');
  img1.src = `img/${this.image}`;
  displayArea.appendChild(img1);


  //productX.src = productX.image;
}



function productSelected(event) {

  //for loop that compares each image with what was clicked on to figure out what it is

  //when a product is clicked:
  //get the target of the one that was clicked
  //update its stats
  //run renderProducts() again
}


//add a tag.removeEventListener for the end