import akka.actor.{Actor, ActorSystem, Props}

/*
class HelloActor extends Actor {
  def receive = {
    case "hello" => println("hello back at you")
    case _ => println("huh?")
  }
}
*/
class HelloActor(name: String) extends Actor {
  def receive = {
    case "hello" => println(s"hello from $name")
    case _ => println(s"'huh?', said $name")
  }
}

object HelloActor extends App {
  // An actor needs an ActorSystem
  val system = ActorSystem("HelloSystem")
  
  // Create and start the actor
  // An actor with a no-args constructor
  //val helloActor = system.actorOf(Props[HelloActor], name = "helloactor")
  // An actor whose constructor takes one argument
  val helloActor = system.actorOf(Props(new HelloActor("CTTD")), name = "helloactor")
  
  // Send the actor two messages
  helloActor ! "hello"
  helloActor ! "buenos dias"
  
  // Shut down the system
  system.shutdown
}
