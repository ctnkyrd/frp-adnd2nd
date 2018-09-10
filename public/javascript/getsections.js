// A $( document ).ready() block.
$(document).ready(function () {
    // $( "#pills-home-tab" ).click(function() {
    //     var gameId = window.location.href.split('//')[1].split('/')[2].replace('?', '');
    //     $.get('/games/'+gameId+'/sections', function (data) {
    //         debugger;
    //     });
    // });     

    $('#section-select select').on('change', function(){
        var sectionItem = $(this).val();
        var gameId = window.location.href.split('//')[1].split('/')[2].replace('?', '');
        $('#section-content h2').text('');
        //make get request to induvidual section and get date/description and all user comments also show comment editor
        $.get('/games/'+gameId+'/sections/'+sectionItem, function(data){
            $('#section-content h2').text(data.name + "-" + moment(data.startdate).locale("tr").format('LL'));
        });
    });
});