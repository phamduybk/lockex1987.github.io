object MultiTable extends App {
  println(multiTable())
  
  def makeRow(row: Int) = {
    val sequence =
      for (col <- 1 to 10) yield {
        val prod = (row * col).toString
        val padding = " " * (4 - prod.length)
        padding + prod
      }
    sequence.mkString
  }

  def multiTable() = {
    val tableSeq =
      for (row <- 1 to 10) yield makeRow(row)
    tableSeq.mkString("\n")
  }
}
