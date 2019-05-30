<?php
namespace Cttd\MySqlDemoPackage;

use mysqli;


/**

Bảng dữ liệu là:

CREATE TABLE my_guests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
);

*/
class MySqlDemo
{	
	// Đối tượng kết nối
	private $conn;
	
	/**
	 * Mở kết nối.
	 */
	public function openConnection($servername, $username, $password, $dbname)
	{
		$this->conn = new mysqli($servername, $username, $password, $dbname);
		if ($this->conn->connect_error) {
			die('Connection failed: ' . $this->conn->connect_error);
		}
		echo "Connected successfully\n";
	}

	/**
	 * Đóng kết nối.
	 */
	public function closeConnection()
	{
		$this->conn->close();
	}
	
	/**
	 * Kiểm tra việc INSERT dữ liệu.
	 */
	public function testInsert()
	{
		// Thêm dữ liệu
		$sql = " INSERT INTO my_guests (firstname, lastname, email)
				VALUES ('John', 'Doe', 'john@example.com') ";

		if ($this->conn->query($sql) === true) {
			echo "New record created successfully\n";

			// Lấy ID bản ghi được thêm
			$last_id = $this->conn->insert_id;
			echo "Last inserted ID is: " . $last_id . "\n";
		} else {
			echo "Error: " . $sql . ", " . $conn->error . "\n";
		}
		
		// Prepared Statement

		// Prepare and bind
		$stmt = $this->conn->prepare("INSERT INTO my_guests (firstname, lastname, email) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $firstname, $lastname, $email);

		// Set parameters and execute
		$firstname = "Mary";
		$lastname = "Moe";
		$email = "mary@example.com";
		$stmt->execute();

		$firstname = "Julie";
		$lastname = "Dooley";
		$email = "julie@example.com";
		$stmt->execute();

		echo "New records created successfully\n";

		$stmt->close();
	}
	
	/**
	 * Kiểm tra việc cập nhật dữ liệu.
	 */
	public function testUpdate()
	{
		$sql = " UPDATE my_guests SET firstname = 'Huyen' WHERE firstname = 'John' ";
		if ($this->conn->query($sql) === true) {
			echo "Record updated successfully\n";
		} else {
			echo "Error updating record: " . $this->conn->error . "\n";
		}
	}
	
	/**
	 * Kiểm tra việc SELECT dữ liệu.
	 */
	public function testSelect()
	{
		$sql = " SELECT id, firstname, lastname FROM my_guests ";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				echo "ID: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "\n";
			}
		} else {
			echo "No result\n";
		}
		$stmt->close();
	}
	
	/**
	 * Kiểm tra việc xóa dữ liệu.
	 */
	public function testDelete()
	{
		$sql = " DELETE FROM my_guests WHERE firstname = 'Mary' ";
		if ($this->conn->query($sql) === true) {
			echo "Record deleted successfully\n";
		} else {
			echo "Error deleting record: " . $this->conn->error . "\n";
		}
	}
}

function demo()
{
	// Thông tin kết nối MySQL
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = "test";

	// Kiểm tra
	$demo = new MySqlDemo();
	$demo->openConnection($servername, $username, $password, $dbname);

	//$demo->testInsert();
	//$demo->testUpdate();
	$demo->testSelect();
	//$demo->testDelete();

	$demo->closeConnection();
}

demo();
