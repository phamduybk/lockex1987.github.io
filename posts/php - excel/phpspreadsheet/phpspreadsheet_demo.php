<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

function simpleDemo()
{
    $spreadsheet = new Spreadsheet();

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Hello World !');
    
    $writer = new Xlsx($spreadsheet);
    $writer->save('demo_1.xlsx');
}

function readExistingFile()
{
    $filePath = 'demo_1.xlsx';
    $spreadsheet = IOFactory::load($filePath);

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('B2', 'Updated');

    $writer = new Xlsx($spreadsheet);
    $writer->save('demo_2.xlsx');
}

simpleDemo();
readExistingFile();

/*
Nếu như các bạn muốn xuất ra cửa sổ download thì chỉ cần sửa dòng cuối cùng thành:

header('Content-type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="data.xls"');
PHPExcel_IOFactory::createWriter($excel, 'Excel2007')->save('php://output');
*/