var giveMoney = document.querySelector("#give-money");

var volunteerSection = document.querySelector("#give-time");

// var KM = "16";

var maxDistanceToCharity = document.querySelector("#distance");

var maxDistanceToCharityInput = document.querySelector("#distance input");

// this is basically Omair's code, just modified so it uses geolocation and lat/lon
function findWithinRadius(KM) {
    console.log("findWithinRadius function ran with " + KM);

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "http://data.orghunter.com/v1/charitysearch?"
    var user_key = "user_key=e2e157b99c8dc1f8dd1d4a2711144cfb"
    var distance = "distance=" + KM * 0.621371;
    var longitude = "";
    var latitude = "";
    var charities = [];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, noPosition, {timeout:10000});   
    } 
    console.log( "this " + this);
    function noPosition() {
        console.log(this);
        var modal = createModal("Location not Found", "Could not find location. Please enter your city name <br> <input type='text'>", "", "")
        volunteerSection.append(modal);
    }
    
    function getPosition(position) {
        var posn = [position.coords.latitude, position.coords.longitude];
        //console.log(posn);
        longitude = "longitude=" + posn[1];
        latitude = "latitude=" + posn[0];
    
        fetch(cors + baseUrl + user_key + "&" + distance + "&" + longitude + "&" + latitude)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                for (var i = 0; i <  jsonData.data.length; i++) {
                    var url = jsonData.data[i].url;
                    var charity = jsonData.data[i].charityName.toLowerCase();
                    charities.push([charity,url])
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        
    } console.log(charities); return charities;
}




