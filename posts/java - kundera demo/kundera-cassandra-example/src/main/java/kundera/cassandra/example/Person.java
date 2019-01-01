package kundera.cassandra.example;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "person")
@Data
public class Person {

	@Id
	@Column(name = "person_id")
	private String personId;

	@Column(name = "person_name")
	private String personName;

	@Column(name = "age")
	private int age;
}
