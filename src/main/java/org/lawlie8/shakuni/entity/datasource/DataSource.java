package org.lawlie8.shakuni.entity.datasource;

import jakarta.persistence.*;

@Entity
@Table(name = "datasource_type")
public class DataSource {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "data_source_type")
    private String dataSourceTypeName;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "datasource_version")
    private String version;

    @Column(name = "is_default_driver")
    private String isDefaultDriver;

    @Column(name = "driver_version")
    private String driverVersion;

    @Column(name = "datasource_img_url")
    private String dataSourceImageUrl;

    @Column(name = "datasource_site")
    private String dataSourceSiteUrl;

    @Column(name = "datasource_label")
    private String dataSourceLabel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataSourceTypeName() {
        return dataSourceTypeName;
    }

    public void setDataSourceTypeName(String dataSourceTypeName) {
        this.dataSourceTypeName = dataSourceTypeName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getIsDefaultDriver() {
        return isDefaultDriver;
    }

    public void setIsDefaultDriver(String isDefaultDriver) {
        this.isDefaultDriver = isDefaultDriver;
    }

    public String getDriverVersion() {
        return driverVersion;
    }

    public void setDriverVersion(String driverVersion) {
        this.driverVersion = driverVersion;
    }

    public String getDataSourceImageUrl() {
        return dataSourceImageUrl;
    }

    public void setDataSourceImageUrl(String dataSourceImageUrl) {
        this.dataSourceImageUrl = dataSourceImageUrl;
    }

    public String getDataSourceSiteUrl() {
        return dataSourceSiteUrl;
    }

    public void setDataSourceSiteUrl(String dataSourceSiteUrl) {
        this.dataSourceSiteUrl = dataSourceSiteUrl;
    }

    public String getDataSourceLabel() {
        return dataSourceLabel;
    }

    public void setDataSourceLabel(String dataSourceLabel) {
        this.dataSourceLabel = dataSourceLabel;
    }

    @Override
    public String toString() {
        return "DataSource{" +
                "id=" + id +
                ", dataSourceTypeName='" + dataSourceTypeName + '\'' +
                ", isActive=" + isActive +
                ", version='" + version + '\'' +
                ", isDefaultDriver='" + isDefaultDriver + '\'' +
                ", driverVersion='" + driverVersion + '\'' +
                ", dataSourceImageUrl='" + dataSourceImageUrl + '\'' +
                ", dataSourceSiteUrl='" + dataSourceSiteUrl + '\'' +
                ", dataSourceLabel='" + dataSourceLabel + '\'' +
                '}';
    }
}
