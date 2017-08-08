// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Assign the reference to the database to a variable named 'database'
  var config = {
    apiKey: "AIzaSyDo73e5gdET_Ahg0ZKhpJ0WuMu-nBST-oU",
    authDomain: "jonchr-6921e.firebaseapp.com",
    databaseURL: "https://jonchr-6921e.firebaseio.com",
    projectId: "jonchr-6921e",
    storageBucket: "jonchr-6921e.appspot.com",
    messagingSenderId: "964811301663"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the firebase database changes.
	
  // Initialize Firebase
database.ref().on("value", function(snapshot) {

	// If Firebase has a highPrice and highBidder stored (first case)
	if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

		// Set the local variables for highBidder equal to the stored values in firebase.
		highPrice = parseInt(snapshot.val().highPrice);
		highBidder = snapshot.val().highBidder;

		// change the HTML to reflect the newly updated local values (most recent information from firebase)
		$("#highest-bidder").html(highBidder);
		$("#highest-price").html(highPrice);

		// Print the local data to the console.
		console.log(highBidder + " bid " + highPrice + "(Firebase)");
			
	}
		// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
	else {
		console.log("doesn't exist");

		// Change the HTML to reflect the local value in firebase
		$("#highest-bidder").html(highBidder);
		$("#highest-price").html(highPrice);

		// Print the local data to the console.
		console.log(highBidder + " bid " + highPrice + "(local)");

	}
// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
	$("#submit-bid").on("click", function() {

		// prevent form from submitting with event.preventDefault() or returning false
		event.preventDefault();

		// Get the input values
		var Price = $("#bidder-price").val();
		var Bidder = $("#bidder-name").val().trim();

		// Log the Bidder and Price (Even if not the highest)
		console.log(Bidder + " bid " + Price);

		// If Then statements to compare against previous high bidder
		if(Price > highPrice) {

			// Alert that they are High Bidder
			alert("You are the highest bidder!");

			// Save the new price in Firebase
			database.ref().set({
		        highPrice: parseInt(Price),
		        highBidder: Bidder,
			});

			// Log the new High Price
			console.log(Bidder + " bid a new highest price of " + Price);

			// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
			highPrice = Price;
			highBidder = Bidder;

			// Change the HTML to reflect the new high price and bidder
			$("#highest-bidder").html(highBidder);
			$("#highest-price").html(highPrice);

		}
		// Else tell user their bid was too low via alert
		else {

			alert("Pony up the cash, son.")

		}

	});

});


