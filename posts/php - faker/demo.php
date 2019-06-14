<?php
require_once 'vendor/autoload.php';

$faker = Faker\Factory::create();

echo $faker->name . "\n";
echo $faker->address . "\n";
echo $faker->text . "\n";

for ($i = 0; $i < 10; $i++) {
  echo $faker->name, "\n";
}


// unique() forces providers to return unique values
$values = array();
for ($i = 0; $i < 10; $i++) {
	// get a random digit, but always a new one, to avoid duplicates
	$values []= $faker->unique()->randomDigit;
}
print_r($values);


$faker = Faker\Factory::create('vi_VN');
for ($i = 0; $i < 10; $i++) {
	echo $faker->name, "\n";
}
