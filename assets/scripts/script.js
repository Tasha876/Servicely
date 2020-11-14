/**
 * Function: retriveCharitiesByLocation
 * Description: Make an API call to get charity data
 * Parameters: 
 *  cityName
 *  stateCode
 * Returns: JSON charity data
 */
function retriveCharitiesByLocation(cityName, stateCode) {
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
    retriveCharitiesByLocation("Boston", "MA");
}
// jQuery entry-point
$(document).ready(initApplication);