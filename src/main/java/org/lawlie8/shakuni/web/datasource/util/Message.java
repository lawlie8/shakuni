package org.lawlie8.shakuni.web.datasource.util;

public class Message {

    private String type;
    private String message;
    private String title;

    public Message(String type, String message) {
        this.type = type;
        this.message = message;
    }

    public Message(String type,String title, String message) {
        this.type = type;
        this.message = message;
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Message{" +
                "type='" + type + '\'' +
                ", message='" + message + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
