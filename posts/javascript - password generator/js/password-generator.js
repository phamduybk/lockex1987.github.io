var chk_safe = document.getElementById("chk_safe");
var chk_upper = document.getElementById("chk_upper");
var chk_lower = document.getElementById("chk_lower");
var chk_digit = document.getElementById("chk_digit");
var chk_special = document.getElementById("chk_special");
var chk_require = document.getElementById("chk_require");
var txt_length = document.getElementById("txt_length");
var txt_count = document.getElementById("txt_count");
var btn_generate = document.getElementById("btn_generate");
var div_passwords = document.getElementById("div_passwords");

function preventNoCheckboxIsChecked() {
	if (!chk_upper.checked && !chk_lower.checked && !chk_digit.checked && !chk_special.checked) {
		chk_upper.checked = true;
		chk_lower.checked = true;
		chk_digit.checked = true;
		chk_special.checked = true;;
	}
	if (!txt_length.value) {
		txt_length.value = "8";
	}
	if (!txt_count.value) {
		txt_count.value = "5";
	}
}

function generatePasswords() {
	var isSafe = chk_safe.checked ? true : false;
	var isUpper = chk_upper.checked ? true : false;
	var isLower = chk_lower.checked ? true : false;
	var isDigit = chk_digit.checked ? true : false;
	var isSpecial = chk_special.checked ? true : false;
	var isRequire = chk_require.checked ? true : false;

	var length = txt_length.value ? parseInt(txt_length.value) : 8;
	if (length > 20) {
		length = 20; // capped at 20 chars max length
	}
	if (length < 4) {
		length = 4; // capped at 4 chars min length
	}
	var count = txt_count.value ? parseInt(txt_count.value) : 10;
	if (count > 99) {
		count = 99; // capped at 99 passwords max
	}
	if (count < 1) {
		count = 1; // capped at 1 password min
	}
	
	var str_upper = '';
	var str_lower = '';
	var str_digit = '';
	var str_special = '';
	
	// characters that will be used
	if (isUpper) {
		str_upper += "ABCDEFGHJKLMNPQRSTUVWXYZ";
		if (!isSafe) {
			str_upper += "IO";
		}
	}
	if (isLower) {
		str_lower += "abcdefghjkmnpqrstuvwxyz";
		if (!isSafe) {
			str_lower += "iol";
		}
	}
	if (isDigit) {
		str_digit += "23456789";
		if (!isSafe) {
			str_digit += "01";
		}
	}
	if (isSpecial) {
		//str_special += "~!@#$%^&*()_+[]\;',./~{}|:\"<>?";
		str_special += "~!@#$%^&*()_+[]\;,./~{}|:?";
	}
	var use_text = str_upper + str_lower + str_digit + str_special;
	
	// number of passwords to create
	var output = "";
	for (var x = 0; x < count; x++) {
		var password = '';
		// if requiring one of each type, preload the password with those. is randomized later with str_shuffle()
		if (isRequire) {
			if (isUpper) {
				password += str_upper.charAt( Math.floor(Math.random() * str_upper.length) );	
			}
			if (isLower) {
				password += str_lower.charAt( Math.floor(Math.random() * str_lower.length) );	
			}
			if (isDigit) {
				password += str_digit.charAt( Math.floor(Math.random() * str_digit.length) );
			}
			if (isSpecial) {
				password += str_special.charAt( Math.floor(Math.random() * str_special.length) );
			}
		}
		
		// length to make password (minus the characters already forced by require)
		for (var i = password.length; i < length; i++) {
			password += use_text.charAt( Math.floor(Math.random() * use_text.length) );
		}
		// shuffle the char order then print (with any special chars html safe)
		
		output += password + "\n";
	}
	
	div_passwords.innerHTML = output;
}

function escapeHtml(unsafe) {
	return unsafe
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#039;");
}

btn_generate.onclick = generatePasswords;
preventNoCheckboxIsChecked();
