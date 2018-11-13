$(document).ready(function() {
    //Initialize Materialize Mobile Nav
    $(".button-collapse").sideNav({
        edge: 'right'
    });

    //Initialize Materialize Collapsible
    $('.collapsible').collapsible();

    $('ul.tabs').tabs();

    // //Initialize Materialize Tabs
    $('#tabs-swipe-demo').tabs();
    //can make it swipeable by adding {swipeable: true},
    // but unable to see the entire section, i.e. the add form

    // //Initialize Materialize Textarea
    // $('#textarea1').val('Description');
    // M.textareaAutoResize($('#description'));

    //Initialize Materialize Select Drop Down
    $('select').material_select();

});


