package com.ltp.gradesubmission.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ltp.gradesubmission.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    
    @Query(value = "SELECT * FROM Course c WHERE c.id = :id", nativeQuery = true)
    public Optional<Course> findCourseById(@Param("id") Long id);

    // Join: Get all courses with the number of students enrolled
    @Query(value = "SELECT c.*, COUNT(g.student_id) AS student_count " +
                   "FROM Course c " +
                   "LEFT JOIN Grade g ON c.id = g.course_id " +
                   "GROUP BY c.id", nativeQuery = true)
    public List<Object[]> findAllCoursesWithStudentCount();

    // Insertion query
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Course (subject, code, description) VALUES (:subject, :code, :description)", nativeQuery = true)
    void saveCourse(@Param("subject") String subject, @Param("code") String code, @Param("description") String description);

    // Deletion query
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Course WHERE id = :id", nativeQuery = true)
    void deleteCourseById(@Param("id") Long id);
}
