package kundera.cassandra.example;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "question")
@Data
public class Question {

	@Id
	@Column(name = "question")
	String question;
	
	@Column(name = "user")
	String user;
}
