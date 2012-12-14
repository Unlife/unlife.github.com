<?php
$xxx =$_POST["xxx"];
 
$name=$_POST["name"];
$email=$_POST["email"];
$mess=$_POST["mess"];
if (isset ($name))
{
$name = substr($name,0,20); //Не может быть более 20 символов
if (empty($name))
{
echo "<center><b>Не указано имя.<p>";
echo "<a href=../index.html#page20>Вернуться и правильно заполнить форму.</a>";
exit;
}
}
else
{
$name = "не указано";
}
if (isset ($email))
{
$email = substr($email,0,20); //Не может быть более 20 символов
if (empty($email))
{
echo "<center><b>Не указан e-mail.<p>";
echo "<a href=../index.html#page20>
Вернуться и правильно заполнить форму.</a>";
exit;
}
}
else
{
$email = "не указано";
}
if (isset ($mess))
{
$mess = substr($mess,0,500); //Не может быть более 500 символов
if (empty($mess))
{
echo "<center><b>Нет текста вопроса.<p>";
echo "<a href=../index.html#page20>
Вернуться и правильно заполнить форму.</a>";
exit;
}
}
else
{
$mess = "не указано";
}
$i = "не указано";
if ($name == $i AND $email == $i AND $mess == $i)
{
echo "Ошибка ! Скрипту не были переданы параметры !";
exit;
}
$to = "unlifered@gmail.com";  
$subject = "вопрос от посетителя сайта";
$message = "Имя:$name::::::::::Электронный адрес:$email::::::::::Сообщение:$mess:::::::::IP-адрес:$REMOTE_ADDR";
$headers= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
mail ($to,$subject,$message, $headers) or print "Не могу отправить письмо.";
echo "<center><b>Сообщение отправлено<br><a href=../index.html>Нажмите</a>, чтобы вернуться на Главную страницу сайта";
exit;
?>