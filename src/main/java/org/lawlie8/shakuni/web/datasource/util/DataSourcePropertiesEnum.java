package org.lawlie8.shakuni.web.datasource.util;

import java.util.HashMap;
import java.util.Map;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public enum DataSourcePropertiesEnum {

    NAME("1","name","Name", "Connection", "Input", "true", "false", "true", "LEFT"),
    DESCRIPTION("2","description","Description", "Connection", "TextArea", "false", "false", "true", "RIGHT"),
    HOST("3","host", "Host","Connection", "Input", "true", "false", "true", "LEFT"),
    PORT("4","port","Port", "Connection", "InputNumber", "true", "false", "true", "RIGHT"),
    USERNAME("5","userName","User Name", "Connection", "Input", "true", "false", "true", "LEFT"),
    PASSWORD("6","password","Password", "Connection", "Input.Password", "true", "true", "true", "LEFT"),
    DATABASE("7","database","Database", "Connection", "Input", "true", "false", "true", "RIGHT"),
    ADDITIONAL_PROPERTIES("8","additionalProperties","Additional Properties", "Connection", "TextArea", "false", "false", "true", "RIGHT");

    private final String ordinal;
    private final String propertyName;
    private final String propertyLabel;
    private final String pageType;
    private final String dataType;
    private final String isRequired;
    private final String isSensitive;
    private final String isActive;
    private final String position;

    DataSourcePropertiesEnum(String ordinal,String propertyName,String propertyLabel, String pageType, String dataType, String isRequired, String isSensitive, String isActive, String position) {
        this.ordinal = ordinal;
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

    public String getOrdinal() {
        return ordinal;
    }

    public Map<String,String> getAllValues() {
        Map<String,String> values = new HashMap<>();
        values.put(ORDINAL,getOrdinal());
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
