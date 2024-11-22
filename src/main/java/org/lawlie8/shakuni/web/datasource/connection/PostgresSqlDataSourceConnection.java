package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;

public class PostgresSqlDataSourceConnection extends DataSourceConnectionService{

    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        return true;
    }
}
