package com.seb_main_006.domain.destination.respository;

import com.seb_main_006.domain.course.entity.Course;
import com.seb_main_006.domain.destination.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
}
