/*
 * Copyright 2007 The JA-SIG Collaborative. All rights reserved. See license
 * distributed with this file and available online at
 * http://www.ja-sig.org/products/cas/overview/license/
 */
package org.jasig.cas.adaptors.jdbc;

import org.jasig.cas.authentication.handler.AuthenticationException;
import org.jasig.cas.authentication.principal.UsernamePasswordCredentials;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

/**
 * Class that given a table, username field and password field will query a database table with the provided encryption
 * technique to see if the user exists. This class defaults to a PasswordTranslator of PlainTextPasswordTranslator.
 *
 * @author Scott Battaglia
 * @author Dmitriy Kopylenko
 * @version $Revision$ $Date$
 * @since 3.0
 */
public class SearchModeSearchDatabaseAuthenticationHandler extends AbstractJdbcUsernamePasswordAuthenticationHandler implements InitializingBean {

    @Override
    protected final boolean authenticateUsernamePasswordInternal(final UsernamePasswordCredentials credentials) throws AuthenticationException {
        return true;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
    }
}
