<?php
$pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/';
$value = '123456aA@';
echo preg_match($pattern, $value) . "\n";