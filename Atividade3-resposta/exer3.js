async function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  async function exibir() {
    let a = await aleatorio(30, 50);
    console.log(a);
  }
  
  exibir();