$(document).ready(function(){
    reset();

    // //Initialize Materialize Tabs
    $('#tabs-swipe-demo').tabs();
    //can make it swipeable by adding {swipeable: true},
    // but unable to see the entire section, i.e. the add form

    //Initialize Materialize Collapsible
    $('.collapsible').collapsible();

    //Initialize Materialize Textarea
    $('#textarea1').val('Description');

});

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "standup-6e708.firebaseapp.com",
    databaseURL: "https://standup-6e708.firebaseio.com",
    projectId: "standup-6e708",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

var haveDoneRef = firebase.database().ref('haveDones');
var workingOnRef = firebase.database().ref('workingOns');
var blockerRef = firebase.database().ref('blockers');

//Function called from the Add Have Done Button
$(".add-have-done").click(function() {
    submitForm();
    clearForm();
});

//Function called from the Add Working On Button
$(".add-working-on").click(function() {
    submitWorkingOnForm();
    clearWorkingOnForm();
});

//Function called from the Add Blocker Button
$(".add-blocker").click(function() {
    submitBlockerForm();
    clearBlockerForm();
});

//Click handler for the DeleteAll button
$('.delete-have-dones').click(function() {
    haveDoneRef.remove();
});

$('.delete-working-on').click(function() {
    workingOnRef.remove();
});

$('.delete-blocker').click(function() {
    blockerRef.remove();
});

//Function gets the Have Done field values and then sends data onward
function submitForm() {
    var title = $("#title").val();
    var description = $("#description").val();
    saveHaveDone(title, description);
}

//Function gets the Working On field values and then sends data onward
function submitWorkingOnForm() {
    var title = $("#working-on-title").val();
    var description = $("#working-on-description").val();
    saveWorkingOn(title, description);
}

//Function gets the Working On field values and then sends data onward
function submitBlockerForm() {
    var title = $("#blocker-title").val();
    var description = $("#blocker-description").val();
    saveBlocker(title, description);
}

//Function to push have done data to FB
function saveHaveDone(title, description) {
    var newHaveDoneRef = haveDoneRef.push();
    newHaveDoneRef.set({
        title: title,
        description: description
    });
}

//Function to push working on data to FB
function saveWorkingOn(title, description) {
    var newWorkingOnRef = workingOnRef.push();
    newWorkingOnRef.set({
        title: title,
        description: description
    });
}

//Function to push blocker data to FB
function saveBlocker(title, description) {
    var newBlockerRef = blockerRef.push();
    newBlockerRef.set({
        title: title,
        description: description
    });
}

//Get the Have Done data from Firebase and append to the DOM
haveDoneRef.on('value', function(snapshot) {
    reset();
    var $collapsibleUl = $('#have-done ul');

    snapshot.forEach(function (childNodes) {

        var $listItem = $('<li>');
        var $span = $('<span>');
        var $collapsibleHeader = $('<div>').addClass('collapsible-header');
        var $collapsibleBody = $('<div>').addClass('collapsible-body');
        $collapsibleHeader.text(childNodes.val().title);
        $span.text(childNodes.val().description);
        $span.appendTo($collapsibleBody);
        $listItem.append($collapsibleHeader,$collapsibleBody);
        $listItem.appendTo($collapsibleUl);
    });
});

//Get the Working On data from Firebase and append to the DOM
workingOnRef.on('value', function(snapshot) {
    $('#working-on ul').empty();
    var $collapsibleUl = $('#working-on ul');

    snapshot.forEach(function (childNodes) {

        var $listItem = $('<li>');
        var $span = $('<span>');
        var $collapsibleHeader = $('<div>').addClass('collapsible-header');
        var $collapsibleBody = $('<div>').addClass('collapsible-body');
        $collapsibleHeader.text(childNodes.val().title);
        $span.text(childNodes.val().description);
        $span.appendTo($collapsibleBody);
        $listItem.append($collapsibleHeader,$collapsibleBody);
        $listItem.appendTo($collapsibleUl);
    });
});

//Get the Blocker data from Firebase and append to the DOM
blockerRef.on('value', function(snapshot) {
    $('#blockers ul').empty();
    var $collapsibleUl = $('#blockers ul');

    snapshot.forEach(function (childNodes) {

        var $listItem = $('<li>');
        var $span = $('<span>');
        var $collapsibleHeader = $('<div>').addClass('collapsible-header');
        var $collapsibleBody = $('<div>').addClass('collapsible-body');
        $collapsibleHeader.text(childNodes.val().title);
        $span.text(childNodes.val().description);
        $span.appendTo($collapsibleBody);
        $listItem.append($collapsibleHeader,$collapsibleBody);
        $listItem.appendTo($collapsibleUl);
    });
});

//reset the page to nothing
function reset() {
    $('#have-done ul').empty();
}

//FORM Functions

//Have Done

//Hide and Show the Form for the Have Done
$(".show-have-done").click(function() {
    $("#have-done-form").removeClass('hide');
});

$(".hide-have-done").click(function() {
    clearForm();
    $("#have-done-form").addClass('hide');
});

//Working On

//Hide and Show the Form for the Working On
$(".show-working-on").click(function() {
    $("#working-on-form").removeClass('hide');
});

$(".hide-working-on").click(function() {
    clearWorkingOnForm();
    $("#working-on-form").addClass('hide');
});

//Blockers

//Hide and Show the Form for the Blockers
$(".show-blocker").click(function() {
    $("#blocker-form").removeClass('hide');
});

$(".hide-blocker").click(function() {
    clearBlockerForm();
    $("#blocker-form").addClass('hide');
});

//Clearing Fields

//Clear the form fields
function clearForm() {
    $("#title").val('');
    $("#description").val('');
}

//Clear the Working On Form
function clearWorkingOnForm() {
    $('#working-on-title').val('');
    $('#working-on-description').val('');
}

//Clear the Blocker Form
function clearBlockerForm() {
    $('#blocker-title').val('');
    $('#blocker-description').val('');
}
