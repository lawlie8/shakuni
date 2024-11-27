package org.lawlie8.shakuni.web.datasource.connection;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public class DataSourceConnectionFactory {

    public static DataSourceConnection getDataSource(Long id) {
        if (id == MARIADB_DATASOURCE_ID) {
            return new MariaDbDataSourceConnection();
        } else if (id == POSTGRES_DATASOURCE_ID) {
            return new PostgresSqlDataSourceConnection();
        } else if (id == MYSQL_DATASOURCE_ID) {
            return new MysqlDataSourceConnection();
        } else if (id == HIVE_DATASOURCE_ID) {
            return new HiveDataSourceConnection();
        } else if (id == DB2_DATASOURCE_ID) {
            return new Db2DataSourceConnection();
        } else if (id == ORACLE_DATASOURCE_ID) {
            return new OracleDataSourceConnection();
        }
        return null;
    }

}
