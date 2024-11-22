package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.ConfiguredDataSource;
import org.lawlie8.shakuni.entity.datasource.DataSourceProperties;
import org.lawlie8.shakuni.entity.datasource.DataSourceType;
import org.lawlie8.shakuni.repo.ConfiguredDataSourcePropertiesRepo;
import org.lawlie8.shakuni.repo.ConfiguredDataSourceRepo;
import org.lawlie8.shakuni.repo.DataSourceRepo;
import org.lawlie8.shakuni.web.datasource.connection.DataSourceConnection;
import org.lawlie8.shakuni.web.datasource.connection.DataSourceConnectionFactory;
import org.lawlie8.shakuni.web.datasource.connection.DataSourceConnectionService;
import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;
import org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum;
import org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DataSourceService {

    @Autowired
    private DataSourceRepo dataSourceRepo;

    @Autowired
    private ConfiguredDataSourceRepo configuredDataSourceRepo;

    @Autowired
    private ConfiguredDataSourcePropertiesRepo configuredDataSourcePropertiesRepo;

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

    public List<DataSourceProperties> getDataSourceValuesByConfiguredDataSourceId(Long id){
        try{
            return configuredDataSourcePropertiesRepo.findByConfiguredDataSource_Id(id);
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

    public boolean checkDataSourceConnection(DataSourceConnectionObject dataSourceConnectionObject){
        DataSourceConnection dataSourceConnection = DataSourceConnectionFactory.getDataSource(dataSourceConnectionObject.getDataSourceTypeId());
        return dataSourceConnection.checkConnection(dataSourceConnectionObject);
    }

    public boolean saveDataSourceConnection(DataSourceConnectionObject dataSourceConnectionObject){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            ConfiguredDataSource configuredDataSource = new ConfiguredDataSource();
            configuredDataSource.setId(1L);
            configuredDataSource.setDatasourceType(dataSourceConnectionObject.getDataSourceTypeId());
            configuredDataSource.setDatasourceName(dataSourceConnectionObject.getPropertyValueMap().get("name"));
            configuredDataSource.setCreatedBy(auth.getName());
            configuredDataSource.setDatasourceDescription(dataSourceConnectionObject.getPropertyValueMap().get("description"));
            configuredDataSource.setCreationDate(new Date());
            List<DataSourceProperties> dataSourcePropertiesList = new ArrayList<>();
            for (Map.Entry<String,String> mapElement : dataSourceConnectionObject.getPropertyValueMap().entrySet()) {
                DataSourceProperties dataSourceProperties = new DataSourceProperties();
                dataSourceProperties.setPropKey(mapElement.getKey());
                dataSourceProperties.setConfiguredDataSource(configuredDataSource);
                dataSourceProperties.setPropValue(mapElement.getValue());
                dataSourcePropertiesList.add(dataSourceProperties);
            }
            configuredDataSource.setDataSourceProperties(dataSourcePropertiesList);
            configuredDataSourceRepo.save(configuredDataSource);
            return true;
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

}
