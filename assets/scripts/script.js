/**
 * Function: extractCharityDataByLocation
 * Description: Make an API call to get charity data
 * Returns: JSON charity data
 */
function extractCharityDataByLocation(jsonData) {
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
    localStorage.setItem((jsonData.data[0].city + "," + jsonData.data[0].state), JSON.stringify({ charitiesArray: charityDataByLocationArray }));
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
            console.log(jsonData);
            // store 3 charities in localDB
            extractCharityDataByLocation(jsonData);
        })
        .catch(function(error) {
            console.log(error);
        });
}

/**
 * Function: initApplication
 * Description: Entry-point for the Servicely application
 */
function initApplication() {
    // clear local-storage
    localStorage.clear();
    retrieveCharitiesByLocation("San Jose", "CA");
}
// jQuery entry-point
$(document).ready(initApplication);