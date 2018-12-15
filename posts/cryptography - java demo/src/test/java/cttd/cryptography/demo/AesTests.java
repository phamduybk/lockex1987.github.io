package cttd.cryptography.demo;

import org.junit.Test;
import static org.junit.Assert.*;

public class AesTests {

	private String plaintext = "stackjava.com";
	private String ciphertext = "kIw91555KOb0SAeYmoEdWA==";

	@Test
	public void encryptTest() {
		assertEquals(ciphertext, Aes.encrypt(plaintext));
	}

	@Test
	public void decryptTest() {
		assertEquals(plaintext, Aes.decrypt(ciphertext));
	}
}
