object NewInsertionSort {
  def sort(xs: List[Int]): List[Int] = xs match {
    case List() => List()
    case x :: tail => insert(x, sort(tail))
  }

  private def insert(x: Int, xs: List[Int]): List[Int] = xs match {
    case List() => List(x)
    case y :: tail => if (x <= y) x :: xs else y :: insert(x, tail)
  }
}
