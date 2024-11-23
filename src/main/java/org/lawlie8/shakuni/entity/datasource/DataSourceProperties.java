package org.lawlie8.shakuni.entity.datasource;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "datasource_properties")
public class DataSourceProperties {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prop_key")
    private String propKey;

    @Column(name = "prop_value")
    private String propValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "configured_datasource_id", nullable = false)
    @JsonBackReference
    private ConfiguredDataSource configuredDataSource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getPropKey() {
        return propKey;
    }

    public void setPropKey(String propKey) {
        this.propKey = propKey;
    }

    public String getPropValue() {
        return propValue;
    }

    public void setPropValue(String propValue) {
        this.propValue = propValue;
    }

    public ConfiguredDataSource getConfiguredDataSource() {
        return configuredDataSource;
    }

    public void setConfiguredDataSource(ConfiguredDataSource configuredDataSource) {
        this.configuredDataSource = configuredDataSource;
    }

    @Override
    public String toString() {
        return "DataSourceProperties{" +
                "id=" + id +
                ", propKey='" + propKey + '\'' +
                ", propValue='" + propValue + '\'' +
                '}';
    }
}
