Sửa xu-huong-mxh không qua passport

	Sửa resources/js/middleware/auth.js
		// Tự quản lý đăng nhập
		next({ name: 'login' })

		// Đăng nhập qua SSO
		//window.location = SSO_LOGIN;
		
	resources/js/components/elements/ProfileActions.vue
		// Chuyển đến trang login
		this.$router.push({name: 'login'})

		// Chuyển đến trang logout của SSO
		//window.location = SSO_LOGOUT;