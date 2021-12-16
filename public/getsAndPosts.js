window.onload = function(){
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/users',
        success: function(data){
            html='';
            for(let i = data.length-1; i>=0; i--){
                html+='<div>'+
                '<h1>'+data[i].email+'</h1>'+
                '<h2>'+data[i].firstName+'</h2>'+
                '<h3>'+data[i].lastName+'<h3><br><br>'+
                '</div>';
            }
            $('#aa').html(html);
        }
    });

    $('#poster').click(function(){
        let data = {
            firstName: 'test',
            lastName: 'test',
            email: 'test',
            password: 'test',
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
                window.location.reload();
            }
        })
        
    })
}

