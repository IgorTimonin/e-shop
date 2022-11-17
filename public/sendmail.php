<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
// require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Настройки PHPMailer
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);
// $mail->isSMTP();

// $mail->SMTPAuth = true;
// $mail->SMTPDebug = 0;
 
// $mail->Host = 'ssl://smtp.gmail.com';
// $mail->Port = 465;
// $mail->Username = 'Логин';
// $mail->Password = 'Пароль';
 
// От кого
$mail->setFrom('mail@snipp.ru', 'Snipp.ru');		
 
// Кому
$mail->addAddress('funnyman@list.ru', 'Игорь');
 
// Тема письма
$mail->Subject = 'Новый заказ!';
 
// Тело письма
$body = '<p><strong>«Оформлен новый заказ» </strong></p>';
$mail->Body = $body;
 
// Приложение
// $mail->addAttachment(__DIR__ . '/image.jpg');
 

$mail->send();

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>