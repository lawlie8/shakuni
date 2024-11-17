package org.lawlie8.shakuni.web.datasource.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public enum DataSourcePropertiesEnum {

    NAME("name","Name", "Connection", "String", "true", "false", "true", "LEFT"),
    DESCRIPTION("description","Description", "Connection", "String", "false", "false", "true", "RIGHT"),
    HOST("host", "Host","Connection", "String", "true", "false", "true", "LEFT"),
    PORT("port","Port", "Connection", "Integer", "true", "false", "true", "RIGHT"),
    ADDITIONAL_PROPERTIES("additionalProperties","Additional Properties", "Connection", "Map", "false", "false", "true", "RIGHT"),
    USERNAME("userName","User Name", "Connection", "String", "true", "false", "true", "LEFT"),
    PASSWORD("password","Password", "Connection", "String", "true", "true", "true", "LEFT"),
    DATABASE("database","Database", "Connection", "String", "true", "false", "true", "RIGHT");

    private final String propertyName;
    private final String propertyLabel;
    private final String pageType;
    private final String dataType;
    private final String isRequired;
    private final String isSensitive;
    private final String isActive;
    private final String position;

    DataSourcePropertiesEnum(String propertyName,String propertyLabel, String pageType, String dataType, String isRequired, String isSensitive, String isActive, String position) {
        this.propertyName = propertyName;
        this.propertyLabel = propertyLabel;
        this.pageType = pageType;
        this.dataType = dataType;
        this.isRequired = isRequired;
        this.isSensitive = isSensitive;
        this.isActive = isActive;
        this.position = position;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public String getPropertyLabel(){
        return propertyLabel;
    }

    public String getPageType() {
        return pageType;
    }

    public String getDataType() {
        return dataType;
    }

    public String isRequired() {
        return isRequired;
    }

    public String isSensitive() {
        return isSensitive;
    }

    public String isActive() {
        return isActive;
    }

    public String getPosition() {
        return position;
    }

    public Map<String,String> getAllValues() {
        Map<String,String> values = new HashMap<>();
        values.put(PROPERTY_NAME,getPropertyName());
        values.put(PROPERTY_LABEL,getPropertyLabel());
        values.put(PAGE_TYPE,getPageType());
        values.put(DATA_TYPE,getDataType());
        values.put(IS_REQUIRED,isRequired());
        values.put(IS_SENSITIVE,isSensitive());
        values.put(IS_ACTIVE,isActive());
        values.put(POSITION,getPosition());
        return values;
    }
}
