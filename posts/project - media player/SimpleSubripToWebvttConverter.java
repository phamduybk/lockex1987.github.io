import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;

public class SimpleSubripToWebvttConverter {

	private static final String TIME_FRAME = "(\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d) --> (\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d)";

	public void convert(String inputFilePath) {
		try {
			String outputFilePath = inputFilePath.replace(".srt", ".vtt");
			Reader reader = new InputStreamReader(new FileInputStream(inputFilePath), "UTF-8");
			BufferedReader fin = new BufferedReader(reader);
			Writer writer = new OutputStreamWriter(new FileOutputStream(outputFilePath), "UTF-8");
			BufferedWriter fout = new BufferedWriter(writer);

			// Write starting line for the WebVTT file
			fout.write("WEBVTT");
			fout.newLine();
			fout.newLine();

			String s;
			while ((s = fin.readLine()) != null) {
				// If the line is a time frame line, reformat and output the time frame
				if (s.matches(TIME_FRAME)) {
					s = s.replace(',', '.');
				}
				fout.write(s);
				fout.newLine();
			}
			fin.close();
			fout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		SimpleSubripToWebvttConverter obj = new SimpleSubripToWebvttConverter();
		String inputFilePath = args[0];
		obj.convert(inputFilePath);
	}
}