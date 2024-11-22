package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;

public abstract class DataSourceConnectionService implements DataSourceConnection{

    @Override
    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject) {
        return false;
    }

}
