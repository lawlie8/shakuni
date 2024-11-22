package org.lawlie8.shakuni.web.datasource.connection;

import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;

public interface DataSourceConnection {

    public boolean checkConnection(DataSourceConnectionObject dataSourceConnectionObject);

}
