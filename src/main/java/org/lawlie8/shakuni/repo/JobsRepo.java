package org.lawlie8.shakuni.repo;

import jakarta.transaction.Transactional;
import org.lawlie8.shakuni.entity.jobs.Jobs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobsRepo extends JpaRepository<Jobs, Long> {

    @Query(value = "select * from `jobs` order by `creation_date` desc limit 7",nativeQuery = true)
    List<Jobs> findLastTenJobs();

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update `jobs` set `status` =:status where `id` =:jobId",nativeQuery = true)
    void updateStatus(Long jobId,String status);

    @Query(value = "select count(*) from `jobs` where `status` = 'COMPLETED'",nativeQuery = true)
    Long fetchCompletedJobCount();
}
