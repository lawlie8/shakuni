package org.lawlie8.shakuni.entity.datasource;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

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
    private Long datasourceType;

    @OneToMany(mappedBy = "configuredDataSource",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<DataSourceProperties> dataSourceProperties;

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

    public Long getDatasourceType() {
        return datasourceType;
    }

    public void setDatasourceType(Long datasourceType) {
        this.datasourceType = datasourceType;
    }

    public List<DataSourceProperties> getDataSourceProperties() {
        return dataSourceProperties;
    }

    public void setDataSourceProperties(List<DataSourceProperties> dataSourceProperties) {
        this.dataSourceProperties = dataSourceProperties;
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
                ", dataSourceProperties=" + dataSourceProperties +
                '}';
    }
}
