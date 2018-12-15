object InsertionSort {
  def sort(xs: List[Int]): List[Int] =
    if (xs.isEmpty) Nil
    else insert(xs.head, sort(xs.tail))

  private def insert(x: Int, xs: List[Int]): List[Int] =
    if (xs.isEmpty || x <= xs.head) x :: xs
    else xs.head :: insert(x, xs.tail)
}
