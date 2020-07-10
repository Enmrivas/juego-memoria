const cards = document.querySelectorAll('.cardmemory');



rachaInt = 0;
vidasInt = 10;
puntosInt = 0;

racha = document.getElementById('racha');
puntos = document.getElementById('puntos');
vidas = document.getElementById('vidas');

let cartaEstaFlipped = false;
let cerrarTabla = false;
let primeraCarta, segundaCarta;

 function voltearCarta() {
    if(cerrarTabla) return;
    if (this == primeraCarta) return;

    this.classList.add('flip');

  if (!cartaEstaFlipped) {
    cartaEstaFlipped = true;
    primeraCarta = this;
    return;
  }
    segundaCarta = this;

   checkForMatch();
 }

 function checkForMatch() {
   if (primeraCarta.dataset.framework === segundaCarta.dataset.framework) {
     desactivarVolteo();
     
     puntosInt = puntosInt + 1;
     rachaInt = rachaInt + 1;
     puntos.innerHTML = puntosInt;
     racha.innerHTML = rachaInt;
    
     if(puntosInt == 8 && vidasInt > 0){
         alert('Has Ganado!');
         location.reload();
     }
     return;
     
   }else{
        rachaInt = 0;
        vidasInt = vidasInt - 1;
        vidas.innerHTML = vidasInt;
        racha.innerHTML = rachaInt;
        if(vidasInt == 0){
            alert('Has perdido!');
            location.reload();
        }
   }

   devolverCartas();
 }

 function desactivarVolteo() {
   primeraCarta.removeEventListener('click', voltearCarta);
   segundaCarta.removeEventListener('click', voltearCarta);

   resetTabla();
 }

 function devolverCartas() {

     cerrarTabla = true;
   setTimeout(() => {
     primeraCarta.classList.remove('flip');
     segundaCarta.classList.remove('flip');

     resetTabla();
   }, 1500);
 }

 function resetTabla(){
     [cartaEstaFlipped, cerrarTabla] = [false, false];
     [primeraCarta, segundaCarta] = [null, null];
 }

 (function randomizar(){
     cards.forEach(card=>{
         let posicionRandom = Math.floor(Math.random()*12);
         card.style.order = posicionRandom;
     });
 })();
 

cards.forEach(card => card.addEventListener('click', voltearCarta));