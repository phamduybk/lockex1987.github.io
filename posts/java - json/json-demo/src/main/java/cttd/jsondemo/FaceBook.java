/*
 * NVH.
 */
package cttd.jsondemo;

import java.util.List;

/**
 *
 * @author locke
 */
public class FaceBook {
	
	private String id;
	private String name;
	private String gender;
	private String username;
	private List<String> favoriteList;

	public List<String> getFavoriteList() {
		return favoriteList;
	}

	public void setFavoriteList(List<String> favoriteList) {
		this.favoriteList = favoriteList;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
