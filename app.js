//Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDVDNY6tIIFJtYILw_fIhrQ6GyHsepMx_c",
//     authDomain: "traintime-e5269.firebaseapp.com",
//     databaseURL: "https://traintime-e5269.firebaseio.com",
//     storageBucket: "traintime-e5269.appspot.com"
//   };

//   firebase.initializeApp(config);

//   var database = firebase.database();

$('#s').on("click", function (event) {

    event.preventDefault();

    var name = $('#newName').val().trim();
    var destination = $('#newDestination').val().trim();
    var time = $('#newTime').val().trim();
    var frequency = $('#newFrequency').val().trim();

    var addedTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    }
    console.log(addedTrain);
    database.ref().push(addedTrain);


    database.ref().on("child_added", function (childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().time);
        console.log(childSnapshot.val().frequency);

        var x = $('<tr>');
        x.html(`<th scope="row">${childSnapshot.val().name}</th><td>${childSnapshot.val().destination}</td><td>${childSnapshot.val().time}</td><td>months</td><td>${childSnapshot.val().frequency}</td><td>billHours</td>`);
        $('#schedule-table').append(x);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});