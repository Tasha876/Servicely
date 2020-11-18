// this is basically Omair's code, just modified so it uses geolocation and lat/lon
function getDesc(toSearch) {
    var baseUrl = "https://en.wikipedia.org/w/rest.php/v1/search/page?&";
    //var getDesc = "prop=extracts&exsentences=1&titles=" + toSearch;
    var desc = "limit=1&q=" + toSearch;
    var url = baseUrl + desc;
    var descript = "";
    console.log(url);

    

    function fetchData() {

        fetch(url)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(jsonData) {
                //console.log(jsonData);
                //charityList.innerText = "";
                descript = jsonData;
            descript = (jsonData.pages[0].description);
            console.log(descript);
            })
            .catch(function(error) {
                console.log(error);
            })
    } 

    fetchData();
    return descript;
} 


console.log(getDesc("foundation+for+international"));


// json.query.pages["7955325"].extract;