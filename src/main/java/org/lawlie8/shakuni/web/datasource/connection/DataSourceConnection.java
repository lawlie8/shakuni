package org.lawlie8.shakuni.web.datasource.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class DataSourceConnection {

    Map<Long,Connection> dataSourceConnectionMap = new HashMap<>();

    public Connection getConnectionById() throws SQLException {
        Connection con = null;
        return DriverManager.getConnection("",new Properties());
    }

}
