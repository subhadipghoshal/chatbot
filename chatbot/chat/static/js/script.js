$('button').on('click', function(){
    addMessage();
});

$(document).on('keydown', function(evt){
    if (evt.keyCode == 13) {
      addMessage();
    }
})

function createMessage(val, side) {
    var chatMsg = '<li class="chats-' + side + ' pre">';
    chatMsg += val;
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

function addMessage() {
    var val = $('input').val();
    $('.chats').append(createMessage(val, 'right'));
    scroll();
    var data = {
        'content': val
    };

    var request = {
        "async": true,
        "url": "/response",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
    }

    $.ajax(request).done(function (response) {
        console.log(response);
        $('.chats').append(
            createMessage(response,'left')
        );
        scroll();
    });
    $('input').val('');
}

scroll();