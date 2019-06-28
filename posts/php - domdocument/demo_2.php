<?php
$url = 'sample_2.html';
$html = file_get_contents($url);

/*** Tạo một đối tượng DOM mới ***/ 
   $dom = new domDocument; 
   
   /*** Tải html vào trong đối tượng ***/ 
   $dom->loadHTML($html); 

   // The fix: mb_convert_encoding conversion
//$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
   
   /*** loại bỏ khoảng trắng ***/ 
   $dom->preserveWhiteSpace = false; 
   
   /*** lấy bảng theo tên thẻ ***/ 
   $tables = $dom->getElementsByTagName('table'); 
   
   /*** lấy tất cả các hàng từ bảng ***/ 
   $rows = $tables->item(0)->getElementsByTagName('tr'); 
   
   /*** lặp qua các hàng trong bảng ***/ 
   foreach ($rows as $row) 
   {
      /*** lấy cột theo tên thẻ ***/ 
      $cols = $row->getElementsByTagName('td'); 
      
      /*** Hiển thị giá trị ***/ 
      

      
       echo 'Designation: '.$cols->item(0)->nodeValue . "\n"; 
       echo 'Manager: '.$cols->item(1)->nodeValue . "\n"; 
       echo 'Team: '.$cols->item(2)->nodeValue . "\n"; 
       echo  "------------------\n\n";
   }