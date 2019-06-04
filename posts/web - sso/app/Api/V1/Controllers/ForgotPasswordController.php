<?php

namespace App\Api\V1\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use App\Api\V1\Requests\ForgotPasswordRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ForgotPasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('customThrottle:10,1,7');
    }

    public function forgetPassword(ForgotPasswordRequest $request)
    {
        // Send reset email
        $user = User::where('email', '=', $request->get('email'))->first();

        if (!$user) {
            return response()
                    ->json([
                        'status' => 'failed',
                        'message' => 'Failed'
                    ])
                    ->header('throttleIt', true);
        }

        $broker = $this->getPasswordBroker();
        $sendingResponse = $broker->sendResetLink($request->only('email'));

        if ($sendingResponse !== Password::RESET_LINK_SENT) {
            return response()
                    ->json([
                        'status' => 'failed',
                        'message' => 'Failed'
                    ])
                    ->header('throttleIt', true);
        }

        return response()
                ->json([
                    'status' => 'ok'
                ]);
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    private function getPasswordBroker()
    {
        return Password::broker();
    }
}
