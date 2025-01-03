package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public class MysqlDataSourceConnection extends DataSourceConnectionService {

    private static final Logger log = LoggerFactory.getLogger(MysqlDataSourceConnection.class);


    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        Connection con = null;
        DriverManager dm = null;
        try {
            Class.forName(MYSQL_DRIVER_CLASS);
            con = dm.getConnection(generateUrl(dataSourceConnectionObject),
                    dataSourceConnectionObject.getPropertyValueMap().get(USERNAME),
                    dataSourceConnectionObject.getPropertyValueMap().get(PASSWORD));
            return con.isValid(60);
        } catch (Exception e) {
            log.error("Error Occurred While Checking Db2 Connection" + e);
        }
        return false;
    }

    private String generateUrl(DataSourceConnectionObject dataSourceConnectionObject) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(MYSQL_JDBC_PREFIX)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(HOST))
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(PORT))
                .append(FORWARD_SLASH)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(DATABASE))
                .append(QUESTION_MARK)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(ADDITIONAL_PROPERTIES));
        log.debug("Jdbc String for Mysql is :" + stringBuilder);

        return stringBuilder.toString();
    }
}
