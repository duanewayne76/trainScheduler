$(document).ready(function () {


    //Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyDVDNY6tIIFJtYILw_fIhrQ6GyHsepMx_c",
    //     authDomain: "traintime-e5269.firebaseapp.com",
    //     databaseURL: "https://traintime-e5269.firebaseio.com",
    //     storageBucket: "traintime-e5269.appspot.com"
    //   };

    //   firebase.initializeApp(config);

    //   var database = firebase.database();


    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDVDNY6tIIFJtYILw_fIhrQ6GyHsepMx_c",
        authDomain: "traintime-e5269.firebaseapp.com",
        databaseURL: "https://traintime-e5269.firebaseio.com",
        projectId: "traintime-e5269",
        storageBucket: "traintime-e5269.appspot.com",
        messagingSenderId: "186117666666",
        appId: "1:186117666666:web:fbf9da78e3db5dae"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    $('#s').on("click", function (event) {

        event.preventDefault();

        // Add a Train
        var name = $('#newName').val().trim();
        var destination = $('#newDestination').val().trim();
        var time = $('#newTime').val().trim();
        var frequency = $('#newFrequency').val().trim();
        var minutesAway = moment().subtract(time).format ("hh:mm");
        var currentTime = moment();

        var addedTrain = {
            name: name,
            destination: destination,
            frequency: frequency,
            time: time,
            minutesAway: minutesAway

        }
        console.log(addedTrain);
        database.ref().push(addedTrain);
        console.log(currentTime);
        //var minutesAway = moment().subtract(time).format ("hh:mm");
        //var nextTrain = moment().add(frequency).format ("hh:mm");
        //console.log(minutesAway);



    });
    database.ref().on("child_added", function (childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().time);
        console.log(childSnapshot.val().frequency);

        var x = $('<tr>');
        x.html(`<th scope="row">${childSnapshot.val().name}</th><td>${childSnapshot.val().destination}</td><td>${childSnapshot.val().frequency}</td><td>${childSnapshot.val().time}</td><td>${childSnapshot.val().minutesAway}</td></td>`);
        $('#schedule-table').append(x);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})