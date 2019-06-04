<?php

use Dingo\Api\Routing\Router;

$api = app(Router::class);

$api->version('v1', function (Router $api) {
    //$api->post('register', 'App\\Api\\V1\\Controllers\\RegisterController@register');
    $api->post('login', 'App\\Api\\V1\\Controllers\\LoginController@login');
    $api->post('logout', 'App\\Api\\V1\\Controllers\\LogoutController@logout');
    $api->post('refresh', 'App\\Api\\V1\\Controllers\\RefreshController@refresh');
    $api->get('user', 'App\\Api\\V1\\Controllers\\UserController@user');

    $api->post('change-password', 'App\\Api\\V1\\Controllers\\ChangePasswordController@changePassword');
    $api->post('forget-password', 'App\\Api\\V1\\Controllers\\ForgotPasswordController@forgetPassword');
    $api->post('reset-password', 'App\\Api\\V1\\Controllers\\ResetPasswordController@resetPassword');
});


