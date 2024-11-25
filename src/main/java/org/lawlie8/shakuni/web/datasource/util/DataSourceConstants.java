package org.lawlie8.shakuni.web.datasource.util;

public interface DataSourceConstants {
    Long MARIADB_DATASOURCE_ID = 1L;
    Long POSTGRES_DATASOURCE_ID = 2L;
    Long MYSQL_DATASOURCE_ID = 3L;

    String ORDINAL = "ordinal";
    String PROPERTY_NAME = "propertyName";
    String PROPERTY_LABEL = "propertyLabel";
    String EXAMPLE = "example";
    String DATA_TYPE = "dataType";
    String PAGE_TYPE = "pageType";
    String IS_REQUIRED = "isRequired";
    String IS_SENSITIVE = "isSensitive";
    String IS_ACTIVE = "isActive";
    String POSITION = "position";
    String PROPERTY_DESCRIPTION = "propertyDescription";

    String MARIADB_JDBC_PREFIX = "jdbc:mariadb://";
    String MARIADB_DRIVER_CLASS = "org.mariadb.jdbc.Driver";

    String MYSQL_DRIVER_CLASS = "com.mysql.cj.jdbc.Driver";
    String MYSQL_JDBC_PREFIX = "jdbc:mysql://";

    String POSTGRES_DRIVER_CLASS = "org.postgresql.Driver";
    String POSTGRES_JDBC_PREFIX = "jdbc:postgresql://";


    String HOST = "host";
    String COLON = ":";
    String PORT = "port";
    String FORWARD_SLASH = "/";
    String DATABASE = "database";
    String QUESTION_MARK = "?";
    String ADDITIONAL_PROPERTIES = "additionalProperties";
    String USERNAME = "userName";
    String PASSWORD = "password";
}
