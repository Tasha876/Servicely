var modalText = [];
var modalLink = [];

var anchorsWithModals = document.querySelectorAll(".opensModal");

//obviously these can be set dynamically

modalText[0] = "Something interesting about the charity";
modalLink[0] = ["Link to the charity", "#"];

modalText[1] = "Something interesting about the charity";
modalLink[1] = ["Link to the charity", "#"];

modalText[2] = "Something interesting about the charity";
modalLink[2] = ["Link to the charity", "#"];

modalText[3] = "Something interesting about the charity";
modalLink[3] = ["Link to the charity", "#"];

modalText[4] = "Something interesting about the charity";
modalLink[4] = ["Link to the charity", "#"];

modalText[5] = "Something interesting about the charity";
modalLink[5] = ["Link to the charity", "#"];

modalText[6] = "Something interesting about the charity";
modalLink[6] = ["Link to the charity", "#"];

modalText[7] = "Something interesting about the charity";
modalLink[7] = ["Link to the charity", "#"];

modalText[8] = "Something interesting about the charity";
modalLink[8] = ["Link to the charity", "#"];

modalText[9] = "Something interesting about the charity";
modalLink[9] = ["Link to the charity", "#"];

function closeModal() {
    this.parentElement.parentElement.parentElement.style.display = "none";
}

function openModal() {

    // because anchorsWithModals is technically a node list and not an array, I has to use Array.prototype
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
    p.innerText = modalText[i];
    modal.style.display = "block";

    var link = document.createElement("a");
    link.innerText = modalLink[i][0];
    link.href = modalLink[i][1];
    link.target = "_blank";

    modalContent.append(modalHeader, p, link)
    modal.appendChild(modalContent);

    this.parentElement.appendChild(modal);
}

/**
 * Function: extractCharityDataByLocation
 * Description: Make an API call to get charity data
 * Returns: JSON charity data
 */
function extractCharityDataByLocation(jsonData, cityName, stateCode) {
    var charityDataByLocationArray = [];
    for (var i = 0; i < 3; i++) {
        var charityDataByLocation = {};
        // 1. Store 3x charity names
        charityDataByLocation.name = jsonData.data[i].charityName;
        // 2. Store 3x lat,long
        charityDataByLocation.latitude = jsonData.data[i].latitude;
        charityDataByLocation.longitude = jsonData.data[i].longitude;
        // 3. Store 3x donation URLs
        charityDataByLocation.donationUrl = jsonData.data[i].donationUrl;
        charityDataByLocationArray.push(charityDataByLocation);
    }
    localStorage.setItem((cityName + "," + stateCode), JSON.stringify({ charitiesArray: charityDataByLocationArray }));
}
/**
 * Function: retrieveCharitiesByLocation
 * Description: Make an API call to get charity data
 * Parameters: 
 *  cityName
 *  stateCode
 * Returns: JSON charity data
 */
function retrieveCharitiesByLocation(cityName, stateCode) {
    var localDbCharityData = JSON.parse(localStorage.getItem(cityName + "," + stateCode));
    var isInLocalDb = (localDbCharityData !== null) ? true : false;
    if (isInLocalDb) {
        console.log(localDbCharityData);
    } else {
        var cors = "https://cors-anywhere.herokuapp.com/"
        var baseUrl = "http://data.orghunter.com/v1/charitysearch?"
        var user_key = "user_key=e2e157b99c8dc1f8dd1d4a2711144cfb"
        var city = "city=" + cityName;
        var state = "state=" + stateCode;
        fetch(cors + baseUrl + user_key + "&" + city + "&" + state)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                // store 3 charities in localDB
                extractCharityDataByLocation(jsonData, cityName, stateCode);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

/**
 * Function: initApplication
 * Description: Entry-point for the Servicely application
 */
function initApplication() {
    retrieveCharitiesByLocation("Boston", "MA");

    for (var i = 0; i < anchorsWithModals.length; i++) {
        anchorsWithModals[i].addEventListener("click", openModal)
    }
}
// jQuery entry-point
$(document).ready(initApplication);