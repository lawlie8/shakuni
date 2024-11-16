package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.ConfiguredDataSource;
import org.lawlie8.shakuni.entity.datasource.DataSourceType;
import org.lawlie8.shakuni.repo.ConfiguredDataSourceRepo;
import org.lawlie8.shakuni.repo.DataSourceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DataSourceService {

    @Autowired
    private DataSourceRepo dataSourceRepo;

    @Autowired
    private ConfiguredDataSourceRepo configuredDataSourceRepo;


    public List<DataSourceType> getAllDataSource(){
        try {
            return dataSourceRepo.findAll();
        }catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    public List<ConfiguredDataSource> getDataSourceByDataSourceTypeId(Long id){
        try{
            return configuredDataSourceRepo.findConfiguredDataSourceByDataSourceTypeId(id);
        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

    public void deleteConfiguredDataSourceById(Long id){
        try{
            configuredDataSourceRepo.deleteById(id);
        }catch (Exception e){
            System.out.println(e);
        }
    }

}
