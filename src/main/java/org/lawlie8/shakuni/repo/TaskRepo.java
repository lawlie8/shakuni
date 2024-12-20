package org.lawlie8.shakuni.repo;

import org.lawlie8.shakuni.entity.jobs.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Tasks,Long> {

}
