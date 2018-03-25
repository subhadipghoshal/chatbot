$('button').on('click', function(){
    addMessage();
});

$(document).on('click', '.response-button', function(){
    var data = $(this).data('hook');
    addMessage(data);
});

$(document).on('keydown', function(evt){
    if (evt.keyCode == 13) {
      addMessage();
    }
})

function createMessage(val, side, responses, image) {
    responses = responses || false;
    image = image || false;
    var chatMsg = '<li class="chats-' + side + ' pre">';
    chatMsg += val;

    if (image){
      chatMsg += '<img src="'+image+'" class="response-image"/>';
    }

    if (responses){
        for (var i = 0; i < responses.length; i++){
            chatMsg += '<button class="response-button" data-hook="'+responses[i]+'">'+responses[i]+'</button>';
        }
    }

    chatMsg += '</li>';
    return chatMsg;
}

function clearPre() {
    setTimeout(function(){
        $('.pre').removeClass('pre');
    }, 0);
}

function scroll() {
    clearPre();
    $('.chats').stop().animate({
        scrollTop: $('.chats')[0].scrollHeight
    }, 500, function(){
    });
}

function addMessage(data) {
    data = data || false;
    var delay = 100;
    var val = $('input').val();
    if (!data){
    $('.chats').append(createMessage(val, 'right'));
    scroll();
    delay = 1000;
    data = "What do you feel like buying today?";
    }
    var data = {'content': val};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/response",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "89e54f0a-02d3-4c65-9c46-daab0d6039ab"
        },
        "processData": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        setTimeout(function(){
            $('.chats').append(
            createMessage(response,'left')
            );
          scroll();
        }, delay);
    });
    $('input').val('');
}

scroll();


var getBotResponse = function() {
    var chatInput = $('#chat-input').val();
    var data = {'content': chatInput};

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/response",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "89e54f0a-02d3-4c65-9c46-daab0d6039ab"
        },
        "processData": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};