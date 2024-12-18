package org.lawlie8.shakuni.web.jobs.util;

public enum StatusEnum {

    UNTRIGGERED("UNTRIGGERED"),
    RUNNING("RUNNING"),
    ERROR("ERROR"),
    TERMINATED("TERMINATED"),
    COMPLETED("COMPLETED");

    private String type;

    StatusEnum(String type){
        this.type = type;
    };

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
