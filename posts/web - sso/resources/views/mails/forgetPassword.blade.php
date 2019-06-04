<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reputa Forget Password Email</title>

    <style>
		* {
			box-sizing: border-box;
		}
		body {
			/* background-color: #FAFAFA; */
		}
		.panel {
			/* background-color: #FFF; */
            /* width: 800px; border: 1px solid #5481DF; */
		}
		
		h1 {
			
		}
    </style>
</head>

<body style="
			font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
			color: #202020;
			font-size: 14px;">
    <div class="panel" style="
			margin: 20px auto;
			padding: 40px;
			text-align: center;">
		<header>
			<h1 style="font-size: 22px;
			font-weight: normal;
			margin-bottom: 50px;
			color: #485465;
			font-family: Helvetica;">
				YÊU CẦU THAY ĐỔI MẬT KHẨU HỆ THỐNG REPUTA
			</h1>
		</header>
		
		<main>
			<p>Chúng tôi đã nhận yêu cầu thay đổi mật khẩu với email này. Vui lòng sử dụng mã xác nhận bên dưới để xác nhận:</p>
			<p><strong>{{ $token }}</strong></p>
			<p>Nếu bạn không thực hiện yêu cầu trên, bạn vui lòng bỏ qua email này.</p>
			<p style="margin-top: 50px">
				Sản phẩm Reputa không bao giờ email cho bạn và yêu cầu bạn tiết lộ mật khẩu Reputa, Credit card, Tài khoản ngân hàng.
				Nếu bạn nhận được email nghi ngờ tiết lộ các thông tin trên, bạn vui lòng không nhấn vào bất kì đường link nào và báo cáo email bạn nhận được đến sản phẩm Reputa.
				Cám ơn bạn đã sử dụng sản phẩm Reputa.
			</p>
		</main>

        <footer>
			<div style="margin: 50px auto 20px; border-top: 1px solid #EDF1FA; max-width: 50%;">&nbsp;</div>
			<div style="color: #5481DF; font-size: 18px;">Ban quản trị Reputa cám ơn!</div>
		</footer>
    </div>
</body>
</html>