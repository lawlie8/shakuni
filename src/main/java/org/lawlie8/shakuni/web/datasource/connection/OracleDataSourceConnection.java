package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public class OracleDataSourceConnection extends DataSourceConnectionService{

    private static final Logger log = LoggerFactory.getLogger(OracleDataSourceConnection.class);


    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        Connection con = null;
        DriverManager dm = null;
        try {
            Class.forName(ORACLE_DRIVER_CLASS);
            con = dm.getConnection(generateUrl(dataSourceConnectionObject)
                    ,dataSourceConnectionObject.getPropertyValueMap().get(USERNAME)
                    ,dataSourceConnectionObject.getPropertyValueMap().get(PASSWORD));
            return con.isValid(60);
        } catch (Exception e) {
            log.error("Error Occurred While Checking Oracle Connection" + e);
        }
        return false;
    }

    private String generateUrl(DataSourceConnectionObject dataSourceConnectionObject) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(ORACLE_JDBC_PREFIX)
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(DRIVER_TYPE))
                .append(COLON)
                .append(AT_SIGN)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(HOST))
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(PORT))
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(SID));

                if (dataSourceConnectionObject.getPropertyValueMap().get(DATABASE) != null &&
                        !dataSourceConnectionObject.getPropertyValueMap().get(DATABASE).isEmpty()) {
                    stringBuilder.append(FORWARD_SLASH)
                            .append(dataSourceConnectionObject.getPropertyValueMap().get(DATABASE));
                }

                if (dataSourceConnectionObject.getPropertyValueMap().get(ADDITIONAL_PROPERTIES) != null) {
                    stringBuilder.append(QUESTION_MARK)
                            .append(dataSourceConnectionObject.getPropertyValueMap().get(ADDITIONAL_PROPERTIES));
                }
        log.debug("Jdbc String for Oracle is :" + stringBuilder);

        return stringBuilder.toString();
    }
}
