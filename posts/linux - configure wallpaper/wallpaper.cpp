#include <stdlib.h>
#include <stdio.h>

int main() {
	int num = 3; // so anh trong thu muc.
	char path[100] = "E:\\Project\\Mywallpaper\\"; // duong dan den thu muc chua anh
	int n; // so hieu
	// = rand() % num; // sinh ngau nhien mot so
	char command[100]; // xau chua lenh
	
	FILE* fi = fopen("wallpaper.txt", "r");
	char s[14];
	fgets(s, 14, fi);
	fclose(fi);
	
	n = atoi(s);
	//printf("%d\n", n);
	n = (n+1 >= num) ? 0 : (n+1);
	//printf("%d", n);
	char r[14];
	sprintf(r, "%d", n);
	FILE* fo = fopen("wallpaper.txt", "w");
	fputs(r, fo);
	fclose(fo);

	sprintf(command, "REG ADD \"HKCU\\Control Panel\\Desktop\" /v Wallpaper /t REG_SZ /d %s%d.bmp /f", path, n);
	system(command);
	system("rundll32.exe user32.dll,UpdatePerUserSystemParameters");
	
	//printf("%s", command);
	//getchar();

	return 0;
}
