package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.datasource.DataSourceProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConfiguredDataSourcePropertiesRepo extends JpaRepository<DataSourceProperties,Long> {

    List<DataSourceProperties> findByConfiguredDataSource_Id(Long configuredDatasourceId);
}
