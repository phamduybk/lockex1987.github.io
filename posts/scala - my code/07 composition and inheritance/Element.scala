import Element.elem

object Element {
  private class ArrayElement(
    val contents: Array[String]
  ) extends Element

  private class LineElement(
    s: String
  ) extends Element {
    val contents = Array(s)
    override def width = s.length
    override def height = 1
  }

  private class UniformElement(
    ch: Char,
    override val width: Int,
    override val height: Int
  ) extends Element {
    private val line = ch.toString * width
    def contents = Array.fill(height)(line)
  }

  def elem(contents: Array[String]): Element =
    new ArrayElement(contents)

  def elem(ch: Char, width: Int, height: Int): Element =
    new UniformElement(ch, width, height)

  def elem(line: String): Element =
    new LineElement(line)
}

abstract class Element {
  def contents: Array[String]

  def width: Int = contents(0).length

  def height: Int = contents.length

  def above(that: Element): Element = {
    val this1 = this widen that.width
    val that1 = that widen this.width
    elem(this1.contents ++ that1.contents)
  }

  def beside(that: Element): Element = {
    val this1 = this heighten that.height
    val that1 = that heighten this.height
    elem(
      for ((l1, l2) <- this1.contents zip that1.contents)
      yield l1 + l2
    )
  }

  def widen(w: Int): Element =
    if (w <= width)
      this
    else {
      val left = elem(' ', (w - width) / 2, height)
      val right = elem(' ', w - width - left.width, height)
      left beside this beside right
    }

  def heighten(h: Int): Element =
    if (h <= height)
      this
    else {
      val top = elem(' ', width, (h - height) / 2)
      val bot = elem(' ', width, h - height - top.height)
      top above this above bot
    }

  override def toString = contents mkString "\n"
}
