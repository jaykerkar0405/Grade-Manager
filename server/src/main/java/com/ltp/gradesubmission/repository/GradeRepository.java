package com.ltp.gradesubmission.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ltp.gradesubmission.entity.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    @Query(value = "SELECT * FROM grade g WHERE g.student_id = :studentId AND g.course_id = :courseId", nativeQuery = true)
    Optional<Grade> findByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);


    // Join: Get grades with corresponding student and course names
    @Query(value = "SELECT g.*, s.name AS student_name, c.subject AS course_name " +
                   "FROM Grade g " +
                   "JOIN Student s ON g.student_id = s.id " +
                   "JOIN Course c ON g.course_id = c.id", nativeQuery = true)
    public List<Object[]> findAllGradesWithStudentAndCourse();

    // Find grades by student
    @Query(value = "SELECT * FROM grade g WHERE g.student_id = :studentId", nativeQuery = true)
    public List<Grade> findByStudentId(@Param("studentId") Long studentId);
    
    // Find grades by course
    @Query(value = "SELECT * FROM grade g WHERE g.course_id = :courseId", nativeQuery = true)
    public List<Grade> findByCourseId(@Param("courseId") Long courseId);

    // Standard find by ID query
    @Query(value = "SELECT * FROM Grade g WHERE g.id = :id", nativeQuery = true)
    public Optional<Grade> findGradeById(Long id);

    // Insertion query
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO grade (score, student_id, course_id) VALUES (:score, :studentId, :courseId)", nativeQuery = true)
    Grade saveGrade(@Param("score") String score, @Param("studentId") Long studentId, @Param("courseId") Long courseId);

    // Update Query
    @Modifying
    @Transactional
    @Query(value = "UPDATE grade SET score = :score WHERE student_id = :studentId AND course_id = :courseId", nativeQuery = true)
    void updateGrade(@Param("score") String score, @Param("studentId") Long studentId, @Param("courseId") Long courseId);
 

    // Deletion query
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM grade WHERE student_id = :studentId AND course_id = :courseId", nativeQuery = true)
    void deleteByStudentIdAndCourseId(@Param("studentId") Long studentId, @Param("courseId") Long courseId);

    // View Example: Querying from the 'grade_student_course' view
    @Query(value = "SELECT * FROM grade_student_course", nativeQuery = true)
    public List<Object[]> findGradesWithStudentAndCourseNames();
}
