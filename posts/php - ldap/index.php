<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <title>Đăng nhập LDAP với PHP</title>
  </head>
  <body>
    <h3>Enable LDAP</h3>
    <p>Đầu tiên chúng ta phải enable LDAP extension.</p>
    <p>Sửa file <code>php.ini</code>, search theo từ khóa <strong>ldap</strong>,
      sau đó bỏ comment:</p>
    <pre>;extension=ldap</pre>
    <p>Rồi restart lại server (Apache, nginx,...).</p>
    <p>Bạn có thể kiểm tra xem LDAP đã hiệu lực hay chưa bằng lệnh <code>phpinfo()</code>.
      Nếu LDAP đã hiệu lực thì sẽ có vùng hiển thị LDAP.</p>
    <p>File demo</p>
    <p><a href="ldap_demo.php">ldap_demo.php</a></p>
    <h3>Sử dụng với Laravel</h3>
    <p>Thư viện là Adldap2-Laravel.</p>
    <p>Cài đặt:</p>
    <pre>composer require adldap2/adldap2-laravel</pre>
    <p>Publish:</p>
    <pre>php artisan vendor:publish --provider="Adldap\Laravel\AdldapServiceProvider"
php artisan vendor:publish --provider="Adldap\Laravel\AdldapAuthServiceProvider"</pre>
    <p>2 lệnh trên sẽ tạo 2 file:</p>
    <ul>
      <li>config/ldap.php</li>
      <li>config/ldap_auth.php</li>
    </ul>
    <p>Cấu hình LDAP ở file bằng cách sửa file <code>.env</code>, ví dụ:</p>
    <pre>LDAP_HOSTS=10.30.152.20
LDAP_USERNAME=datcom
LDAP_PASSWORD=Vtcc@2018
LDAP_BASE_DN=dc=cyberspace,dc=vn</pre>
    <p>Sửa file cấu hình <code>config/auth.php</code> để cấu hình qua LDAP chứ
      không phải qua Eloquent:</p>
    <pre>'providers' =&gt; [
    'users' =&gt; [
        'driver' =&gt; 'ldap', // was 'eloquent'
        'model'  =&gt; App\User::class
    ]
]</pre>
    <p>Cấu hình <code>config/ldap_auth.php</code> để khớp với các trường trong
      DB cũng như trên LDAP:</p>
    <pre>'ldap' =&gt; [
    'discover' =&gt; 'samaccountname',
    'authenticate' =&gt; 'distinguishedname',
],

'eloquent' =&gt; 'name',

'sync_attributes' =&gt; [
    'email' =&gt; 'userprincipalname',
    'name' =&gt; 'samaccountname',
    'display_name' =&gt; 'cn',
],</pre>
    <h3>Tham khảo</h3>
    <p><a target="_blank" href="http://php.net/manual/en/book.ldap.php">http://php.net/manual/en/book.ldap.php</a><br>
    </p>
    <p><a target="_blank" href="https://github.com/Adldap2/Adldap2-Laravel">https://github.com/Adldap2/Adldap2-Laravel</a></p>
    <p><br>
    </p>
    <p><br>
    </p>
    <p><br>
    </p>
  </body>
</html>
