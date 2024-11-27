package org.lawlie8.shakuni.web.datasource.util;

public interface DataSourceConstants {
    Long MARIADB_DATASOURCE_ID = 1L;
    Long POSTGRES_DATASOURCE_ID = 2L;
    Long MYSQL_DATASOURCE_ID = 3L;
    Long HIVE_DATASOURCE_ID = 4L;
    Long DB2_DATASOURCE_ID = 5L;
    Long ORACLE_DATASOURCE_ID = 6L;



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

    String HIVE_DRIVER_CLASS = "org.apache.hive.jdbc.HiveDriver";
    String HIVE_JDBC_PREFIX = "jdbc:hive2://";

    String DB2_DRIVER_CLASS = "com.ibm.db2.jcc.DB2Driver";
    String Db2_JDBC_PREFIX = "jdbc:db2://";

    String ORACLE_DRIVER_CLASS = "oracle.jdbc.driver.OracleDriver";
    String ORACLE_JDBC_PREFIX = "jdbc:oracle";


    String HOST = "host";
    String COLON = ":";
    String PORT = "port";
    String FORWARD_SLASH = "/";
    String DATABASE = "database";
    String QUESTION_MARK = "?";
    String ADDITIONAL_PROPERTIES = "additionalProperties";
    String USERNAME = "userName";
    String PASSWORD = "password";
    String DRIVER_TYPE = "driverType";
    String AT_SIGN = "@";
    String SID = "sid";

}
