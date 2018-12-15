object Decimal extends App {
  val decimal = """(-)?(\d+)(\.\d*)?""".r
  val input = "for -1.0 to 99 by 3"
  for (s <- decimal findAllIn input) println(s)
  val decimal(s, i, d) = "-1.23"
  println("sign: " + s + ", integer: " + i + ", decimal: " + d)
}
