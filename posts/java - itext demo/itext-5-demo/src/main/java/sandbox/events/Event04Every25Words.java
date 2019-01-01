package sandbox.events;

import java.io.FileOutputStream;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

class WordCounter extends PdfPageEventHelper {

	private int count = 0;

	@Override
	public void onGenericTag(PdfWriter writer, Document document, Rectangle rect, String text) {
		count++;
		if (count % 25 == 0) {
			PdfContentByte canvas = writer.getDirectContent();
			canvas.saveState();
			canvas.setLineDash(5, 5);
			canvas.moveTo(document.left(), rect.getBottom());
			canvas.lineTo(rect.getRight(), rect.getBottom());
			canvas.lineTo(rect.getRight(), rect.getTop());
			canvas.lineTo(document.right(), rect.getTop());
			canvas.stroke();
			canvas.restoreState();
		}
	}
}

public class Event04Every25Words {

	public static void main(String[] args) throws Exception {
		String output = "output/event_04_every_25_words.pdf";
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(output));

		writer.setPageEvent(new WordCounter());
		writer.setInitialLeading(16);
		document.open();

		String[] words = readFile().split("\\s+");
		Chunk chunk = null;
		for (String word : words) {
			if (chunk != null) {
				document.add(new Chunk(" "));
			}
			chunk = new Chunk(word);
			chunk.setGenericTag("");
			document.add(chunk);
		}
		document.close();
	}

	private static String readFile() throws Exception {
		return "1 Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur. 2 Hi omnes lingua, institutis, legibus inter se differunt. Gallos ab Aquitanis Garumna flumen, a Belgis Matrona et Sequana dividit. 3 Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque humanitate provinciae longissime absunt, minimeque ad eos mercatores saepe commeant atque ea quae ad effeminandos animos pertinent important, 4 proximique sunt Germanis, qui trans Rhenum incolunt, quibuscum continenter bellum gerunt. Qua de causa Helvetii quoque reliquos Gallos virtute praecedunt, quod fere cotidianis proeliis cum Germanis contendunt, cum aut suis finibus eos prohibent aut ipsi in eorum finibus bellum gerunt. 5 [Eorum una, pars, quam Gallos obtinere dictum est, initium capit a flumine Rhodano, continetur Garumna flumine, Oceano, finibus Belgarum, attingit etiam ab Sequanis et Helvetiis flumen Rhenum, vergit ad septentriones. 6 Belgae ab extremis Galliae finibus oriuntur, pertinent ad inferiorem partem fluminis Rheni, spectant in septentrionem et orientem solem. 7 Aquitania a Garumna flumine ad Pyrenaeos montes et eam partem Oceani quae est ad Hispaniam pertinet; spectat inter occasum solis et septentriones.]";
	}
}
