package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.datasource.ConfiguredDataSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConfiguredDataSourceRepo extends JpaRepository<ConfiguredDataSource,Long> {


    @Query(value = "select * from `configured_datasource` where `datasource_type`= :id",nativeQuery = true)
    List<ConfiguredDataSource> findConfiguredDataSourceByDataSourceTypeId(Long id);

}
