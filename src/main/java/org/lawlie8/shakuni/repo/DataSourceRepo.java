package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.datasource.DataSourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataSourceRepo extends JpaRepository<DataSourceType,Long> {


}
