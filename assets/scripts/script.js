var charitySection = document.querySelector("#give-money");

var anchorsWithModals = document.querySelectorAll(".opensModal");

var giveMoney = document.querySelector("#give-money");

var volunteerSection = document.querySelector("#give-time");

var user_key = "user_key=9783b08224096112ba94f5d9b8377d11";

// closes modal
function closeModal() {
    this.parentElement.parentElement.parentElement.style.display = "none";
}

// opens modal
function openModal() {

    var modal = createModal(this.innerText, "Click below to donate:", this.getAttribute("data-name"), this.getAttribute("data-url"))

    this.parentElement.appendChild(modal);

}

// this script creates the modal
function createModal(header, content, footer, optionalUrl) { // enter "" if not using optionalUrl

    // create modal
    var modal = document.createElement("div");
    modal.classList.add("w3-modal", "w3-center");

    // create modal content
    var modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.classList.add("w3-modal-content", "w3-display-container");

    // create exit button
    var modalX = document.createElement("span");
    modalX.classList.add("w3-button", "w3-display-topright");
    modalX.innerHTML = "&times;"
    modalX.addEventListener("click", closeModal);

    // create modal header
    var modalHeader = document.createElement("header");
    modalHeader.classList.add("modal-header", "w3-red");
    var h1 = document.createElement("h3");
    h1.innerText = header;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    // create modal contents
    var p = document.createElement("p");
    p.innerHTML = content;
    modal.style.display = "block";

    // create anchor
    var link = document.createElement("a");
    link.innerText = footer;

    // add URL to anchor if applicable
    if (optionalUrl) {
        link.href = optionalUrl;
        link.target = "_blank";
    }

    // append it all
    modalContent.append(modalHeader, p, link)

    // return the completed modal!
    return modal;
}


// this script creates li in the HTML that list charity information
function createListItem(lst, sectionID) {

    var ul = sectionID.querySelector("ul");

    ul.innerText = "";
    var i = 0

    // javascript does not seem to know the length of lst in advance
    while (lst[i] !== undefined) {
        // create elements
        var li = document.createElement("li");
        var link = document.createElement("a");
        var p = document.createElement("p");

        // add text to elements
        link.innerText = lst[i][0];
        // p.innerText = "try to find description somehow";

        // add classes to elements
        link.classList.add("w3-xlarge", "opensModal");
        p.classList.add("w3-large", "desc");

        // add event listener
        link.addEventListener("click", openModal);

        // set data-attributes to be used later
        link.setAttribute("data-name", lst[i][0]);
        link.setAttribute("data-url", lst[i][1]);

        // append to page
        li.appendChild(link);
        li.appendChild(p);
        ul.appendChild(li);

        i++;
    }

}

// this is basically Omair's code, just modified so it uses geolocation and lat/lon
function findWithinRadius(miles) {

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "https://data.orghunter.com/v1/charitysearch?"
    var distance = "distance=" + miles;
    var longitude = "longitude=" + localStorage.getItem("User Longitude");
    var latitude = "latitude=" + localStorage.getItem("User Latitude");
    var charities = [];
    console.log("fetch CALL");
    fetch(cors + baseUrl + user_key + "&" + distance + "&" + longitude + "&" + latitude)
        // fetch(cors + "https://data.orghunter.com/v1/charitysearch?user_key=9783b08224096112ba94f5d9b8377d11&latitude=45.25021725752714&longitude=-75.74827260890281&distance=10")
        .then(function(response) {
            console.log("return JSON response");
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData.data);
            for (var i = 0; i < 5 && i < jsonData.data.length; i++) {

                var url = jsonData.data[i].donationUrl;
                var charity = jsonData.data[i].charityName.toLowerCase();
                console.log("url:" + url);
                console.log("charity:" + charity);
                charities.push([charity, url])
            }
            createListItem(charities, charitySection);
        })
        .catch(function(error) {
            modal = createModal("Error", error, "Please try again.", "");
            console.log(this);
            charitySection.appendChild(modal);
        });

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
        console.log("Data found in localDB!");
        console.log(localDbCharityData);
    } else {
        var cors = "https://cors-anywhere.herokuapp.com/"
        var baseUrl = "http://data.orghunter.com/v1/charitysearch?"
        var city = "city=" + cityName;
        var state = "state=" + stateCode;
        fetch(cors + baseUrl + user_key + "&" + city + "&" + state)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                // store 3 charities in localDB
                // console.log(jsonData);
                extractCharityDataByLocation(jsonData, cityName, stateCode);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

function getUserLocation() {
    if (!navigator.geolocation) {
        //retrieveCharitiesByLocation("Boston", "MA");
        console.log("Blocked!");
    } else {
        navigator.geolocation.getCurrentPosition(positionFound, positionNotFound, { timeout: 3000 });
    }
}

// if the position is found (e.g. the user accepts)
function positionFound(position) {
    console.log("Allowed!")
    localStorage.setItem("Geo Accuracy", position.coords.accuracy);
    localStorage.setItem("User Latitude", position.coords.latitude);
    localStorage.setItem("User Longitude", position.coords.longitude);
    var buttonDisplay = document.getElementById("enterLoc");
    buttonDisplay.style.display = "none";
    findWithinRadius("10");
}

// if the position is not found!!!!
// this is where the code for user input would go
function positionNotFound(position) {
    console.log("Blocked!");
    // create modal to get user input, see *createModal()*
}

// code to initialize application
function initApplication() {
    // basically just adding some event listeners to some buttons

    var giveMoneyBtn = document.querySelector(".give-money-btn");

    giveMoneyBtn.addEventListener("click", function() {
        getUserLocation();
    });

    var giveTimeBtn = document.querySelector(".give-time-btn");

    var volunteerSection = document.querySelector("#give-time");

    giveTimeBtn.addEventListener("click", function() {
        var giveTimeList = [
            ["something", ""]
        ];
        createListItem(giveTimeList, volunteerSection);
    });

}

// jQuery entry-point
$(document).ready(initApplication);