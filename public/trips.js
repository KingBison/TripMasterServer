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
                    
                    if(user.email == data[i].participants[k].email && data[i].completed == false){
                        console.log(data[i]);
                        tripsOn.push(i);
                    }
                }
            }

            if(tripsOn.length == 0){
                $('#main').html("<div id='noTrips'>You have not made any trips</div>");
            } else {

                if('selected' in localStorage){
                    var trip$ = JSON.parse(localStorage.selected);
                    let found = false;
                    for(let i = 0; i<data.length; i++){
                        if(data[i]._id == trip$._id){
                            found = true;
                            trip$ = data[i];
                        }
                    }
                    if(!found){
                        alert('fail');
                    }
                    let active = null;
                    let html="";
                    
                    $('#trips_logo').html(trip$.name); 
                    document.getElementById('main').style.backgroundColor = "transparent";
                    html+="<div id='EDIT'>"+
                        "<div id='left'>";
                        if(user.friends.length == 0){
                            html+="<div id='noFriends'>You Have No Friends</div>"; 
                        } else {
                            html+="<div id='participants'>"+
                            "<div class='title'>Friends</div>";
                                //participants

                            console.log(user.friends.length);
                            for(let i = 0; i<user.friends.length; i++){
                                
                                html+="<div class='alterFriend'>"+
                                    "<div class='friendName'>" + user.friends[i].firstName + " " + user.friends[i].lastName + "</div>"+
                                    "<button id='addP-" + i + "'>Add</button>"+
                                    "<button id='removeP-" + i + "'>Remove</button>"+
                                "</div>";

                            }
                            html+="</div><hr>";
                                    
                        }

                            html+="<div id='financialEntries'>";
                                html+="<div class='title'>Finance History</div>";

                                if(trip$.finances.length == 0){
                                    html+="<div id='noMoney'>You have no financial entries</div>";

                                } else {
                                    for(let i = 0; i<trip$.finances.length; i++){
                                        for(let k = 0; k<trip$.finances[i].people.length; k++){
                                            html+="<div class='entry'>"+
                                                "<div>"+trip$.finances[i].people[k].person.firstName+ " owes " + trip$.finances[i].payer.firstName + " $" + trip$.finances[i].people[k].owes + " for " + trip$.finances[i].people[k].reason + "</div>" +
                                            "</div>";
                                        }
                                    }
                                }
                            html+="</div><hr>";

                            html+="<div id='newFinancialEntry'>";
                                html+="<label>How much did I pay?</label><input type=number id='bill'><br>"+
                                "<label>What was it for?</label><input type=text id='bill_desc'><br>";

                                active = [];
                                for(let i = 0; i<user.friends.length; i++){
                                    for(let k = 0; k<trip$.participants.length; k++){
                                        if(user.friends[i].email == trip$.participants[k].email){
                                            active.push(i);
                                        }
                                        
                                    }
                                }
                                
                                for(let i = 0; i<active.length; i++){
                                    html+="<div class='person'>"+
                                        "<div>"+user.friends[i].firstName + " " + user.friends[i].lastName + "</div>"+
                                        "<div>owes</div>"+
                                        "<input type=number id='owes-" + i + "'>"+

                                    "</div>";
                                    
                    
                                }
                                html+="<button id='makeNewFinance'>Create</button>"
                                

                            html+="</div>";
                                
                                
                        html+="</div>";
                        html+="<div id='right'>";
                            html+="<div class='title'>Options</div>"
                            html+="<div id='tripOptions'>"+
                                "<button id='back'>Back</button>"+
                                "<button id='complete'>Complete Trip</button>"+
                                
                            "</div><hr>";
                            html+="<div class='title'>Events</div>";
                            html+="<div id='newEvent'>"+
                                "<label>New Event Name</label><input type='text' id='newEventName'>"+
                                "<label>New Event Location</label><input type='text' id='newEventLocation'>"+
                                "<label>New Event Start Time</label><input type='datetime-local' id='newEventStart'>"+
                                "<label>New Event End Time</label><input type='datetime-local' id='newEventEnd'>"+
                                "<button id='makeNewEvent'>Create</button>";
                                
                            html+="</div><hr>"+
                            "<div id='events>"+

                            "</div>"+

                        "</div>"
                                
                        html+="</div>";
                    html+="</div>";

                    html+= "<div id='event_list_container' >";
                    html += "<div id='event_list_header'>" + "Event List</div><div id='event_list_body'>"+
                    "<div class='eventTable'><table id='eventTable' class = 'table table-bordered data-table'>"+"<thead style='text-align: center;'>"+"<th style='width: 18%;'>Name</th>"+
                                "<th style='width: 30%;'>Location</th>"+"<th style='width: 23%;'>Start Time</th>"+"<th style='width: 23%;'>End Time</th>" +"<th style='width: 35%;'>Edit</th>"+"</thead>" +"<tbody>";
                                html+="</tbody>";
                            html+="</table>";
                        html+= "</div>";
                    html+= "</div>";
                html+= "</div>";

                    $('#main').html(html);
                    for(let i = 0; i<trip$.events.length; i++){   
                        $(".data-table tbody").append("<tr event-name='"+trip$.events[i].name+"' event-loc ='"+trip$.events[i].location+"'event-start = '"+trip$.events[i].start+
                        "' event-end='"+trip$.events[i].end+"'><td>"+trip$.events[i].name+"</td><td>"+trip$.events[i].location+"</td><td>"+trip$.events[i].start+"</td><td>"+trip$.events[i].end+"</td><td><button class='btn btn-danger btn-lg btn-delete mr-3' type ='button'>Delete</button><button class='btn btn-info btn-lg btn-edit' type ='button'>Edit</button></td></tr>");
                    }
                    $('#makeNewEvent').click(function(){
                        let eventName = $('#newEventName').val();
                        let eventLoc = $('#newEventLocation').val();
                        let eventStart = $('#newEventStart').val();
                        let eventEnd = $('#newEventEnd').val();
                        
                        let newEventEntry = {
                            name: eventName,
                            location: eventLoc,
                            start: eventStart, 
                            end: eventEnd,
                        }
                        let eventConflict = false;
                        for (let i = 0; i < trip$.events.length; i++) {
                            if (eventName == trip$.events[i].name || eventStart == trip$.events[i].start){
                                alert("Event Conflict!");
                                eventConflict = true;
                            }
                        }
                        if (!eventConflict) {
                        trip$.events.push(newEventEntry);
                    $.ajax({
                        type:'PATCH',
                        url:'/trips/'+trip$._id,
                        contentType:'application/json',
                        dataType:'json',
                        data:JSON.stringify({events:trip$.events}),
                        success: function(data){
                            localStorage.selected = JSON.stringify(trip$);
                            location.reload();
                            
                        }
        
                    });
                        }
                    });

                    $('body').on('click', '.btn-delete', function() {
                        let eventToDel = $(this).parents('tr').attr('event-name');
                        var nameFound = false;
                        let index = 0;
                        $(this).parents('tr').remove();

                        for (let i = 0; i < trip$.events.length; i++) {
                            if (trip$.events[i].name == eventToDel);
                            index = i;
                            nameFound = true;
                            break;
                        }
                        if (nameFound) {
                            trip$.events.splice(index, 1);
                            
                            $.ajax({
                                type:'PATCH',
                                url:'/trips/'+trip$._id,
                                contentType:'application/json',
                                dataType:'json',
                                data:JSON.stringify({events:trip$.events}),
                                success: function(data){
                                    localStorage.selected = JSON.stringify(trip$);
                                    location.reload();
                                    
                                }
                
                            });
                        }

                    });

                    $('body').on('click', '.btn-edit', function() {
                        
                    });

                    var optionsEstablishments = {
                        types: ['establishment']
                    }

                    var eventInput = document.getElementById("newEventLocation");
                    var autoComplete1 = new google.maps.places.Autocomplete(eventInput, optionsEstablishments);

                    $('#makeNewEvent').click(function(){
                        var eventInfo = {
                            name: $('#newEventName').val(),
                            location: $('#newEventLocation').val(),
                            start: $('#newEventStart').val(),
                            end: $('#newEventEnd').val(),
                        }

                        console.log(eventInfo);
                    })

                    $('#back').click(function(){
                        localStorage.removeItem('selected');
                        location.reload();
                    });

                    $('#complete').click(function(){

                        var people = [];
                        for(let i = 0; i<trip$.finances.length; i++){
                            
                            for(let k = 0; k<trip$.finances[i].people.length; k++){
                                if(!people.includes(trip$.finances[i].people[k].person.firstName)){
                                    people.push(trip$.finances[i].people[k].person.firstName);
                                }
                            }
                            if(!people.includes(trip$.finances[i].payer.firstName)){
                                people.push(trip$.finances[i].payer.firstName);
                            }
                        }

                        let CF = []

                        for(let i = 0; i<people.length; i++){
                            for(let k = i+1; k<people.length; k++){
                                CF.push({
                                    p1: people[i],
                                    p2: people[k],
                                    net: 0
                                });

                                
                            }
                        }

                        for(let i = 0; i<trip$.finances.length; i++){
                            
                            for(let k = 0; k<trip$.finances[i].people.length; k++){
                                
                                for(let j = 0; j<CF.length; j++){
                                    if(CF[j].p1 == trip$.finances[i].people[k].person.firstName && CF[j].p2 == trip$.finances[i].payer.firstName){
                                        CF[j].net -= trip$.finances[i].people[k].owes;
                                        console.log(trip$.finances[i].people[k].person.owes);
                                        
                                    }
                                    if(CF[j].p2 == trip$.finances[i].people[k].person.firstName && CF[j].p1 == trip$.finances[i].payer.firstName){
                                        CF[j].net += trip$.finances[i].people[k].owes;
                                    }
                                }
                            }
                            
                        }





                        console.log(CF);

                        


                        let html="";
                        html+="<div id='COMPLETE'>";


                            html+="<div class='NAME'>"+trip$.name+"</div>";
                            html+="<div id='financialEntries'>";
                                html+="<div class='title'>Finance History</div>";

                                if(trip$.finances.length == 0){
                                    html+="<div id='noMoney'>You have no financial entries</div>";

                                } else {
                                    for(let i = 0; i<trip$.finances.length; i++){
                                        for(let k = 0; k<trip$.finances[i].people.length; k++){
                                            html+="<div class='entry'>"+
                                                "<div>"+trip$.finances[i].people[k].person.firstName+ " owes " + trip$.finances[i].payer.firstName + " $" + trip$.finances[i].people[k].owes + " for " + trip$.finances[i].people[k].reason + "</div>" +
                                            "</div>";
                                        }
                                    }
                                }
                            html+="</div><hr>";
                            for(let i = 0; i<CF.length; i++){
                                if(CF[i].net<0){
                                    html+="<div>" + CF[i].p1 + " owes " + CF[i].p2 + " $" + CF[i].net*-1 + "</div>";
                                }
                                if(CF[i].net>0){
                                    html+="<div>" + CF[i].p2 + " owes " + CF[i].p1 + " $" + CF[i].net + "</div>";
                                }

                            }

                            trip$.completed = true; 
                            $.ajax({
                                type:'PATCH',
                                url:'/trips/'+trip$._id,
                                contentType:'application/json',
                                dataType:'json',
                                data:JSON.stringify({completed:trip$.completed}),
                                success: function(data){

                                    localStorage.removeItem('selected');
                                    
                                }
                
                            });


                            

                        html+="</div>";

                        $('#main').html(html);
                    });

                    $('#makeNewFinance').click(function(){
                        let newFinancialEntry = {
                            payer: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            },
                            people: []
                        }
                        for(let i = 0; i<active.length; i++) {
                            
                                newFinancialEntry.people.push({
                                    person: user.friends[i],
                                    amount: $('#bill').val(),
                                    reason: $('#bill_desc').val(),
                                    owes: Number($('#owes-' + i).val())
                                })
                            
                            
                        }

                        trip$.finances.push(newFinancialEntry);

                        $.ajax({
                            type:'PATCH',
                            url:'/trips/'+trip$._id,
                            contentType:'application/json',
                            dataType:'json',
                            data:JSON.stringify({finances:trip$.finances}),
                            success: function(data){
                                localStorage.selected = JSON.stringify(trip$);
                                location.reload();
                                
                            }
            
                        });
                    });

                    $('.alterFriend').each(function(index){
                        
                        let active = [];
                        for(let i = 0; i<user.friends.length; i++){
                            for(let k = 0; k<trip$.participants.length; k++){
                                if(user.friends[i].email == trip$.participants[k].email){
                                    active.push(i);
                                }
                                
                            }
                        }
                        

                        $('#removeP-' + index).hide();
                        $('#addP-' + index).addClass('addP');

                        for(let i = 0; i<active.length; i++){
                            $('#addP-' + active[i]).hide();
                            $('#removeP-' + active[i]).addClass('removeP').removeClass('addP').show();
                             
                
                            
                        }
                        
                        

                        $('#addP-' + index).click(function(){
                            trip$.participants.push(user.friends[index]);

                            $.ajax({
                                type:'PATCH',
                                url:'/trips/'+trip$._id,
                                contentType:'application/json',
                                dataType:'json',
                                data:JSON.stringify({participants:trip$.participants}),
                                success: function(data){
                                    localStorage.selected = JSON.stringify(trip$);
                                    location.reload();
                                    
                                }
                
                            });

                        
                        })

                        $('#removeP-' + index).click(function(){
                            trip$.participants.splice(trip$.participants.indexOf(user.friends[index]),1);

                            $.ajax({
                                type:'PATCH',
                                url:'/trips/'+trip$._id,
                                contentType:'application/json',
                                dataType:'json',
                                data:JSON.stringify({participants:trip$.participants}),
                                success: function(data){
                                    localStorage.selected = JSON.stringify(trip$);
                                    location.reload();
                                }
                
                            });
                        })

                        
                    })








                } else {

                

                    let html = "<div id='allTrips'>";
                    for(let i = 0; i<tripsOn.length; i++){
                        html+="<div class='trip'>"+
                            "<div class='tripName'>" + data[tripsOn[i]].name + "</div>"+
                            "<button class='edit' id='edit-" + i + "' class='editButton'>Edit</button>"+
                            "<div class='destinationName'>" + data[tripsOn[i]].destination + "</div>"+
                            "<button class='remove' id='remove-" + i + "' class='removeButton'>Remove</button>"+
                        "</div>";
                        
                    } 
                    html+="</div>"
                    $('#main').html(html);

                    $('.trip').each(function(index){
                        $("#remove-" + index).click(function(){
                            console.log(data[tripsOn[index]].participants.length);
                            for(let i = 0; i<data[tripsOn[index]].participants.length; i++){
                                if(data[tripsOn[index]].participants[i].email == user.email){
                                    console.log(data[tripsOn[index]].participants[i].email);
                                    console.log(user.email);
                                    data[tripsOn[index]].participants.splice(i,1);
                                }
                            }
                            $.ajax({
                                type:'PATCH',
                                url:'/trips/'+data[tripsOn[index]]._id,
                                contentType:'application/json',
                                dataType:'json',
                                data:JSON.stringify({participants:data[tripsOn[index]].participants}),
                                success: function(data){
                                    location.reload();
                                }
                
                            });
                        });


                        $("#edit-" + index).click(function(){
                            var selected = data[tripsOn[index]];
                            localStorage.selected = JSON.stringify(selected);
                            location.reload();
                        });

                    });

                }
            }
            
        }
    });

    var options = {
        types: ['(cities)']
    }

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
        var input1 = document.getElementById("home");
        var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    
        var input2 = document.getElementById("destination");
        var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
        $('#cancel').click(function(){
            location.reload();
        });

        $('#create').click(function(){
            var participants = [];
            participants.push({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
            alert('check');
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
                finances: [],
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