// A $( document ).ready() block.
$(document).ready(function () {

    if($('#section-select select') != null){
        var sectionItem = $('#section-select select').val();
        var gameId = window.location.href.split('//')[1].split('/')[2].replace('?', '');
        getSectionDetails(sectionItem, gameId);
    }


    $('#section-select select').on('change', function(){
        var sectionItem = $(this).val();
        var gameId = window.location.href.split('//')[1].split('/')[2].replace('?', '');
        getSectionDetails(sectionItem, gameId);
    });

    function getSectionDetails(sectionId, gameId){
        debugger;
        $('#section-content h2').text('');
        $('#comments-well').empty();
        $('#comment-form').remove();

        // $('#section-content .section-comments').innerHTML = '';
        //make get request to induvidual section and get date/description and all user comments also show comment editor
        $.get('/games/'+gameId+'/sections/'+sectionId, function(data){
            $('#section-content h2').text(data.name + "-" + moment(data.startdate).locale("tr").format('LL'));
            $('#section-content .section-comments').append('<form id="comment-form" class="form-inline" action="/games/'+gameId+'/sections/'+sectionId+'/comments" method="POST"><span>Yorum Ekle</span><textarea class="form-control"  rows="3" name="comment[text]" placeholder="..."></textarea><button type="submit" class="btn btn-outline-secondary float-right" style="margin-top:10px;">Yorum Ekle</button></form>');
            
            $.each(data.comments, function(k, v) {
                /// do stuff
                $('#comments-well').append(
                    `<div class="comment-div">
                    <p class="user-comment">${v.text}</p>
                    <span style="margin-right:5px;"><span style="font-size:0.8em; color: #a9a4a4; margin-right:10px">${moment(v.created).locale("tr").format('LLLL')}</span><strong><i>${v.user.username}</i></strong></span>
                    <form class="form-inline comment-delete-form" action="/games/`+gameId+`/sections/`+sectionId+`/comments/${v._id}" method="DELETE"><button class="btn btn-danger btn-sm">Sil</button></form>
                    <hr align="right" style="width:60%;"></div>
                    `
                );
            });
            
        });
    }

    //post comment
    $(document).on('submit','#comment-form', function(e) {
        debugger;
        e.preventDefault();
        var commentItem = $(this).serialize();
        var actionUrl = $(this).attr('action');
        $.post(actionUrl, commentItem, function(data) {
            $('#comments-well').append(
                `
                <p class="user-comment">${data.text}</p>
                <span><strong><i>${data.user.username}</i></strong></span>
                `
            );
        });
    });

    //delete comment
    $(document).on('submit', '.comment-delete-form', function(e) {
        e.preventDefault();
        var confirmResponse = confirm('Emin misiniz?');
        if(confirmResponse) {
            var actionUrl = $(this).attr('action');
            $itemToDelete = $(this).closest('.comment-div');
            $.ajax({
                url: actionUrl,
                type: 'DELETE',
                itemToDelete: $itemToDelete,
                success: function(data) {
                    this.itemToDelete.remove();
                }
            })
        } else {
            $(this).find('button').blur();
        }
    });

   
});