<?php

namespace App\Extensions;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Log;


class ExtendEloquentUserProvider extends EloquentUserProvider
{
    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  array $credentials
     * @return bool
     */
    public function validateCredentials(UserContract $user, array $credentials)
    {
        //Log::info($user);

        // Password do người dùng nhập
        $plain = $credentials['password'];

        // Password được hash trong DB
        $dbPasssword = $user->getAuthPassword();

        // Nếu mật khẩu được hash mặc định theo bcrypt
        if (empty($user->hash_algorithm)) {
            return $this->hasher->check($plain, $dbPasssword);
        }

        // Nếu mật khẩu được hash theo SHA1 cũ
        $salt = $user->salt;
        $hashedPass = sha1($plain . $salt);
        if ($hashedPass == $dbPasssword) {
            return true;
        }

        return false;
    }
}