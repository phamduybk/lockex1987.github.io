<?php
namespace Cttd\MySqlDemoPackage;

use mysqli;


/**

Bảng dữ liệu là:

CREATE TABLE MyGuests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
);

 */
class MySqlDemo
{	
	// Thông tin kết nối MySQL
	private $servername = 'localhost';
	private $username = 'root';
	private $password = '';
	private $dbname = "test";
	
	// Đốit tượng kết nối
	private $conn;
	
	public function openConnection()
	{
		// Tạo kết nối
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		
		// Kết nối thất bại thì dừng lại luôn
		if ($this->conn->connect_error) {
			die('Connection failed: ' . $this->conn->connect_error);
		}
		
		// Kết nối thành công
		echo "Connected successfully\n";
	}

	public function closeConnection()
	{
		// Đóng kết nối
		$this->conn->close();
	}
	
	public function testInsert()
	{
		// Thêm dữ liệu
		$sql = " INSERT INTO MyGuests (firstname, lastname, email)
				VALUES ('John', 'Doe', 'john@example.com') ";

		if ($this->conn->query($sql) === true) {
			echo "New record created successfully\n";
			
			// Lấy ID bản ghi được thêm
			$last_id = $conn->insert_id;
			echo "Last inserted ID is: " . $last_id . "\n";
		} else {
			echo "Error: " . $sql . ", " . $conn->error . "\n";
		}
		
		// Prepared Statement

		// prepare and bind
		$stmt = $this->conn->prepare("INSERT INTO MyGuests (firstname, lastname, email) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $firstname, $lastname, $email);

		// set parameters and execute
		$firstname = "John";
		$lastname = "Doe";
		$email = "john@example.com";
		$stmt->execute();

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
	
	public function testUpdate()
	{
		// Update
		$sql = " UPDATE MyGuests SET lastname = 'Huyen' WHERE id = 2 ";

		if ($this->conn->query($sql) === true) {
			echo "Record updated successfully\n";
		} else {
			echo "Error updating record: " . $this->conn->error . "\n";
		}
	}
	
	public function testSelectMultiRow()
	{
		// Select
		$sql = " SELECT id, firstname, lastname FROM MyGuests ";
		$stmt = $this->conn->prepare($sql);

		// execute query
		$stmt->execute();

		// instead of bind_result
		$result = $stmt->get_result();

		if ($result->num_rows > 0) {
			// output data of each row
			while ($row = $result->fetch_assoc()) {
				echo "ID: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "\n";
			}
		} else {
			echo "No result\n";
		}
		
		$stmt->close();
	}
	
	public function testDelete()
	{
		// Delete
		// sql to delete a record
		$sql = " DELETE FROM MyGuests WHERE id = 3 ";

		if ($this->conn->query($sql) === true) {
			echo "Record deleted successfully\n";
		} else {
			echo "Error deleting record: " . $this->conn->error . "\n";
		}
	}
}


// Kiểm tra
$demo = new MySqlDemo();
$demo->openConnection();

//$demo->testInsert();
//$demo->testUpdate();
$demo->testSelectMultiRow();
//$demo->testDelete();

$demo->closeConnection();
?>