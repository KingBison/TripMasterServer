window.onload = function(){

    if('user' in localStorage){


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


