window.onload = function(){
    if('user' in localStorage){
        $('#trips').html("<a class='nav' href=trips.html>Trips</a>");
        $('#friends').html("<a class='nav' href=friends.html>Friends</a>");
    }

    let user = JSON.parse(localStorage.user);

    $("#addFriend").click(function(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/users',
            success: function(data){
                let found = false;
                for(let i = 0; i<data.length; i++){
                    if(data[i].email == $('#newFriendEmail').val()){
                        let nfr = {
                            firstName: data[i].firstName,
                            lastName: data[i].lastName,
                            email: data[i].email,
                        }
                        found = true;
                        user.friends.push(nfr);
                        $.ajax({
                            type:'PATCH',
                            url:'/users/'+user._id,
                            contentType:'application/json',
                            dataType:'json',
                            data:JSON.stringify({friends:user.friends}),
                            success: function(data){
                                localStorage.setItem('user',JSON.stringify(user));
                                location.reload();
                            }
            
                        });
                    
                    }
                }
                if(!found){
                    alert('User Not Found');
                }
            }
        });
    });

    if(user.friends.length != 0){
        html = "";
        for(let i = 0; i<user.friends.length; i++){
            html+="<div class='friend'>"+
                "<div class='friendInfo'>"+
                    "<h1>"+user.friends[i].firstName+ ' ' +user.friends[i].lastName+"</h1>"+
                    "<h2>"+user.friends[i].email+"</h2>"+
                "</div>"+
                "<button id='dropFriend-" + i + "'>Remove</button>"+
            "</div>";
        }
        $('#allfriends').html(html);

        $('.friend').each(function(index){
            $('#dropFriend-' + index).click(function() {
                user.friends.splice(index, 1);
                $.ajax({
                    type:'PATCH',
                    url:'/users/'+user._id,
                    contentType:'application/json',
                    dataType:'json',
                    data:JSON.stringify({friends:user.friends}),
                    success: function(data){
                        localStorage.setItem('user',JSON.stringify(user));
                        location.reload();
                    }
    
                });
            });
        })
    }
}