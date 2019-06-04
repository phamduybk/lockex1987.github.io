## SSO Admin

### Hướng dẫn cài đặt

Khởi tạo Composer

composer install

Khởi tạo CSDL

Chỉnh cấu hình CSDL ở file .evn

Import CSDL:

mysql -u [user_name] -p db_name < database/seeds/sso_backup.sql

Chạy

php artisan serve

Vào localhost:8000 để kiểm tra


