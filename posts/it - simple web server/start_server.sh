echo "Start server at port 8080"
# Dung php khong truy cap duoc tu may khac, dung Python thi duoc
# Nhung dung Python thi Ctrl+D khong duoc, phai kill process
#php -S localhost:8080
php -S 0.0.0.0:8080
#python -m SimpleHTTPServer 8080
