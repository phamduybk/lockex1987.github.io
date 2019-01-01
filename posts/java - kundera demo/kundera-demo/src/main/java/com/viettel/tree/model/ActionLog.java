package com.viettel.tree.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "action_log", schema = "tree@cassandra_pu")
@Data
public class ActionLog {

	@EmbeddedId
	ActionLogKey key;

	@Column(name = "type")
	String type;

	@Column(name = "description")
	String description;

	@Column(name = "show_to_user")
	Integer showToUser;

	@Column(name = "doc_id")
	UUID docId;
}
