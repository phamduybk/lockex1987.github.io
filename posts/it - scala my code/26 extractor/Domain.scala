object Domain {
  def unapply(s: String): Option[Seq[String]] = Some(s.split("\\.").reverse)
}

object DomainTest extends App {
  val a = List("google.com", "vietnam.org", "acm.org", "java.sun.com", "cttd.net")
  a.foreach(
    s => s match {
      case Domain("org", "acm") => println("acm.org")
      case Domain("com", "sun", "java") => println("java.sun.com")
      case Domain("net", _*) => println("a .net domain")
    }
  )
}
