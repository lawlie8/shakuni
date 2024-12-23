package org.lawlie8.shakuni.web.datasource.util;

import java.util.*;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.*;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.ADDITIONAL_PROPERTIES;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.DATABASE;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.DRIVER_TYPE;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.HOST;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.PASSWORD;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.PORT;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.SID;
import static org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum.USERNAME;

public class DataSourcePropertiesMap {

    public Map<Long, List<DataSourcePropertiesEnum>> props = new HashMap<>();

    private static DataSourcePropertiesMap dataSourcePropertiesMap = null;

    private DataSourcePropertiesMap() {
        /**
         * This class returns required properties for JDBC Connection
         * This is Consumed By The DataSource Connection Segment Form
         * As new DataSource are Added Create new Maps Accordingly.
         * dataStoreTypeId - DataSourceName
         * -- 1 : MariDb
         * -- 2 : Postgresql
         * */
        props.put(MARIADB_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE
        )));

        props.put(POSTGRES_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE
        )));

        props.put(MYSQL_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE
        )));

        props.put(HIVE_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                HIVE_USERNAME,
                HIVE_PASSWORD,
                DATABASE
        )));

        props.put(DB2_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE
        )));
        props.put(DB2_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE
        )));

        props.put(ORACLE_DATASOURCE_ID, new ArrayList<>(Arrays.asList(
                NAME,
                DESCRIPTION,
                HOST,
                PORT,
                ADDITIONAL_PROPERTIES,
                USERNAME,
                PASSWORD,
                DATABASE,
                SID,
                DRIVER_TYPE
        )));
    }

    public List<DataSourcePropertiesEnum> getDataSourcePropertiesById(Long dataStoreTypeId) {
        return props.get(dataStoreTypeId);
    }

    public static synchronized DataSourcePropertiesMap getInstance()
    {
        if (dataSourcePropertiesMap == null)
            dataSourcePropertiesMap = new DataSourcePropertiesMap();
        return dataSourcePropertiesMap;
    }
}
