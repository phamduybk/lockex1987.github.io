package itext.demo;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.FileOutputStream;

public class Demo14Table {

	public static void main(String[] args) throws Exception {
		test1();
		test2();
		test3();
		test4();
		test5();
	}

	private static void test1() throws Exception {
		String output = "output/demo_14_table_1.pdf";
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream(output));
		document.open();

		PdfPTable table = new PdfPTable(3); // 3 columns
		table.setWidthPercentage(100); // Width 100%
		table.setSpacingBefore(10f); // Space before table
		table.setSpacingAfter(10f); // Space after table

		// Set Column widths
		float[] columnWidths = { 1f, 1f, 1f };
		table.setWidths(columnWidths);

		PdfPCell cell1 = new PdfPCell(new Paragraph("Cell 1"));
		PdfPCell cell2 = new PdfPCell(new Paragraph("Cell 2"));
		PdfPCell cell3 = new PdfPCell(new Paragraph("Cell 3"));

		PdfPCell cell4 = new PdfPCell(new Paragraph("Cell 4"));
		cell4.setColspan(2);
		PdfPCell cell5 = new PdfPCell(new Paragraph("Cell 5"));

		table.addCell(cell1);
		table.addCell(cell2);
		table.addCell(cell3);

		table.addCell(cell4);
		table.addCell(cell5);

		document.add(table);

		document.close();
	}

	// Chứa ảnh, kích thước ảnh
	private static void test2() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_14_table_2.pdf"));
		document.open();

		PdfPTable table = new PdfPTable(2);
		Image image = Image.getInstance("input/demo_14_jakob_jenkov.jpg");

		PdfPCell cell1 = new PdfPCell(new Paragraph("Cell 1"));
		PdfPCell cell2 = new PdfPCell(image, false); // the cell should fit the image
		PdfPCell cell3 = new PdfPCell(image, true); // image should fit the cell
		PdfPCell cell4 = new PdfPCell(new Paragraph("Cell 4"));

		table.addCell(cell1);
		table.addCell(cell2);
		table.addCell(cell3);
		table.addCell(cell4);

		document.add(table);
		document.close();
	}

	// Bảng lồng nhau
	private static void test3() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_14_table_3.pdf"));
		document.open();

		// Bảng con
		PdfPTable nestedTable = new PdfPTable(2);
		nestedTable.addCell(new Paragraph("Nested Cell 1"));
		nestedTable.addCell(new Paragraph("Nested Cell 2"));

		// Các ô của bảng to
		PdfPCell cell1 = new PdfPCell(new Paragraph("Cell 1"));
		PdfPCell cell2 = new PdfPCell(new Paragraph("Cell 2"));
		PdfPCell cell3 = new PdfPCell(new Paragraph("Cell 3"));

		// Ô thứ 3 chứa bảng con
		cell3.addElement(nestedTable);

		// Bảng to
		PdfPTable table = new PdfPTable(3);
		table.addCell(cell1);
		table.addCell(cell2);
		table.addCell(cell3);

		document.add(table);
		document.close();
	}

	// Căn nội dung của ô
	private static void test4() throws Exception {
		Document document = new Document();
		PdfWriter.getInstance(document, new FileOutputStream("output/demo_14_table_4.pdf"));
		document.open();

		PdfPTable table = new PdfPTable(3);

		// t.setBorderColor(BaseColor.GRAY);
		// t.setPadding(4);
		// t.setSpacing(4);
		// t.setBorderWidth(1);

		PdfPCell c1 = new PdfPCell(new Phrase("Table Header 1"));
		c1.setHorizontalAlignment(Element.ALIGN_LEFT);

		PdfPCell c2 = new PdfPCell(new Phrase("Table Header 2"));
		c2.setHorizontalAlignment(Element.ALIGN_CENTER);

		PdfPCell c3 = new PdfPCell(new Phrase("Table Header 3"));
		c3.setHorizontalAlignment(Element.ALIGN_RIGHT);

		table.addCell(c1);
		table.addCell(c2);
		table.addCell(c3);
		table.setHeaderRows(1);

		table.addCell("1.0");
		table.addCell("1.1");
		table.addCell("1.2");
		table.addCell("2.1");
		table.addCell("2.2");
		table.addCell("2.3");

		document.add(table);
		document.close();
	}

	// Fill cell
	private static void test5() throws Exception {
		Document document = new Document(PageSize.A4);
		PdfWriter writer = PdfWriter.getInstance(document,
				new FileOutputStream("output/demo_14_table_5_fill_cell.pdf"));
		document.open();

		PdfPTable table = new PdfPTable(1);

		PdfPCell cell = new PdfPCell(new Paragraph("0.25"));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setGrayFill(0.25f);
		table.addCell(cell);

		cell = new PdfPCell(new Paragraph("0.5"));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setGrayFill(0.5f);
		table.addCell(cell);

		cell = new PdfPCell(new Paragraph("0.75"));
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setGrayFill(0.75f);
		table.addCell(cell);

		document.add(table);

		document.close();
	}
}
