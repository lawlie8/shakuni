package org.lawlie8.shakuni.security.config;

public interface SecurityConstants {

    String SECURED_API_PATTERN = "/app/**";
    String OPEN_API_PATTERN = "/web/**";
    String REMEMBER_ME_SECRET = "shakuni";
    String REMEMBER_ME_PARAMETER = "remember_me";
    String LOGIN_REQUEST_PAGE = "/web/security/logreq";
    String LOGIN_PROCESSING_URL = "/web/auth";
    String EMAIL_PARAMETER = "email";
    String PASSWORD_PARAMETER = "password";
    String LOGOUT_URL = "/web/logout";
    String COOKIE_PARAM = "JSESSIONID";

    Integer REMEMBER_ME_DURATION = 2419200;

}
