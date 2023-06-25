// reference overlay backdrop
const overlay = document.querySelector(".overlay");

// reference formulaire et popup
const btnConfirm = document.getElementById("btnConfirm");
const btnPopupQuiz = document.getElementById("btn-popup");
const textReponse = document.getElementById("reponse");
const popupTitre = document.querySelector(".popup-titre");
const popupText = document.querySelector(".popup-text");

// reference validator
const validator = document.querySelector(".validator");

// compteur question
const compteurQuiz = document.querySelector(".compteur");

// reference sujet question
const paraSujet = document.getElementsByClassName("para");
const aside = document.querySelector(".aside-element");

// creation des element aside
const asideTitre = document.createElement("h3");
aside.appendChild(asideTitre);
const asidePara = document.createElement("p");
aside.appendChild(asidePara);

// recolte de data dans enigme json
const urlEnigme = "./json/enigme.json";
fetch(urlEnigme)
  .then((reponse) => reponse.json())
  .then((dataEnigme) => populate(dataEnigme))
  .catch((err) => {
    console.err(err);
  });

let i = 0;
compteurQuiz.textContent = i + 1;

function populate(dataEnigme) {
  //----DEFINITION DES FOCTIONS UTILES---------
  function afficheTrue() {
    popupTitre.textContent = `BRAVO!!`;
    popupText.textContent = `Tu as trouvé la réponse.Es tu prêt pour l'énigme suivante ?`;
    textReponse.value = "";
    overlay.style.display = "block";
    btnPopupQuiz.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }

  function afficheFalse() {
    popupTitre.textContent = `OUPS!!!`;
    popupText.textContent = `vous pouvez encore reessayer`;
    btnPopupQuiz.textContent = `REESAYER`;
    textReponse.value = "";
    overlay.style.display = "block";
    btnPopupQuiz.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }
  //   ---------------------------------------------

  // ----------DEBUT EVENEMENT ----------------------
  btnConfirm.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (textReponse.value === "") {
      validator.textContent = "Veuillez entrer votre réponse";
    } else {
      while (i < dataEnigme.length) {
        validator.textContent = "";
        //   transformation des reponses en miniscule
        const givenReponse = textReponse.value.toLocaleLowerCase();
        const reponseData = dataEnigme[i].reponse.toLocaleLowerCase();

        if (i === 0) {
          if (givenReponse === reponseData) {
            afficheTrue();
            i++;
            // effacer les initialisations sur html
            document.querySelector(".transcrip-aside").remove();
            document.querySelector(".quote").remove();
            // partie intro et sujet de enigme
            paraSujet[0].textContent = dataEnigme[i].intro;
            paraSujet[1].textContent = dataEnigme[i].sujet;
            // partie aside

            asideTitre.textContent = `Le savais tu ? `;
            asidePara.textContent = dataEnigme[i].plus;
            compteurQuiz.textContent = i + 1;

            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        } else if (i === dataEnigme.length - 1) {
          if (givenReponse === reponseData) {
            popupTitre.textContent = `TON INITIATION EST TERMINE`;
            popupText.textContent = ``;
            btnPopupQuiz.textContent = `REVENIR A L'ECRAN D'ACCUEIL`;
            textReponse.value = "";
            overlay.style.display = "block";
            btnPopupQuiz.addEventListener("click", function () {
              overlay.style.display = "none";
              window.location.href = "../index.html";
            });
            i++;
            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        } else {
          if (givenReponse === reponseData) {
            afficheTrue();
            i++;
            paraSujet[0].textContent = dataEnigme[i].intro;
            paraSujet[1].textContent = dataEnigme[i].sujet;
            asideTitre.textContent = `Le savais tu ? `;
            asidePara.textContent = dataEnigme[i].plus;
            compteurQuiz.textContent = i + 1;
            // console.log(i);
          } else {
            afficheFalse();
            // console.log(i);
          }
        }

        break;
      }
    }
  });
}

// section popup

// definition de l'evenement ouverture de overlay
// btnConfirm.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   ouvrirFenetre();
// });

// function ouvrirFenetre() {
//   overlay.style.display = "block";
// }

// btnPopupQuiz.addEventListener("click", fermerFenetre);

// function fermerFenetre() {
//   overlay.style.display = "none";
// }
