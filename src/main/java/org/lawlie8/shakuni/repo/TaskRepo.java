package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.jobs.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Tasks,Long> {

    @Query(value = "select * from `tasks` where `job_id`=:jobId",nativeQuery = true)
    public List<Tasks> findByJobId(Long jobId);

}
