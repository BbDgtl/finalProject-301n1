$('.portrait').on('click', function () {
    $('.portrait').not(this).toggle("drop");
    $('.content').toggle("drop");

    var $parentDiv = $(this).parent('div');

    if ($parentDiv.is('#player2-col')) {
        $parentDiv.toggleClass("move-player2");
    } else if ($parentDiv.is('#player3-col')) {
        $parentDiv.toggleClass("move-player3");

    } else if ($parentDiv.is('#player4-col')) {
        $parentDiv.toggleClass("move-player4");

    } else if ($parentDiv.is('#player5-col')) {
        $parentDiv.toggleClass("move-player5");
    }

    $('.content').html($parentDiv.find('[id^="content"]').html());
});
