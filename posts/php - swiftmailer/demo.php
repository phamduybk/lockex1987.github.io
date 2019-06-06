<?php
require_once 'vendor/autoload.php';

$host = 'smtp.gmail.com';
$port = 465;
$username = '@gmail.com';
$password = '';

$subject = 'Wonderful Subject';
$recipient = '@gmail.com';
$body = 'Here is the message itself';

// Create the Transport
// 
// Swift_SmtpTransport::newInstance($host, $port, 'ssl')
$transport = (new Swift_SmtpTransport($host, $port))
    ->setUsername($username)
    ->setPassword($password);

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);

// Create a message
$message = (new Swift_Message($subject))
    ->setTo([$recipient])
    ->setBody($body);

// Send the message
$result = $mailer->send($message);
