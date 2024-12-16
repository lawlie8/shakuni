package org.lawlie8.shakuni.web.jobs.util;

public enum ExecutionTypeEnum {

    SEQUENTIAL("SEQUENTIAL"),
    NORMAL("NORMAL");

    private String type;

    ExecutionTypeEnum(String type){
        this.type = type;
    };

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
