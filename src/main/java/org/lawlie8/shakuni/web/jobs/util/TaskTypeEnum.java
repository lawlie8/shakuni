package org.lawlie8.shakuni.web.jobs.util;

public enum TaskTypeEnum {
    SQL("SQL"),
    FILE("FILE");

    private String type;

    TaskTypeEnum(String type){
        this.type = type;
    }


}
