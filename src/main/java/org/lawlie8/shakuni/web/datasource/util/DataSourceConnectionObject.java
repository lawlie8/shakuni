package org.lawlie8.shakuni.web.datasource.util;

import java.util.Map;

public class DataSourceConnectionObject {

    private Long dataSourceTypeId;
    private Long dataSourceId;

    private String actionType;
    private Map<String,String> propertyValueMap;

    public Long getDataSourceTypeId() {
        return dataSourceTypeId;
    }

    public void setDataSourceTypeId(Long dataSourceTypeId) {
        this.dataSourceTypeId = dataSourceTypeId;
    }

    public Long getDataSourceId() {
        return dataSourceId;
    }

    public void setDataSourceId(Long dataSourceId) {
        this.dataSourceId = dataSourceId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
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
                ", dataSourceId=" + dataSourceId +
                ", actionType='" + actionType + '\'' +
                ", propertyValueMap=" + propertyValueMap +
                '}';
    }

}
