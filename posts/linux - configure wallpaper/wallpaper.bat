REG ADD "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d D:\project\mywallpaper\1.jpg /f
rundll32.exe user32.dll,UpdatePerUserSystemParameters
pause


