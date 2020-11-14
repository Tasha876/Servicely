var modal1Text = "Something interesting";
var anchorsWithModals = document.querySelectorAll(".opensModal");
console.log(anchorsWithModals);

function openModal(){
    console.log(this);
    var modal = document.createElement("div");
    modal.classList.add("w3-modal");
    var modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.classList.add("w3-modal-content");
    modalContent.innerText = modalText1;
    modal.style.display = "block";
}

for (var i = 0; i < anchorsWithModals.length; i++) {
    anchorsWithModals[i].addEventListener("click", openModal())
}


