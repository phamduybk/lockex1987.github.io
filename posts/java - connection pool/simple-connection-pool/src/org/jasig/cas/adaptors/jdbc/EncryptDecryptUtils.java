/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jasig.cas.adaptors.jdbc;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *
 * @author huynd
 */
public class EncryptDecryptUtils {

    /** Logger.*/
    private static final Log logger = LogFactory.getLog(EncryptDecryptUtils.class);
    private static byte[] key = {-95, -29, -62, 25, 25, -83, -18, -85};
    private static String algorithm = "DES";
    private static SecretKeySpec keySpec = new SecretKeySpec(key, algorithm);

    public EncryptDecryptUtils() {
        keySpec = new SecretKeySpec(key, algorithm);
    }

    public static byte[] encrypt(byte[] arrByte) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(1, keySpec);
        byte[] data = cipher.doFinal(arrByte);

        return data;
    }

    public static byte[] decrypt(byte[] arrByte) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(2, keySpec);
        return cipher.doFinal(arrByte);
    }

    public static void encryptFile(String originalFilePath, String encryptedFilePath) {
        try {
            FileInputStream stream = new FileInputStream(originalFilePath);
            OutputStream out = new FileOutputStream(encryptedFilePath);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
                int i;
                byte[] cloneBuffer = new byte[bytesRead];
                if (bytesRead < buffer.length) {
                    for (i = 0; i < bytesRead; ++i) {
                        cloneBuffer[i] = buffer[i];
                    }
                }
                out.write(encrypt(cloneBuffer));
            }

            stream.close();
            out.close();
        } catch (FileNotFoundException fex) {
            logger.error(fex, fex);
        } catch (IOException iex) {
            logger.error(iex, iex);
        } catch (Exception ex) {
            logger.error(ex, ex);
        }
    }

    public static String decryptFile(String encryptedFilePath) {
        StringBuilder sb = new StringBuilder();
        try {
            FileInputStream stream = new FileInputStream(encryptedFilePath);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];

            while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
                int i;
                byte[] cloneBuffer = new byte[bytesRead];
                if (bytesRead < buffer.length) {
                    for (i = 0; i < bytesRead; ++i) {
                        cloneBuffer[i] = buffer[i];
                    }
                }
                sb.append(new String(decrypt(cloneBuffer)));
            }

            stream.close();
        } catch (FileNotFoundException fex) {
            logger.error(fex, fex);
        } catch (IOException iex) {
            logger.error(iex, iex);
        } catch (Exception ex) {
            logger.error(ex, ex);
        }
        return sb.toString();
    }
}
