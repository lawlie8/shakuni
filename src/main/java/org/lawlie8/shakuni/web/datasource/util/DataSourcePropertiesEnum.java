package org.lawlie8.shakuni.web.datasource.util;

public enum DataSourcePropertiesEnum {

    NAME("name", "Connection", "String", true, false, true),
    DESCRIPTION("description", "Connection", "String", false, false, true),
    HOST("host", "Connection", "String", true, false, true),
    PORT("port", "Connection", "Integer", true, false, true),
    ADDITIONAL_PROPERTIES("additionalProperties", "Connection", "Map", false, false, true),
    USERNAME("userName", "Connection", "String", true, false, true),
    PASSWORD("password", "Connection", "String", true, true, true),
    DATABASE("database", "Connection", "String", true, false, true);

    private final String propertyName;
    private final String pageType;
    private final String dataType;
    private final boolean isRequired;
    private final boolean isSensitive;
    private final boolean isActive;

    DataSourcePropertiesEnum(String propertyName, String pageType, String dataType, boolean isRequired, boolean isSensitive, boolean isActive) {
        this.propertyName = propertyName;
        this.pageType = pageType;
        this.dataType = dataType;
        this.isRequired = isRequired;
        this.isSensitive = isSensitive;
        this.isActive = isActive;
    }


}
