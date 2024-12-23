package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public class HiveDataSourceConnection extends DataSourceConnectionService {

    private static final Logger log = LoggerFactory.getLogger(HiveDataSourceConnection.class);


    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        Connection con = null;
        DriverManager dm = null;
        try {
            Class.forName(HIVE_DRIVER_CLASS);
            con = dm.getConnection(generateUrl(dataSourceConnectionObject),
                    dataSourceConnectionObject.getPropertyValueMap().get(USERNAME),
                    dataSourceConnectionObject.getPropertyValueMap().get(PASSWORD));
            return con.isValid(60);
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    private String generateUrl(DataSourceConnectionObject dataSourceConnectionObject) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(HIVE_JDBC_PREFIX)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(HOST))
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(PORT))
                .append(FORWARD_SLASH)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(DATABASE))
                .append(QUESTION_MARK)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(ADDITIONAL_PROPERTIES));
        log.debug("Jdbc String for Hive is :" + stringBuilder);

        return stringBuilder.toString();
    }
}
