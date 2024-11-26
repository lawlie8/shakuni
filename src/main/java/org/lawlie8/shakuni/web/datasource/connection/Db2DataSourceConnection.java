package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;

import java.sql.Connection;
import java.sql.DriverManager;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public class Db2DataSourceConnection extends DataSourceConnectionService{
    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        Connection con = null;
        DriverManager dm = null;
        try {
            Class.forName(DB2_DRIVER_CLASS);
            con = dm.getConnection(generateUrl(dataSourceConnectionObject),
                    dataSourceConnectionObject.getPropertyValueMap().get(USERNAME),
                    dataSourceConnectionObject.getPropertyValueMap().get(PASSWORD));
            return con.isValid(60);
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    private String generateUrl(DataSourceConnectionObject dataSourceConnectionObject){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(Db2_JDBC_PREFIX)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(HOST))
                .append(COLON)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(PORT))
                .append(FORWARD_SLASH)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(DATABASE))
                .append(QUESTION_MARK)
                .append(dataSourceConnectionObject.getPropertyValueMap().get(ADDITIONAL_PROPERTIES));
        return stringBuilder.toString();
    }
}
