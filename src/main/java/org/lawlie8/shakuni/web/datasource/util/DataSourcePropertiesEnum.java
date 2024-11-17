package org.lawlie8.shakuni.web.datasource.util;

public enum DataSourcePropertiesEnum {

    NAME("name", "Connection", "String", true, false, true,"LEFT"),
    DESCRIPTION("description", "Connection", "String", false, false, true,"RIGHT"),
    HOST("host", "Connection", "String", true, false, true,"LEFT"),
    PORT("port", "Connection", "Integer", true, false, true,"RIGHT"),
    ADDITIONAL_PROPERTIES("additionalProperties", "Connection", "Map", false, false, true,"RIGHT"),
    USERNAME("userName", "Connection", "String", true, false, true,"LEFT"),
    PASSWORD("password", "Connection", "String", true, true, true,"LEFT"),
    DATABASE("database", "Connection", "String", true, false, true,"RIGHT");

    private final String propertyName;
    private final String pageType;
    private final String dataType;
    private final boolean isRequired;
    private final boolean isSensitive;
    private final boolean isActive;
    private final String position;

    DataSourcePropertiesEnum(String propertyName, String pageType, String dataType, boolean isRequired, boolean isSensitive, boolean isActive,String position) {
        this.propertyName = propertyName;
        this.pageType = pageType;
        this.dataType = dataType;
        this.isRequired = isRequired;
        this.isSensitive = isSensitive;
        this.isActive = isActive;
        this.position = position;
    }


}
