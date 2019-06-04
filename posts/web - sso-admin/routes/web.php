<?php

// Nếu người dùng đã đăng nhập thì hiển thị trang home
// nếu không thì hiển thị trang đăng nhập
Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/users');
    } else {
        return redirect('/login');
    }
});

// Xác thực
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Quản lý người dùng
Route::group(['prefix' => '/users'], function () {
    Route::get('/', 'UserController@index');
    Route::get('/search', 'UserController@search');
    Route::post('/', 'UserController@save');
    Route::get('/{user}', 'UserController@find');
    Route::delete('/{user}', 'UserController@destroy');
});

// Cập nhật thông tin
Route::group(['prefix' => '/account'], function () {
    Route::get('/', 'AccountController@index');
    Route::post('/', 'AccountController@save');
});

// Quản lý ứng dụng
Route::group(['prefix' => '/apps'], function () {
    Route::get('/', 'AppController@index');
    Route::get('/list', 'AppController@list');
    Route::post('/', 'AppController@save');
    Route::get('/{app}', 'AppController@find');
    Route::delete('/{app}', 'AppController@destroy');
});
