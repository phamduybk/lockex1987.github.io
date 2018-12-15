object Summer {

  def main(args: Array[String]) {
    for (s <- args)
      println(s + ": " + ChecksumAccumulator.calculate(s))
  }
}
