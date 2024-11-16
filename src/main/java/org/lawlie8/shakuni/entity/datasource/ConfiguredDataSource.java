package org.lawlie8.shakuni.entity.datasource;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "configured_datasource")
public class ConfiguredDataSource {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "datasource_name")
    private String datasourceName;

    @Column(name = "datasource_description")
    private String datasourceDescription;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "datasource_type")
    private Integer datasourceType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDatasourceName() {
        return datasourceName;
    }

    public void setDatasourceName(String datasourceName) {
        this.datasourceName = datasourceName;
    }

    public String getDatasourceDescription() {
        return datasourceDescription;
    }

    public void setDatasourceDescription(String datasourceDescription) {
        this.datasourceDescription = datasourceDescription;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getDatasourceType() {
        return datasourceType;
    }

    public void setDatasourceType(Integer datasourceType) {
        this.datasourceType = datasourceType;
    }

    @Override
    public String toString() {
        return "ConfiguredDataSource{" +
                "id=" + id +
                ", datasourceName='" + datasourceName + '\'' +
                ", datasourceDescription='" + datasourceDescription + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", creationDate=" + creationDate +
                ", datasourceType=" + datasourceType +
                '}';
    }
}
