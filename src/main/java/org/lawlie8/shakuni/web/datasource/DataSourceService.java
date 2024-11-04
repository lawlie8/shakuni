package org.lawlie8.shakuni.web.datasource;

import org.lawlie8.shakuni.entity.datasource.DataSource;
import org.lawlie8.shakuni.repo.DataSourceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DataSourceService {

    @Autowired
    private DataSourceRepo dataSourceRepo;

    public List<DataSource> getAllDataSource(){
        try {
            return dataSourceRepo.findAll();
        }catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

}
