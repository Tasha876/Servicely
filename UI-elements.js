// this script creates the modal and the 

function createModal(header, content, footer, optionalUrl) { // enter "" if not using optionalUrl
    var modal = document.createElement("div");
    modal.classList.add("w3-modal", "w3-center");

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
    h1.innerText = header;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    var p = document.createElement("p");
    p.innerHTML =  content;
    modal.style.display = "block";

    var link = document.createElement("a");
    console.log(footer);
    console
    link.innerText = footer;

    if (optionalUrl) {
        link.href = optionalUrl;
        link.target ="_blank";
    }

    modalContent.append(modalHeader, p, link)
    return modal;
}

function createListItem(lst, sectionID, lstLength) {
    //console.log("createModal", lst)
    var ul = sectionID.querySelector("ul");
    
    ul.innerText = "";
    var i = 0
    while(lst[i] !== undefined) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        var p = document.createElement("p");

        link.innerText = lst[i][0];
        p.innerText = "try to find description somehow";

        link.classList.add("w3-xlarge", "opensModal");
        p.classList.add("w3-large", "desc");
        
        link.addEventListener("click", openModal);
    
        li.appendChild(link);
        li.appendChild(p);
        link.setAttribute("data-name", lst[i][0]);
        link.setAttribute("data-url", lst[i][1]);
        console.log(link.outerHTML);
        ul.appendChild(li);
        link.addEventListener("click", openModal);
        console.log("createModal", ul.innerHTML);
        i++;
    }
    
}