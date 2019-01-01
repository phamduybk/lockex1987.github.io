/*
 * Copyright (C) 2010 Viettel Telecom. All rights reserved.
 * VIETTEL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package org.jasig.cas.adaptors.jdbc;

import java.util.ResourceBundle;

/**
 * @author HuyND6@Viettel.com.vn
 * @version 3.0
 */
public class ResourceBundleUtils {

    /**
     * ResourceBundle for read properties
     */
    private static ResourceBundle rb = null;

    /**
     * Constructor
     */
    private ResourceBundleUtils() {
    }

    /**
     * Get resource key
     * @param key a input key
     * @return value of a key
     */
    public static String getResource(String key) {
        if (rb == null) {
            rb = ResourceBundle.getBundle("Parameter");
        }
        if (rb != null) {
            return rb.getString(key);
        } else {
            return "";
        }
    }

    /**
     * Get resource key
     * @param bundle resource bundle
     * @param key a input key
     * @return value of a key
     */
    public static String getResource(String bundle, String key) {
        if (rb == null) {
            rb = ResourceBundle.getBundle(bundle);
        }
        if (rb != null) {
            return rb.getString(key);
        } else {
            return "";
        }
    }
}
