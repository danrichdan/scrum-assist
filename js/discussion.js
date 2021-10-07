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


var discussionNeededRef = firebase.database().ref('discussionsNeeded');

$('.show-form-btn').hide();
addEventListeners();


//Function to add event listeners to elements
function addEventListeners() {
    $('#add-form .add-btn').click(function() {
        createDiscussionObject();
        clearFields();
    });
    $('.close-form').on('click', function() {
        closeFormButton();
    });
    $('.show-form-btn').on('click', function() {
        showFormButton();
    });
};

//Function to add form values to an object
function createDiscussionObject() {
    //select dropdown creates an array, participants
    var participants = $('#participants').val();
    var description = $('#discussion_description').val();
    var discussion = {
        participants: participants,
        description: description
    };
    saveDiscussion(discussion.participants, discussion.description);
};

discussionNeededRef.on('value', function(snapshot){
    reset();
    snapshot.forEach(function (childNodes){
        //create DOM elements
        var key = childNodes
        var $li = $('<li>').addClass('collection-item');
        var $spanParticipants = $('<span>').addClass('disc-particpants');
        var $spanDescription = $('<span>').addClass('disc-description');
        var $buttonContainer = $('<span>').addClass('btn-container');
        var $deleteBtn = $('<i>').addClass('material-icons close');
        $spanParticipants.text(childNodes.val().participants.join(', '));
        $spanDescription.text(childNodes.val().discussion);
        $deleteBtn.text('delete');
        $buttonContainer.append($deleteBtn);
        $li.append($spanParticipants, $spanDescription, $buttonContainer);
        appendListToDOM($li);
    });
});

//Function to append the list to the DOM
function appendListToDOM($li) {
    var $ul = $('ul.collection');
    $li.appendTo($ul);
    deleteListItem();
};

//Function to clear the form fields
function clearFields() {
    var select = $('select');
    var textarea = $('textarea');
    textarea.val('');
    select.prop('selectedIndex', 0); //Sets the first option as selected
    select.material_select();
};

//Function to delete a list item/ delete button click handler
function deleteListItem(fbDatabase) {
    $('.close').on('click', function() {
        var key = $(this).data('key');
        console.log(key);
        // var self = $(this);
        // self = self.parent();
        // self = self.parent();
    //     self.remove();
        discussionNeededRef.remove();
    });
};

// function to hide the form and display the show form button
function closeFormButton() {
    clearFields();
    $('#add-section').hide();
    $('.show-form-btn').show();
};

//Function to show the form and hide the show form button
function showFormButton() {
    $('#add-section').show();
    $('.show-form-btn').hide();
};

//Function to push discussions needed data to FB
function saveDiscussion(participants, discussion) {
    console.log('in the save discussion function');
    var newDiscussionNeededRef = discussionNeededRef.push();
    newDiscussionNeededRef.set({
        participants: participants,
        discussion: discussion
    });
}

function reset() {
    $('ul.collection').empty();
}
