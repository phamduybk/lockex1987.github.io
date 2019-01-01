package com.viettel.tree.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;


@Entity
@Table(name = "huyen_test_counter", schema = "tree@cassandra_pu")
@Data
public class HuyenTestCounter {

    @Id
    @Column(name = "name")
    String name;
    
    @Column(name = "point")
    Long point;
}
