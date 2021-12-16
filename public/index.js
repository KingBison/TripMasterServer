window.onload = function(){
    if('user' in localStorage){
        $('#trips').html("<a class='nav' href=trips.html>Trips</a>");
        $('#friends').html("<a class='nav' href=friends.html>Friends</a>");
    }
}


var myLatLng = { lat: 35.397, lng: -80.844 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

var map = new google.maps.Map(document.getElementById('map'), mapOptions);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function calcRoute() {
    
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            $("#DirPopup").css("display","block"); 

            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            
            map.setCenter(myLatLng);

            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for inputs
var options = {
    // types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);




//open/close popups, popup only opens when no other is open
var Open = false;
function theCaribbean() {
    if (!Open) {
    $("#CarPopup").css("display","block"); 
    document.getElementById("carMusic").play();
    Open = true;
    }
 }
function closeCaribbean() {
    $("#CarPopup").css("display","none");
    document.getElementById("carMusic").pause();
    document.getElementById("carMusic").currentTime = 0;
    Open = false;
}
function NewYork() {
    if (!Open) {
    $("#NYPopup").css("display","block");  
    document.getElementById("nyMusic").play();
    Open = true;
    }
}
function closeNewYork() {
    $("#NYPopup").css("display","none");
    document.getElementById("nyMusic").pause();
    document.getElementById("nyMusic").currentTime = 0;
    Open = false;
}
function Amsterdam() {
    if (!Open) {
    $("#AMPopup").css("display","block");
    document.getElementById("amMusic").play();
    Open = true;
    }
}
function closeAmsterdam() {
    $("#AMPopup").css("display","none");
    document.getElementById("amMusic").pause();
    document.getElementById("amMusic").currentTime = 0;
    Open = false;
}
function Japan() {
    if (!Open) {
    $("#JAPopup").css("display","block");  
    document.getElementById("jaMusic").play();
    Open = true;
    }
}
function closeJapan() {
    $("#JAPopup").css("display","none");
    document.getElementById("jaMusic").pause();
    document.getElementById("jaMusic").currentTime = 0;
    Open = false;
}
function closeDirections() {
    $("#DirPopup").css("display","none"); 
}