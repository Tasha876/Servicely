// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("enterLoc");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    // clear existing text
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var saveAddress = document.getElementById("saveAddress");
saveAddress.addEventListener("click", function() {
    var city = document.getElementById("city");
    var storeCity = city.value;
    // console.log("Address is: " + storeCity);
    //jsonstringify
    // localStorage.setItem("city", storeCity);
    var state = document.getElementById("state");
    var storeState = state.value;
    // localStorage.setItem("state", storeState)
    retrieveCharitiesByLocation(storeCity, storeState);
    modal.style.display = "none";
});