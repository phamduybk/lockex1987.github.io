<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class FrontendController extends Controller {

    public function testSendMail() {
        Mail::send('mailfb',
            array(
                'name' => 'Nguyễn Văn Huyên',
                'email' => 'huyennv9@cyberspace.vn',
                'content' => 'Xin chào'
            ),
            function($message) {
                $message->to('huyennv9@cyberspace.vn')
                        ->subject('Test send mail');
            });
        return "OK";
    }
}
