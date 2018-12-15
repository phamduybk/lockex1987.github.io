object FallWinterSpringSummer extends App {
  for (season <- List("fall", "winter", "spring", "summer"))
    println(season + ": " + ChecksumAccumulator.calculate(season))
}
