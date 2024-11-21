package org.lawlie8.shakuni.web.datasource.util;

import java.util.HashMap;
import java.util.Map;

import static org.lawlie8.shakuni.web.datasource.util.DataSourceConstants.*;

public enum DataSourcePropertiesEnum {

    NAME("1",
            "name",
            "ex. Prod Server 1",
            "Name",
            "Connection",
            "Input",
            "true",
            "false",
            "true",
            "LEFT",
            "Name to Save Configured Data-Source (Must be Unique)"),

    DESCRIPTION("2",
            "description",
            "ex. Data-Source Used For Production",
            "Description",
            "Connection",
            "TextArea",
            "false",
            "false",
            "true",
            "RIGHT",
            "Additional Description for Data-Source (200 max characters)"),

    HOST("3",
            "host",
            "ex. mysql.database.windows.net",
            "Host",
            "Connection",
            "Input",
            "true",
            "false",
            "true",
            "LEFT",
            "Host Name is unique identifier assigned to a device or system on a network"),

    PORT("4",
            "port",
            "ex. 3600",
            "Port",
            "Connection",
            "InputNumber",
            "true",
            "false",
            "true",
            "RIGHT",
            "Port at which the Service is Hosted (range 0-65535)"),

    USERNAME("5",
            "userName",
            "ex. adminUser",
            "User Name",
            "Connection",
            "Input",
            "true",
            "false",
            "true",
            "LEFT",
            "Unique Identifier to login into Data-Source (Must be Present at Data-Source)"),

    PASSWORD("6",
            "password",
            "ex. E;kh@r9z=D6ju_N()8~Yb*",
            "Password",
            "Connection",
            "Input.Password",
            "true",
            "true",
            "true",
            "LEFT",
            "Password associated with User Name (note : All Passwords are Encrypted and Stored Locally)"),

    DATABASE("7",
            "database",
            "ex. prodDb1",
            "Database",
            "Connection",
            "Input",
            "true",
            "false",
            "true",
            "RIGHT",
            "Database to Connect (Must be Present on Data-Source)"),

    ADDITIONAL_PROPERTIES("8",
            "additionalProperties",
            "ex. TrustServerCertificate=false;",
            "Additional Properties",
            "Connection",
            "TextArea",
            "false",
            "false",
            "true",
            "RIGHT",
            "Additional Jdbc Properties (properties must be separated by ';')");

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
    private final String propertyDescription;

    DataSourcePropertiesEnum(String ordinal,String propertyName,String example,String propertyLabel, String pageType, String dataType, String isRequired, String isSensitive, String isActive, String position,String propertyDescription) {
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
        this.propertyDescription = propertyDescription;
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

    public String getPropertyDescription() {
        return propertyDescription;
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
        values.put(PROPERTY_DESCRIPTION,getPropertyDescription());
        return values;
    }
}
