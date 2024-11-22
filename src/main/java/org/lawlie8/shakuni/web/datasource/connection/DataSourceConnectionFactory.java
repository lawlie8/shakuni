package org.lawlie8.shakuni.web.datasource.connection;

public class DataSourceConnectionFactory {

    public static DataSourceConnection getDataSource(Long id){
        if (id == 1L) {
            return new MariaDbDataSourceConnection();
        } else if (id==2L) {
            return new PostgresSqlDataSourceConnection();
        } else if (id==3L) {
            return new MysqlDataSourceConnection();
        }
        return null;
    }

}
