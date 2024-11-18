package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.ConfiguredDataSource;
import org.lawlie8.shakuni.entity.datasource.DataSourceType;
import org.lawlie8.shakuni.repo.ConfiguredDataSourceRepo;
import org.lawlie8.shakuni.repo.DataSourceRepo;
import org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum;
import org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public Map<DataSourcePropertiesEnum,Map<String,String>> getDataSourcePropertiesById(Long datasourceTypeId){
        List<DataSourcePropertiesEnum> properties =  DataSourcePropertiesMap.getInstance().getDataSourcePropertiesById(datasourceTypeId);
        Map<DataSourcePropertiesEnum,Map<String,String>> propListMap = new HashMap<>();
        for(int i = 0;i<properties.size();i++){
            propListMap.put(properties.get(i),properties.get(i).getAllValues());
        }
        return propListMap;
    }

    public void deleteConfiguredDataSourceById(Long id){
        try{
            configuredDataSourceRepo.deleteById(id);
        }catch (Exception e){
            System.out.println(e);
        }
    }

}
