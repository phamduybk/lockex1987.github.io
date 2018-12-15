object StripMargin extends App {
  val s1 = """Welcome to Ultamix 3000.
  Type "HELP" for help."""
  println(s1)
  println("---------------------------")
  val s2 = """Welcome to Ultamix 3000.
  |Type "HELP" for help.""".stripMargin
  println(s2)
}
