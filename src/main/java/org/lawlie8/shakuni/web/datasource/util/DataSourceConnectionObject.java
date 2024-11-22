package org.lawlie8.shakuni.web.datasource.util;

import java.util.Map;

public class DataSourceConnectionObject {

    private Long dataSourceTypeId;
    private Map<String,String> propertyValueMap;

    public Long getDataSourceTypeId() {
        return dataSourceTypeId;
    }

    public void setDataSourceTypeId(Long dataSourceTypeId) {
        this.dataSourceTypeId = dataSourceTypeId;
    }

    public Map<String, String> getPropertyValueMap() {
        return propertyValueMap;
    }

    public void setPropertyValueMap(Map<String, String> propertyValueMap) {
        this.propertyValueMap = propertyValueMap;
    }

    @Override
    public String toString() {
        return "DataSourceConnectionObject{" +
                "dataSourceTypeId=" + dataSourceTypeId +
                ", propertyValueMap=" + propertyValueMap +
                '}';
    }
}
