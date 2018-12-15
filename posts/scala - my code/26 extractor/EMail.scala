object EMail {
  // The injection method (optional)
  def apply(user: String, domain: String) = user + "@" + domain

  // The extraction method (mandatory)
  def unapply(str: String): Option[(String, String)] = {
    val parts = str split "@"
    if (parts.length == 2) Some(parts(0), parts(1)) else None
  }
}

object Twice {
  def unapply(s: String): Option[String] = {
    val length = s.length / 2
    val half = s.substring(0, length)
    if (half == s.substring(length)) Some(half) else None
  }
}

object UpperCase {
  def unapply(s: String): Boolean = s.toUpperCase == s
}

object EMailTest extends App {
  /*
  val a = List("huyennv1@viettel.com.vn", "lockex1987@gmail.com", "CTTD")
  a.foreach(
    s => s match {
	  case EMail(u, d) => println(u + " at " + d)
	  case _ => println(s""""$s" is not an email""")
    }
  )
  */

  def userTwiceUpperUpper(s: String) = s match {
    case EMail(Twice(x @ UpperCase()), domain) => println("match: " + x + " in domain " + domain)
    case _ => println("no match")
  }

  val b = List("XYZXYZ@cttd.vn", "lockex1987@gmail.com", "CTTD")
  b.foreach(userTwiceUpperUpper(_))
}
