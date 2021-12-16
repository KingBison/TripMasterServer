window.onload = function(){
    if('user' in localStorage){
        $('#trips').html("<a class='nav' href=trips.html>Trips</a>");
        $('#friends').html("<a class='nav' href=friends.html>Friends</a>");
    }

    let user = JSON.parse(localStorage.user);

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/trips',
        success: function(data){

            


            let tripsOn = [];
            for(let i = 0; i<data.length; i++){
                for(let k = 0; k<data[i].participants.length; k++){
                    if(user.email == data[i].participants[k].email){
                        tripsOn.push(i);
                    }
                }
            }

            if(tripsOn.length == 0){
                $('#main').html("<div id='noTrips'>You have not made any trips</div>");
            }
        }
    });

    $('#makeNewTrip').click(function(){
        let html = "";
        html+="<div id='newTripMain'>"+
            "<div id='specs'>"+
                "<label>Trip Name:</label><input type=text id='name'>"+
                "<label>Home:</label><input type=text id='home'>"+
                "<label>Destination:</label><input type=text id='destination'>"+
                "<label>Budget Minimum:</label><input type=number id='budMin'>"+
                "<label>Budget Maximum:</label><input type=number id='budMax'>"+
            "</div>";
            html+="<div id='invites'>"+
                "<h2>Invite Friends</h2>";
            for(let i = 0; i<user.friends.length; i++){
                html+="<div class='invite'>"+
                    "<input type=checkbox id='friend-" + i + "'><label>" + user.friends[i].firstName + " " + user.friends[i].lastName + "</label>"+
                "</div>";
                
            }
            html+="</div>"+
            "<div id='buttons'>"+
                "<div></div>"+
                "<button id='cancel'>Cancel</button>"+
                "<div></div>"+
                "<button id='create'>Create</button>"+
                "<div></div>"+
            "</div>"+



        "</div>";
        $("#main").html(html);

        $('#cancel').click(function(){
            location.reload();
        });

        $('#create').click(function(){
            var participants = [];
            for(let i = 0; i<user.friends.length; i++){
                if($("#friend-" + i).is(':checked')){
                    participants.push(user.friends[i]);
                }
            }
            var data = {
                name: $('#name').val(),
                completed: false,
                participants: participants,
                events: [],
                budget: [$('#budMin').val(),$('#budMax').val()],
                home: $('#home').val(),
                destination: $('#destination').val(),
                preferances: {},
            }


            $.ajax({
                type: 'POST',
                url: '/trips',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data){
                    location.reload();
                }
            })
        });
    
        
    })
}