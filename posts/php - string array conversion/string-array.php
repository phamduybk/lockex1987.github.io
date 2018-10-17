<?php
$arr = array('Hello', 'World!', 'Beautiful', 'Day!');
echo implode(" ",$arr) . "\n";
echo implode("+",$arr) . "\n";
echo implode("-",$arr) . "\n"; 
echo implode("X",$arr);

$str = 'one,two,three,four';

// default
print_r(explode(',', $str));

// zero limit
print_r(explode(',', $str, 0));
print "\n";

// positive limit
print_r(explode(',', $str, 2));
print "\n";

// negative limit 
print_r(explode(',', $str, -1));
