<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $company = $_POST['company'];
		$message = $_POST['message'];
		$from = 'portfolio Contact Form'; 
		$to = 'ihdigitalgroup5@gmail.com'; 
		$subject = 'Message from Contact  ';
		
		$body = "From: $name\n E-Mail: $email\n Message:\n $message";

		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['phone']) {
			$errMessage = 'Please enter your phone number';
		}
		//Check if simple anti-bot test is correct
		if (!$_POST['company']) {
            $errMessage = 'Please enter your company name';
        }
        if (!$_POST['message']) {
            $errMessage = 'Please enter your message';
        }

// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage ) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! I will be in touch</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
	}
}
	}
?>