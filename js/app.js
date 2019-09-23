'use strict';

function Product(image, name) {
  this.image = image;
  this.name = name;
  this.allProducts.push(this);
}

Product.allProducts = [];

function renderProducts() {
  //select a random product
  //create an image on the html
  //repeat twice, excluding duplicates


  //productX.src = productX.image;
}

function productSelected() {
  //when a product is clicked:
  //update its stats
  //run renderProducts() again
}
