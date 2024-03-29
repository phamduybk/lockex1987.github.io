package excel.demo;

import com.jxcell.CellException;
import com.jxcell.CellFormat;
import com.jxcell.View;
import com.jxcell.designer.Designer;
import java.io.IOException;

public class FormulaTest {
	public static void demo() {
		try {
			View v = new View();
			int r = 0;

			// set column width,units equal to 1/256th of the character 0's width in the default font
			v.setColWidth(0, 10 * 256);
			v.setColWidth(1, 25 * 256);
			v.setColWidth(2, 25 * 256);
			v.setColWidth(4, 14 * 256);
			v.setColWidth(5, 14 * 256);

			v.setText(r, 1, "result");
			v.setText(r, 2, "formula");

			String f = "ABS(-1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ACOS(.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ACOSH(1.2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ADDRESS(5,5,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "AND(TRUE(), FALSE())";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "AREAS(B2:C3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ASIN(1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ASINH(5.3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ATAN(3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ATAN2(3, 6)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ATANH(.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "AVEDEV(1,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "AVERAGE(E2:E6)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "AVERAGEA(1,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BESSELI(3,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BESSELJ(2.5,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BESSELK(5,10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BESSELY(3,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BETADIST(0.5, 10, 1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BETAINV(0.5, 1, 1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BIN2DEC(10000000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BIN2HEX(111111)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BIN2OCT(1110100)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "BINOMDIST(6,10,0.5,FALSE)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CEILING(1.23459, .05)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CELL(\"width\",C4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CHAR(70)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CHIDIST(9.6,10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CHIINV(0.05,5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CHOOSE(2,\"Q1\", \"Q2\", \"Q3\", \"Q4\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CLEAN(\"Payments \" & CHAR(8) & \"Due\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CODE(\"A\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COLUMN(B3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COLUMNS(A1:D5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CONCATENATE (\"Sale \", \"Price\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CONFIDENCE(0.05, 2.5, 50)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COMPLEX(2,3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CONVERT(1,\"m\",\"yd\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CORREL({4,7,9},{1,2,3})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COS(5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COSH(2.10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUNT(5, 6, \"Q2\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUNTA(32, 45, \"Earnings\", \"\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUNTBLANK(A1:D2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUNTIF(C38:C40,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPDAYBS(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPDAYS(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPDAYSNC(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPNCD(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPNUM(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COUPPCD(DATE(93,1,25),DATE(94,8,31),2,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "COVAR({1,2,3,4,5},{2,4,6,8,10})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CRITBINOM(1000,0.5,0.3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CUMIPMT(0.009166667,60,17000,1,60,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "CUMPRINC(0.009166667,60,17000,1,34,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DATE(94, 6, 21)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DATEDIF(NOW(),DATE(2008,8,8),\"d\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DATEVALUE(\"3/6/05\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DAVERAGE(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DAY(34399)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DAYS360(\"1/11/06\", \"2/11/06\") ";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DB(10000, 1000, 7, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DCOUNT(D1:F5,\"Salary\",E6:E7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DCOUNTA(D1:F5,\"Employee\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DDB(10000,1000, 7, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DEC2BIN(256)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DEC2HEX(10,5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DEC2OCT(100)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DEGREES(6.283185307)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DELTA(6,7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DEVSQ(1, 2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DGET(D1:F5,\"Employee\",E6:E7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DISC(DATE(92,7,15),DATE(95,12,30),93,100)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DMAX(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DMIN(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DOLLAR(1023.789)"; // local currency
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DOLLARDE(25.3,4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DOLLARFR(25.25,4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DPRODUCT(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DSTDEV(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DSTDEVP(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "DSUM(D1:F5,\"Salary\",F6:F7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EDATE(DATE(2007,1,1),2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EFFECT(0.0675,12)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EOMONTH(DATE(2007,1,1),2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ERF(2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ERFC(1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ERROR.TYPE(B76)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EVEN(2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EXACT(\"Match\", \"Match\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EXP(2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "EXPONDIST(0.5,1,TRUE)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FACT(2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FACTDOUBLE(15)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FALSE()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FDIST(2, 3, 4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FIND(\"time\", \"There��s no time like the present\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FINV(0.05, 1, 4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FISHER (0.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FISHERINV(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FIXED(2000.5, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FLOOR(1.23459, .05)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FORECAST(0.5, {1, 2, 4, 6, 7, 9}, {0, 2, 4, 5, 7, 8})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FTEST({51,45,41,27},{91,37,89,82})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FV(5%,8,-500)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "FVSCHEDULE(1000,{0.2,0.21,0.22})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GAMMADIST (12, 3, 7, TRUE)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GAMMAINV (0.01, 8, 2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GAMMALN(5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GCD({1234567890,3000})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GEOMEAN(24, 6)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GESTEP(6,7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "GROWTH({4,6,8,9},,3.5,TRUE)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HARMEAN(5,4,25,60,14,26)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HEX2BIN(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HEX2DEC(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HEX2OCT(100)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HLOOKUP(\"Northeast\",B1:E5,3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HOUR(34259.4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "HYPERLINK(\"http://www.jxcell.net\",\"java spreadsheet component\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IF(A1>10, \"Greater\", \"Less\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMABS(\"3+4i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMAGINARY(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMARGUMENT(\"1+1i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMCONJUGATE(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMCOS(\"2+i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMDIV(\"-10+10i\",\"1+2i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMEXP(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMLN(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMLOG10(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMLOG2(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMPOWER(\"1+2i\",2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMPRODUCT(\"1+2i\",30)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMREAL(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMSIN(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMSQRT(\"2+3i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMSUB(\"2+3i\",\"3+4i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IMSUM(\"2+3i\",\"3+4i\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "INDEX(A2:B6,3,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "INDIRECT(B5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "INFO(\"release\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "INT(10.99)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IPMT(8%/12, 2, 48, 18000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "IRR(E2:E5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISBLANK(A1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISERR(A1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISERROR(1/0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISEVEN(9.8)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISLOGICAL(ISBLANK(A1))";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISNA(A1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISNONTEXT(A3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISNUMBER(123.45)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISODD(9.8)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISREF(A3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ISTEXT(\"2nd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LCM(15,20)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LEFT(\"2nd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LEN(\"3rd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LN(12.18)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOG(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOG10(260)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOGINV(0.223218,18,20)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOGNORMDIST(16,18,20)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOOKUP(\"Mike\", D2:D5, E2:E5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "LOWER(\"3rd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MATCH(7600, B2:B7,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MAX(50, 100, 150, 500, 200)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MAXA(50,100,150,\"500\",200)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MEDIAN(1,2,3,4,5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MID(\"Travel Expenses\", 8, 8)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MIN(50, 100, 150, 500, 200)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MINA(50,100,150,\"500\",200)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MINUTE(34506.4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MIRR(E2:E5, 12%, 8%)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MOD(-23,3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MODE(1,2,3,3,4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MONTH(34626)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "MROUND(13,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "N(A4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NA()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NETWORKDAYS(1,365)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NOT(TRUE())";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NOW()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NPER(12%/12,-350,-300,16000,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "NPV(8%,-12000,3000,3000,3000,7000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "OCT2BIN(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "OCT2DEC(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "OCT2HEX(10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ODD(3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "OFFSET(B1, 3, 2, 1, 1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "OR(1 + 1 = 1, 5 + 5 = 10)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PEARSON({2,5,8},{3,6,7})";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PERCENTILE({1,2,3,4,5}, .25)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PERCENTRANK ({1, 2, 3, 4, 5}, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PERMUT(4,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PI()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PMT(8%/12, 48, 18000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "POISSON(15,15,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "POWER(3,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PRICE(DATE(97,4,19),DATE(2001,11,25),0.05,0.075,100,4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PROPER(\"3rd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "PV(8%/12, 48, 439.43)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "QUOTIENT(9,7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RADIANS(-180)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RAND()*10";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RANDBETWEEN(15,47)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RATE(48,-439.43,18000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RECEIVED(DATE(94,1,1),DATE(97,10,1),50,0.0575)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "REPLACE(\"For the year: 1993\",18,1,\"4\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "REPT(\"error-\", 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "RIGHT(\"2nd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROMAN(499)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROUND(123.456, 2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROUNDDOWN(3.14159, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROUNDUP(76.9,0)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROW(B3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ROWS(A1:D5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SEARCH(\"?5\", \"Bin b45\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SECOND(.259)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SIGN(-123)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SIN(45)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SINH(1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SLN(10000, 1000, 7)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SQRT(9)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SQRTPI(2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "STANDARDIZE (95, 50, 4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "STDEV(4.0, 3.0, 3.0, 3.5, 2.5, 4.0, 3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "STDEVA(4.0, 3.0, 3.0, 3.5, 2.5, \"4.0\", 3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "STDEVP(4.0, 3.0, 3.0, 3.5, 2.5, 4.0, 3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "STDEVPA(4.0, 3.0, 3.0, 3.5, 2.5, \"4.0\", 3.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SUBTOTAL(1,E2:E5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SUM(1000, 2000, 3000)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SUMIF(A1:B2,\"=0\",A4:B5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SUMPRODUCT(E2:E3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SUMSQ(9, 10, 11)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "SYD(10000, 1000, 7, 3)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "T(\"Report\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TAN(0.645)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TANH(-2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TDIST(1.75,3,1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TEXT(123.62, \"0.000\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TIME(12, 26, 24)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TIMEVALUE(\"1:43:43 am\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TINV (0.01, 2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TODAY()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TRIM(\" Level 3, Gate 45 \")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TRUE()";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TRUNC(123.456, 2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "TYPE(A1)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "UPPER(\"3rd Quarter\")";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "USDOLLAR(1023.789)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VALUE(9800)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VAR(4.0, 3.0, 3.5, 2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VARA(4.0, 3.0, \"3.5\", 2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VARP(4.0, 3.0, 3.5, 2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VARPA(4.0, 3.0, \"3.5\", 2.5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VDB(10000, 1000, 7, 3, 4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "VLOOKUP(\"Jone\",D2:E5,2)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "WEEKDAY(34399.92)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "WEIBULL(100,3,120,TRUE)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "WORKDAY(DATEVALUE(\"2007/01/03\"),5)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "YEAR(34328)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "YEARFRAC(DATE(97,1,11),DATE(97,5,15))";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "YIELD(DATE(97,5,6),DATE(99,12,31),0.06,0.92,100,4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "YIELDDISC(DATE(94,10,23),DATE(95,7,7),98.31,100)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);
			f = "ZTEST ({1,2,3}, 4)";
			v.setFormula(++r, 1, f);
			v.setText(r, 2, f);

			// Sample data
			v.setText(0, 3, "Employee");
			v.setText(0, 4, "Income");
			v.setText(0, 5, "Salary");
			v.setText(1, 3, "Mike");
			v.setText(2, 3, "Jone");
			v.setText(3, 3, "Peter");
			v.setText(4, 3, "Johanson");
			v.setNumber(1, 4, 15000);
			v.setNumber(2, 4, 25000);
			v.setNumber(3, 4, -65000);
			v.setNumber(4, 4, 28000);
			v.setNumber(1, 5, 15000);
			v.setNumber(2, 5, 25000);
			v.setNumber(3, 5, 30000);
			v.setNumber(4, 5, 27000);
			v.setText(5, 4, "Income");
			v.setText(6, 4, "<0");
			v.setText(5, 5, "Income");
			v.setText(6, 5, ">0");
			v.setSelection(0, 4, 4, 5);
			CellFormat cfm = v.getCellFormat();
			cfm.setCustomFormat("$#,##0.00;[Red]$#,##0.00");
			v.setCellFormat(cfm);
			v.recalc();
			v.write("formula_test.xls");
			Designer.newDesigner(v);
		} catch (CellException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
