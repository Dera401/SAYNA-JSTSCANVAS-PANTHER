const pantherPlus = document.querySelector("#blackPanther-plus");
const princeAncre = document.getElementById("prince");

// scroll vers naissance du heros
pantherPlus.addEventListener("click", function () {
  princeAncre.scrollIntoView({
    behavior: "smooth",
  });
});

// carrousel
// reference de la partie photo
const photo = document.getElementsByClassName("photo");
// reference de la partie description

const titre = document.getElementsByClassName("titre");
const para = document.getElementsByClassName("para");

// animation carrousel
const conteneurDescr = document.getElementsByClassName("itemTxt");

// bouton suivant
const btnSuivant = document.querySelector(".chevron");

// recolte de donnee de la carrousel à partir du json
const urlCarrousel = "./json/carrousel.json";
fetch(urlCarrousel)
  .then((result) => result.json())
  .then((carrousel) => {
    drawCarrousel(carrousel);
  })
  .catch((err) => {
    console.log(`erreur de chargement de donné ${err}`);
  });
// compteur
let i = 0;

// ---------DEBUT DU PROGRAMME--------------
// ---------DEFINITION DES FONCTION UTILES--------
function drawCarrousel(carrousel) {
  // animation carroussel
  function animation() {
    for (let j = 0; j < conteneurDescr.length; j++) {
      conteneurDescr[j].classList.add("fade");
      setTimeout(function () {
        conteneurDescr[j].classList.remove("fade");
      }, 500);
    }
    for (let j = 0; j < photo.length; j++) {
      photo[j].classList.add("fade");
      setTimeout(function () {
        photo[j].classList.remove("fade");
      }, 500);
    }
  }
  // initialisalisation description
  function initialiseDescr(carrousel) {
    for (let j = 0; j < titre.length; j++) {
      titre[j].textContent = carrousel[j + i].titre;
      para[j].textContent = carrousel[j + i].description;
    }
  }

  // itnitialisation illustraton
  function initialiseIllustration() {
    for (let j = 0; j < photo.length; j++) {
      photo[j].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${
        j + i + 1
      }.png`;
    }
  }
  // initialisation de la carrousel
  function initialiseCarrousel(carrousel) {
    initialiseIllustration();
    initialiseDescr(carrousel);
    i++;
  }
  // ----------FIN DEFINITIONDES FONCTION UTILE-----------

  initialiseCarrousel(carrousel);

  // -------------DEBUT AVEC L'EVENEMENT CLIC---------------

  btnSuivant.addEventListener("click", function () {
    if (i < carrousel.length - 2) {
      // ajout animation avec setTimeOut
      animation();
      initialiseCarrousel(carrousel);
    }
    // gerer les deux derniers cas particuliers
    else if (i <= carrousel.length - 2) {
      const long = carrousel.length;
      initialiseDescr(carrousel);
      photo[0].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${
        i + 1
      }.png`;
      photo[1].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${long}.png`;
      photo[2].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${1}.png`;
      i++;
      animation();
    } else if (i <= carrousel.length - 1) {
      const long = carrousel.length;
      photo[0].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${long}.png`;
      titre[0].textContent = carrousel[i].titre;
      para[0].textContent = carrousel[i].description;
      photo[1].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${1}.png`;
      titre[1].textContent = carrousel[0].titre;
      para[1].textContent = carrousel[0].description;
      photo[2].src = `./illustrations+Logo/Accueil/Pantherhome_slider_${2}.png`;
      i++;
      animation();
    } else {
      i = 0;
      initialiseCarrousel(carrousel);
      animation();
    }
  });
}

// section popup
// enregistrement des constiables necessaire à l'evenement
const btnConfirm = document.getElementById("btnConfirm");
const btnClose = document.getElementById("btnClose");
const overlay = document.querySelector(".overlay");

// champ du formulaire et validator
const validator = document.getElementsByClassName("validator");
const inputForm = document.getElementsByClassName("inputForm");

// definition de l'evenement ouverture de overlay
btnConfirm.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (
    inputForm[0].value === "" ||
    inputForm[1].value === "" ||
    inputForm[2].value === ""
  ) {
    if (inputForm[0].value === "") {
      validator[0].textContent = `Veuillez enter votre identité`;
    }
    if (inputForm[1].value === "") {
      validator[1].textContent = `Veuillez enter votre adresse email`;
    }
    if (inputForm[2].value === "") {
      validator[2].textContent = `Veuillez enter votre message`;
    }
  } else {
    for (let i = 0; i < inputForm.length; i++) {
      inputForm[i].value = ``;
      validator[i].textContent = ``;
    }
    ouvrirFenetre();
  }
});

function ouvrirFenetre() {
  overlay.style.display = "block";
}

btnClose.addEventListener("click", fermerFenetre);

function fermerFenetre() {
  overlay.style.display = "none";
}
