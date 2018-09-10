// A $( document ).ready() block.
$(document).ready(function () {

    if(!$('#section-select select') === null){
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
        //make get request to induvidual section and get date/description and all user comments also show comment editor
        $.get('/games/'+gameId+'/sections/'+sectionId, function(data){
            $('#section-content h2').text(data.name + "-" + moment(data.startdate).locale("tr").format('LL'));
        });
    }
});