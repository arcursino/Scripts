reverse = (x) => {
    let aux = ""
    let inv = ""
  
    for (i = x.length - 1; i >= 0; i--) {
      inv = inv + x[i];
    }
  
    return x;
  }
  
console.log(reverse("Cheguei em Chernobyl"));
  
  