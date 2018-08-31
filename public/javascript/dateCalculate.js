var today = new Date()
// remember this is equivalent to 06 01 2010
//dates in js are counted from 0, so 05 is june

function calcDate(date1,date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);

    var message = "";

    message += days + " Gün " 
    //message += months + " Ay "
    //message += years + " Yıl \n"

    return message
    }


$('.time-diff').each(function(time){
    var date = new Date($(this).text()); 
    $(this).text(calcDate(today, date));
    $(this).removeClass('hidden');
});
    