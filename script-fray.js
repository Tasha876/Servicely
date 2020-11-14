var modalText = [];
var modalLink =[];

var anchorsWithModals = document.querySelectorAll(".opensModal");

//obviously these can be set dynamically

modalText[0] = "Something interesting about the charity";
modalLink[0] = ["Link to the charity","#"];

modalText[1] = "Something interesting about the charity";
modalLink[1] = ["Link to the charity","#"];

modalText[2] = "Something interesting about the charity";
modalLink[2] = ["Link to the charity","#"];

modalText[3] = "Something interesting about the charity";
modalLink[3] = ["Link to the charity","#"];

modalText[4] = "Something interesting about the charity";
modalLink[4] = ["Link to the charity","#"];

modalText[5] = "Something interesting about the charity";
modalLink[5] = ["Link to the charity","#"];

modalText[6] = "Something interesting about the charity";
modalLink[6] = ["Link to the charity","#"];

modalText[7] = "Something interesting about the charity";
modalLink[7] = ["Link to the charity","#"];

modalText[8] = "Something interesting about the charity";
modalLink[8] = ["Link to the charity","#"];

modalText[9] = "Something interesting about the charity";
modalLink[9] = ["Link to the charity","#"];

console.log(anchorsWithModals);

function closeModal() {
    this.parentElement.parentElement.parentElement.style.display="none";
}

function openModal(){
    var i = Array.prototype.indexOf.call(anchorsWithModals, this);

    var modal = document.createElement("div");
    modal.classList.add("w3-modal");

    var modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.classList.add("w3-modal-content", "w3-display-container");

    var modalX = document.createElement("span");
    modalX.classList.add("w3-button", "w3-display-topright");
    modalX.innerHTML = "&times;"
    modalX.addEventListener("click", closeModal);

    var modalHeader = document.createElement("header");
    modalHeader.classList.add("modal-header", "w3-red");

    var h1 = document.createElement("h3");
    h1.innerText = this.innerText;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    var p = document.createElement("p");
    p.innerText =  modalText[i];
    modal.style.display = "block";

    var link = document.createElement("a");
    link.innerText = modalLink[i][0];
    link.href = modalLink[i][1];

    modalContent.append(modalHeader, p, link)
    modal.appendChild(modalContent);

    this.parentElement.appendChild(modal);
}

for (var i = 0; i < anchorsWithModals.length; i++) {
    anchorsWithModals[i].addEventListener("click", openModal)
}



