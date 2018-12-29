package download.service.album;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.eclipse.jetty.webapp.WebDescriptor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.google.common.io.Files;

import lombok.extern.slf4j.Slf4j;

/**
 * http://readcomiconline.com/
 */
@Slf4j
public class DownloadReadcomiconline extends BaseAlbumDownloader {

	public DownloadReadcomiconline(String url, int chapter) throws Exception {
		// Thêm tham số quality=hq để lấy chất lượng ảnh cao
		if (!url.contains("quality=hq")) {
			url += "&quality=hq";
		}

		this.url = url;
		this.chapter = chapter;
		this.chapterPrefix = true;

		this.extension = "jpg";

		super.process();
	}

	// @Override
	protected void getImageList_x() throws Exception {
		BufferedReader br = new BufferedReader(new FileReader("/data/new/readcomiconline.html"));
		String s;
		while ((s = br.readLine()) != null) {
			s = filterImage(s.trim());
			if (s != null) {
				list.add(s);
			}
		}
		br.close();
	}

	@Override
	protected void getImageList() throws Exception {
		WebDriver driver = new HtmlUnitDriver(BrowserVersion.FIREFOX_52, true);
		//WebDriver driver = new FirefoxDriver();
		driver.get(this.url);
		WebDriverWait wait = new WebDriverWait(driver, 25);
		/*
		wait.until(new ExpectedCondition<Boolean>() {

			@Override
			public Boolean apply(WebDriver d) {
				String title = d.getTitle();
				String notExpected = "Please wait 5 seconds...";
				boolean check = !notExpected.equals(title);
				log.info("Checking title <" + title + "> " + check);
				return check;
			}
		});
		String title = driver.getTitle();
		System.out.println("title: " + title);
		*/
		
		//wait.until(ExpectedConditions.not(ExpectedConditions.titleContains("Please wait 5 seconds...")));
		
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("divComments")));

		//wait.until(ExpectedConditions.presenceOfElementLocated(By.id("divComments")));
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("footer")));
		
		String source = driver.getPageSource();
		
		driver.close();
		//driver.quit();
		
		String[] a = source.split("\n");
		for (String s : a) {
			//System.out.println(s);
			s = filterImage(s.trim());
			if (s != null) {
				list.add(s);
			}
		}
	}

	@Override
	protected String filterImage(String s) {
		if (!s.startsWith("lstImages.push")) {
			return null;
		} else {
			int a = s.indexOf("\"");
			int b = s.lastIndexOf("\"");
			return s.substring(a + 1, b);
		}
	}
}
