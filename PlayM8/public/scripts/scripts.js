

function showDiv() {
    var showDiv = document.getElementById("show");
    var ikonka = document.getElementById("iconn")
    showDiv.style.display = "block";
    ikonka.style.display = "none";
  }
  function hideDiv() {
    var showDiv = document.getElementById("show");
    var ikonka = document.getElementById("iconn")
    showDiv.style.display = "none";
    ikonka.style.display = "block";
  }


  document.querySelector("#show").addEventListener("mouseleave", () => {
    hideDiv();
    console.log("funguje");
  });