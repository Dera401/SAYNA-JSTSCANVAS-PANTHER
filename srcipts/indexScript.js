const pantherPlus = document.querySelector("#blackPanther-plus");
const princeAncre = document.getElementById("prince");

// scroll vers naissance du heros
pantherPlus.addEventListener("click", function () {
  princeAncre.scrollIntoView({
    behavior: "smooth",
  });
});
