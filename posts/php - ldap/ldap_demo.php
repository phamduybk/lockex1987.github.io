<?php
namespace Cttd\Ldap;


class LdapAuthentication
{
	// Các thông tin cấu hình LDAP
	private $ldapHost = "10.30.152.20";
	private $adminUsername = 'datcom';
	private $adminPassword = 'Vtcc@2018';
	private $baseDn = "dc=cyberspace,dc=vn";

	/**
	 * Kiểm tra xem có thể đăng nhập qua LDAP hay không.
	 * @param $username Người dùng (tên người dùng ở máy)
	 * @param $password Mật khẩu
	 */
	public function login($username, $password)
	{
		// Kiểm tra xem có thể kết nối đến LDAP server hay không
		$connection = ldap_connect($this->ldapHost);
		if (! $connection) {
			echo "Khong ket noi duoc den server LDAP \n";
			return false;
		} else {
			// Cấu hình LDAP
			// Chú ý phải có cái này thì ldap_search mới chạy được
			ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
			ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

			// Đăng nhập LDAP với tài khoản admin
			$bindAdminResult = ldap_bind($connection, $this->adminUsername, $this->adminPassword);
			if (! $bindAdminResult) {
				echo "Dang nhap admin that bai \n";
				return false;
			} else {
				// Có thể thực hiện các thao tác ldap_add, ldap_list, ldap_search,... ở đây
				$filter = "(samaccountname=$username)";
				$fields = ["*"];
				$searchResult = ldap_search($connection, $this->baseDn, $filter, $fields);
				$info = ldap_get_entries($connection, $searchResult);
				//print_r($info);
				//var_dump($info);

				// Tên người dùng ở LDAP
				$ldapUsername = $info[0]["distinguishedname"][0];

				// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
				$bindUserResult = ldap_bind($connection, $ldapUsername, $password);
				if ($bindUserResult) {
					return true;
				} else {
					return false;
				}
			}

			// Đóng kết nối
			//ldap_close($connection);
		}
	}
}


// Kiểm tra
$ldap = new LdapAuthentication();
if ($ldap->login('huyennv9', 'SECRET')) {
	echo "Dang nhap thanh cong \n";
} else {
	echo "Dang nhap that bai \n";
}

?>