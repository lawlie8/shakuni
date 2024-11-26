package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.ConfiguredDataSource;
import org.lawlie8.shakuni.entity.datasource.DataSourceProperties;
import org.lawlie8.shakuni.entity.datasource.DataSourceType;
import org.lawlie8.shakuni.web.datasource.util.DataSourceConnectionObject;
import org.lawlie8.shakuni.web.datasource.util.DataSourcePropertiesEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/app")
public class DataSourceResource {

    @Autowired
    private DataSourceService dataSourceService;

    @RequestMapping(path = "/datasource/type/all",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllDataSourceType(){
        List<DataSourceType> dataSourceTypeList = dataSourceService.getAllDataSource();
        return ResponseEntity.ok(dataSourceTypeList);
    }

    @RequestMapping(path = "/datasource/configured/type/get/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDataSourceById(@PathVariable(name = "id") Long id){
        List<ConfiguredDataSource> dataSourceTypeList = dataSourceService.getDataSourceByDataSourceTypeId(id);
        return ResponseEntity.ok(dataSourceTypeList);
    }

    @RequestMapping(path = "/datasource/configured/value/get/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDataSourceValuesById(@PathVariable(name = "id") Long id){
        List<DataSourceProperties> dataSourceTypeList = dataSourceService.getDataSourceValuesByConfiguredDataSourceId(id);
        return ResponseEntity.ok(dataSourceTypeList);
    }

    @RequestMapping(path = "/datasource/configured/type/properties/get/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDataSourcePropertiesById(@PathVariable(name = "id") Long id){
        Map<DataSourcePropertiesEnum, Map<String,String>> properties = dataSourceService.getDataSourcePropertiesById(id);
        return ResponseEntity.ok(properties);
    }

    @RequestMapping(path = "/datasource/configured/delete/{id}",method = RequestMethod.DELETE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteDataSourceById(@PathVariable(name = "id") Long id){
        try {
            dataSourceService.deleteConfiguredDataSourceById(id);
        }catch (Exception e){
            //add logs here
            System.out.println(e);
        }
        return ResponseEntity.ok("Deleted Successfully");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/datasource/configured/check",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkDataSourceConnection(@RequestBody DataSourceConnectionObject dataSourceConnectionObject){
        try {
            Boolean isCheckSuccessFull =  dataSourceService.checkDataSourceConnection(dataSourceConnectionObject);
            return ResponseEntity.ok(isCheckSuccessFull);
        }catch (Exception e){
            //add logs here
            System.out.println(e);
        }
        return ResponseEntity.badRequest().build();
    }

    @RequestMapping(path = "/datasource/configured/save",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveDataSourceConnection(@RequestBody DataSourceConnectionObject dataSourceConnectionObject){
        try {
            Boolean isCheckSuccessFull =  dataSourceService.saveDataSourceConnection(dataSourceConnectionObject);
            return ResponseEntity.ok(isCheckSuccessFull);
        }catch (Exception e){
            //add logs here
            System.out.println(e);
        }
        return ResponseEntity.internalServerError().build();
    }
}
