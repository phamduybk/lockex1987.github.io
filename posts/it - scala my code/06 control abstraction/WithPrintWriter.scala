import java.io.File
import java.io.PrintWriter
import java.util.Date

object WithPrintWriter extends App {
  withPrintWriter("date.txt") {
    writer => writer.println(new Date)
  }

  def withPrintWriter(file: String)(op: PrintWriter => Unit) {
    val writer = new PrintWriter(new File(file))
    try {
      op(writer)
    } finally {
      writer.close
    }
  }
}
