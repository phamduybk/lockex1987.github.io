package com.viettel.tree.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class ActionLogKey {

	@Column(name = "id")
	UUID id;

	@Column(name = "user_id")
	UUID userId;

	@Column(name = "action_time")
	Date actionTime;
}
