package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(path = "/app")
public class DataSourceResource {

    @Autowired
    private DataSourceService dataSourceService;

    @RequestMapping(path = "/datasource/type/all",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllDataSourceType(){
        List<DataSource> dataSourceList = dataSourceService.getAllDataSource();
        return ResponseEntity.ok(dataSourceList);
    }


}
