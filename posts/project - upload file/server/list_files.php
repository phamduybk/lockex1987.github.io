<?php
include 'config.php';

// Đọc các file trong thư mục và đẩy vào mảng
$files = scandir($rootFolder);
$result = [];
foreach ($files as $file) {
    // Bỏ qua thư mục hiện tại, thư mục cha
    if (!in_array($file, ['.', '..'])) {
        $absPath = $rootFolder . '/' . $file;
        array_push($result, [
            'name' => $file,
            'isDir' => is_dir($absPath),
            'size' => filesize($absPath) // bytes
        ]);
    }
}

// Trả về cho client
header('Content-type: application/json');
echo json_encode($result);
