package org.lawlie8.shakuni.web.datasource.util;

import java.util.HashMap;
import java.util.Map;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public enum DataSourcePropertiesEnum {

    NAME("1","name","Prod Server 1","Name", "Connection", "Input", "true", "false", "true", "LEFT"),
    DESCRIPTION("2","description","Data-Source Used For Production","Description", "Connection", "TextArea", "false", "false", "true", "RIGHT"),
    HOST("3","host", "mysql.database.windows.net","Host","Connection", "Input", "true", "false", "true", "LEFT"),
    PORT("4","port","3600","Port", "Connection", "InputNumber", "true", "false", "true", "RIGHT"),
    USERNAME("5","userName","adminUser","User Name", "Connection", "Input", "true", "false", "true", "LEFT"),
    PASSWORD("6","password","secretPassword","Password", "Connection", "Input.Password", "true", "true", "true", "LEFT"),
    DATABASE("7","database","prodDb1","Database", "Connection", "Input", "true", "false", "true", "RIGHT"),
    ADDITIONAL_PROPERTIES("8","TrustServerCertificate=false","additionalProperties","Additional Properties", "Connection", "TextArea", "false", "false", "true", "RIGHT");

    private final String ordinal;
    private final String propertyName;
    private final String example;
    private final String propertyLabel;
    private final String pageType;
    private final String dataType;
    private final String isRequired;
    private final String isSensitive;
    private final String isActive;
    private final String position;

    DataSourcePropertiesEnum(String ordinal,String propertyName,String example,String propertyLabel, String pageType, String dataType, String isRequired, String isSensitive, String isActive, String position) {
        this.ordinal = ordinal;
        this.propertyName = propertyName;
        this.example = example;
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
    public String getExample(){
        return example;
    }

    public Map<String,String> getAllValues() {
        Map<String,String> values = new HashMap<>();
        values.put(ORDINAL,getOrdinal());
        values.put(EXAMPLE,getExample());
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
