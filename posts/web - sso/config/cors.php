<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |

     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value.
     |
     */
    'supportsCredentials' => false, // true
    'allowedOrigins' => ['*'], // http://ttcd.cttd.tk
    'allowedHeaders' => ['*'], // 'authorization'
    'allowedMethods' => ['*'], // 'GET', 'POST', 'PUT', 'HEAD', 'OPTIONS', 'DELETE'
    'exposedHeaders' => [],
    'maxAge' => 0,
    'hosts' => [],
];
