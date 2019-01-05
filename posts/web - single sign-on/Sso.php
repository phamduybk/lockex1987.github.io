<?php

namespace App\Helpers;

use GuzzleHttp\Client;

class Sso {

    public static function getSsoLoginUrl() {
        $consumerDomain = config('services.sso.consumerDomain');
		$passportUrl = config('services.sso.passportUrl');
        $query = http_build_query(['app' => $consumerDomain]);
        return $passportUrl . '/login?' . $query;
    }

    public static function getSsoLogoutUrl() {
        $consumerDomain = config('services.sso.consumerDomain');
		$passportUrl = config('services.sso.passportUrl');
        $query = http_build_query(['app' => $consumerDomain]);
		return $passportUrl . '/logout-sso?' . $query;
    }

    public static function checkLoginCallback() {
        return Sso::checkSsoCode('/check-login-code');
    }

    public static function checkLogoutCallback() {
        return Sso::checkSsoCode('/check-logout-code');
    }

    private static function checkSsoCode($path) {
        $consumerDomain = config('services.sso.consumerDomain');
		$passportUrl = config('services.sso.passportUrl');

        $request = request();

        $code = $request->input('code');
		$http = new Client;

		$response = $http->post($passportUrl . $path, [
			'form_params' => [
				'app' => $consumerDomain,
				'client_secret' => 'DjYOrAeOU4WxGtxacPpnmj96Ne53r5JAaU5EeIeP',
				'code' => $code
			],
		]);

		$obj = json_decode((string) $response->getBody());

        return $obj;
    }
}