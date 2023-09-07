document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  var element = document.getElementById('get_started');
  console.log(element)
  // element.addEventListener("click", function() {
  //       alert("Button clicked!");
  //     });
  var loginButton = document.getElementById('login');
  var signUpButton = document.getElementById('sign-up');
  console.log(loginButton,signUpButton)
  //loginButton.addEventListener("click", function() {
  // alert("Login button clicked!");
  //});

 // signUpButton.addEventListener("click", function() {
 //    alert("Sign Up button clicked!");

  var additionButton = document.getElementById('addition');
  var subtractionButton = document.getElementById('subtraction');
  var multiplicationButton = document.getElementById('multiplication');
  var divisionButton = document.getElementById('division');

  console.log(additionButton, subtractionButton, multiplicationButton, divisionButton);

  //additionButton.addEventListener("click", function() {
  //alert("addition button clicked!");
  //});

  subtractionButton.addEventListener("click", function() {
    alert("subtraction button clicked!");
  });

  multiplicationButton.addEventListener("click", function() {
    alert("multiplication button clicked!");
  });

  divisionButton.addEventListener("click", function() {
    alert("division button clicked!");
  });


  var easybutton = document.getElementById('easy');
  var mediumbutton = document.getElementById('medium');
  var hardbutton = document.getElementById('hard');
  var startbutton = document.getElementById('start');
  console.log(easybutton,mediumbutton ,hardbutton ,startbutton )
  easybutton.addEventListener("click", function() {
    alert("easy button clicked!");
  });

  mediumbutton.addEventListener("click", function() {
    alert("medium button clicked!");
  });
  hardbutton.addEventListener("click", function() {
    alert("hard button clicked!");
  });
  startbutton.addEventListener("click", function() {
    alert("start button clicked!");
  });

  var element =document.getElementById('Sign_Up');
  console.log(element)
  element.addEventListener("click", function() {
      alert("Button clicked!");
  });

    var saveprogressButton = document.getElementById('save progress');
    var resetprogressButton = document.getElementById('reset-progress');
    console.log(saveprogressButton,resetprogressButton)
    resetprogressButton.addEventListener('click', function() {
      // Display a confirmation prompt
      const confirmReset = confirm("Are you sure you want to reset the game progress?");
    
      // Check the user's response
      if (confirmReset) {
        // If the user confirms, reset the game progress (you can add your reset logic here)
        alert("Game progress has been reset.");
        // Add your reset logic here, such as resetting scores or game state
      } else {
        // If the user cancels, do nothing
        alert("Game progress was not reset.");
      }
    });


});





    