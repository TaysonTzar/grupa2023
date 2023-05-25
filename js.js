// window.addEventListener("load", init);

if (document.readyState == "loading") {

    document.addEventListener("DOMContentLoaded", init);
} else {

    init();
}




function init() {


    let listaDugmica = document.querySelectorAll(".shop-item-button");

    listaDugmica.forEach(elem => {

        elem.addEventListener("click", dodajUKorpu);

    })

}

function dodajUKorpu() {


    console.log(this.parentElement.parentElement);

    let roditelj = this.parentElement.parentElement;
    let slika = roditelj.querySelector(".shop-item-image").src;
    let cena = roditelj.querySelector(".shop-item-price").textContent;
    let naslov = roditelj.querySelector(".shop-item-title").textContent;


    renderCart(slika, cena, naslov);
    azurirajTotal();

}


function renderCart(slika, cena, naslov) {
    const kontenjerKorpe = document.querySelector(".cart-items");

    const row = document.createElement("div");
    row.classList.add("cart-row");


    const nslovi = kontenjerKorpe.querySelectorAll(".cart-item-title");

    for (let i = 0; i < nslovi.length; i++) {

        if (nslovi[i].textContent == naslov) {

            let roditelj = nslovi[i].parentElement.parentElement;
            roditelj.querySelector(".cart-quantity-input").value = parseInt(roditelj.querySelector(".cart-quantity-input").value) + 1;
            azurirajTotal();
            return;
        }

    }



    let ispis = `<div class="cart-item cart-column">
         <img src="${slika}"  class="cart-item-image" alt="${naslov}">
         <span class="cart-item-title ">${naslov}</span>
         </div>
          <div class="cart-price cart-column"><span>${cena}</span> </div>
          <div class="cart-quantity cart-column">
          <input type="number" min="1" max="10"  value="1" class="cart-quantity-input">
          <button class="btn btn-danger"> Delete</button>
          </div>
         `

    row.innerHTML = ispis;
    kontenjerKorpe.appendChild(row);


    row.querySelector(".btn-danger").addEventListener("click", brisi);
    row.querySelector(".cart-quantity-input").addEventListener("change", azurirajTotal);


}

function brisi() {

    let element = this.parentElement.parentElement;

    element.remove();
    azurirajTotal();

}



function azurirajTotal() {

    const total = document.querySelector(".cart-total-price");
    let suma = 0;

    const cartItems = document.querySelector(".cart-items");
    const rows = cartItems.querySelectorAll(".cart-row");


    rows.forEach(elem => {

        let cena = elem.querySelector(".cart-price").querySelector("span").textContent.substring(1);
        let kolicina = elem.querySelector(".cart-quantity-input").value;

        suma = suma + (kolicina * parseFloat(cena));
    })

    total.textContent = suma.toFixed(2) + "€";

}
