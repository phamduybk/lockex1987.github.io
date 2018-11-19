<?php
var_dump(5 ?: 0); // 5
var_dump(false ?: 0); // 0
var_dump(null ?: 'foo'); // 'foo'
var_dump(true ?: 123); // true
var_dump('rock' ?: 'roll'); // 'rock'
