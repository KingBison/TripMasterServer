window.onload = function(){

    if('user' in localStorage){


        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/trips',
            success: function(data){
                let html="";
                for(let i = 0; i<data.length; i++){
                    for(let k = 0; k<data[i].participants.length; k++){
                        
                        if(user.email == data[i].participants[k].email && data[i].completed == true){
                            var trip$ = data[i];
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

                            


                            
                            html+="<div class='COMPLETE'>";


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


                                

                            html+="</div>";

                            
                            }
                    }
                }
                $('#pastTrips').html(html);
            }
        });


        $('#trips').html("<a class='nav' href=trips.html>Trips</a>");
        $('#friends').html("<a class='nav' href=friends.html>Friends</a>");




        $('#main').hide();
        let user = JSON.parse(localStorage.user);
        $('#fn').html(user.firstName);
        $('#ln').html(user.lastName);
        $('#em').html(user.email);
        $('#pw').html(user.password);

        $('#changeFN').click(function(){
            user.firstName = $('#CfirstName').val()
            $.ajax({
                type:'PATCH',
                url:'/users/'+user._id,
                contentType:'application/json',
                dataType:'json',
                data:JSON.stringify({firstName:user.firstName}),
                success: function(data){
                    localStorage.setItem('user',JSON.stringify(user));
                    location.reload();
                }

            });
        });

        $('#changePW').click(function(){
            user.firstName = $('#Cpassword').val();
            $.ajax({
                type:'PATCH',
                url:'/users/'+user._id,
                contentType:'application/json',
                dataType:'json',
                data:JSON.stringify({password:user.password}),
                success: function(data){
                    localStorage.setItem('user',JSON.stringify(user));
                    location.reload();
                }

            });
        });

        $('#changeLN').click(function(){
            user.firstName = $('#ClastName').val();
            $.ajax({
                type:'PATCH',
                url:'/users/'+user._id,
                contentType:'application/json',
                dataType:'json',
                data:JSON.stringify({lastName:user.lastName}),
                success: function(data){
                    localStorage.setItem('user',JSON.stringify(user));
                    location.reload();
                }

            });
        });

        $("#logout").click(function(){
            localStorage.removeItem('user');
            location.reload();
        });




    } else {
        $('#accountinfo').hide();
        $('#main').tabs();

        $('#signup').click(function(){
            let valid = true;
            if($('#password').val() != $('#password2').val()){
                valid = false;
            }

            if($('#firstName').val() == '' || $('#lastName').val() == '' || $('#email').val() == '' || $('#password').val() == ''){
                valid = false;
            }

            if(!($('#email').val().includes('@')) || !($('#email').val().includes('.'))){
                valid = false;
            }

            if(valid){
                let data = {
                    firstName: $('#firstName').val(),
                    lastName: $('#lastName').val(),
                    email: $('#email').val(),
                    password: $('#password').val(),
                    friends:[],
                    completedTrips: [],
                }
                $.ajax({
                    type: 'POST',
                    url: '/users',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(data){
                        localStorage.user = JSON.stringify(data);
                        location.reload();
                        
                    }
                })
            } else {
                alert('New User Info is Invalid')
            }  
        });

        $('#login').click(function(){
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/users',
                success: function(data){
                    let found = false;
                    for(let i = 0; i<data.length; i++){
                        if(data[i].email == $('#lemail').val() && data[i].password == $('#lpassword').val()){
                            found = true;
                            localStorage.user = JSON.stringify(data[i]);
                            location.reload();
                        }
                    }
                    if(!found){
                        alert('User Not Found');
                    }
                }
            });
        });

        

    }
}


