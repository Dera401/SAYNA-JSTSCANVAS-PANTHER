// section popup
// enregistrement des constiables necessaire à l'evenement
const btnConfirm = document.getElementById("btnConfirm");
const btnClose = document.getElementById("btnClose");
const overlay = document.querySelector(".overlay");

// definition de l'evenement ouverture de overlay
btnConfirm.addEventListener("click", (evt) => {
  evt.preventDefault();
  ouvrirFenetre();
});

function ouvrirFenetre() {
  overlay.style.display = "block";
}

btnClose.addEventListener("click", fermerFenetre);

function fermerFenetre() {
  overlay.style.display = "none";
}
