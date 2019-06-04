<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    public $timestamps = false;

    protected $table = 'sso_app';

    /**
     * Danh sách những người dùng mà ứng dụng được gán cho.
     */
    public function users()
    {
         return $this->belongsToMany('App\User', 'user_app', 'app_id', 'user_id');
    }
}
