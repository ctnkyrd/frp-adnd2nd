// A $( document ).ready() block.
$(document).ready(function () {

    //read more and less
    readMoreAndLess();

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
        $('#section-content h2').text('');
        $('#comments-well').empty();
        $('#comment-form').remove();

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

    $('#pills-profile-tab').click(function(){
        
        var gameId = window.location.href.split('//')[1].split('/')[2].replace('?', '');
        $('#game-players div').remove();
        getPlayersOfTheGame(gameId);
    })

    function getPlayersOfTheGame(gameId){
        $.get('/games/'+gameId, function(data){
            $.each(data.players, function(k, v){
                $('#game-players').append(`
                <div class="col-sm-12 col-md-4 user-container">
	                <div class="card border-dark mb-3" style="max-width: 18rem;">
		                <div class="card-header">Header</div>
		                <div class="card-body text-dark">
                            <h5 class="card-title">${v.username}</h5>
                            <p class="text-truncate" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <form style="display:inline">
                                <a href="#" class="btn btn-dark btn-sm">Karakter Detayları</a>
                            </form>
                            <form class="user-delete-form" style="display:inline" action="/users/${v._id}" method="DELETE">
                                <button type="submit" class="btn btn-danger btn-sm">Sil</button>
                            </form>
                        </div>
                    </div>
                </div>
            `);
            });
        });
    }

    //post comment
    $(document).on('submit','#comment-form', function(e) {
        var sectionId = $('#section-select select').val();
        e.preventDefault();
        var commentItem = $(this).serialize();
        var actionUrl = $(this).attr('action');
        $.post(actionUrl, commentItem, function(v) {
            $('#comment-form textarea').val('');
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

    //delete user
    $(document).on('submit', '.user-delete-form', function(e) {
        e.preventDefault();
        var confirmResponse = confirm('Emin misiniz?');
        if(confirmResponse) {
            var actionUrl = $(this).attr('action');
            $itemToDelete = $(this).closest('.user-container');
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

    //read more and less
    function readMoreAndLess(){
        var showChar = 200;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Daha fazla";
    var lesstext = "Daha Az";
    

    $('.more').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

    }
    
});