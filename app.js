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

        var addedTrain = {
            name: name,
            destination: destination,
            frequency: frequency,
            time: time,
        }
        
    
if (!name || !destination || !time || !frequency) {
    alert("All fields are required");


}

else {
    $("#schedule-table").empty();
    $('#newName, #newDestination, #newTime, #newFrequency').val("");
    
    // console.log(addedTrain);
    database.ref().push(addedTrain);
}

    });
    setInterval(function(){ 
        $("#schedule-table").empty();
    database.ref().on("child_added", function (childSnapshot) {
        var trainData = childSnapshot.val();
        // console.log(trainData);
        var convertedTime = moment(trainData.time, "HH:mm").subtract(1,"years");
        var diffTime = moment().diff(moment(convertedTime), "minutes");
        var timeRemaining = diffTime % trainData.frequency;
        var minutesAway = trainData.frequency-timeRemaining;
        var nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format ("HH:mm");
        // Log everything that's coming out of snapshot
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().time);
        // console.log(childSnapshot.val().frequency);

        var x = $('<tr>');
        x.html(`
            <th scope="row">${trainData.name}</th>
            <td>${trainData.destination}</td>
            <td>${trainData.frequency}</td>
            <td>${nextArrival}</td>
            <td>${minutesAway}</td>
            `);
            
        $('#schedule-table').append(x);



        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}, 1000);
})