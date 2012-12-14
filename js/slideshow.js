$(document).ready(function()
{
$("#slides-top").cycle({
timeout : 5000,
pause : 1,
before : changeTitle
});
});


function changeTitle()
{
var title = $(this).find('img').attr('alt');
var href = $(this).attr('href');

$('#slide-title').text(title).attr('href', href);
}

 $(document).ready(function()
{
$("#slides-bottom").cycle({
timeout : 5100,
pause : 1,
before : changeTitle
});
});


function changeTitle()
{
var title = $(this).find('img').attr('alt');
var href = $(this).attr('href');

$('#slides-title').text(title).attr('href', href);
}