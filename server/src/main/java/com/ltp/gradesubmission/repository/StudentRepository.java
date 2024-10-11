package com.ltp.gradesubmission.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ltp.gradesubmission.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "SELECT s.* FROM student s " +
               "JOIN grade g ON s.id = g.student_id " +
               "WHERE g.course_id = :courseId", nativeQuery = true)
    public List<Student> findStudentsByCourseId(@Param("courseId") Long courseId);

    // Find student by ID
    @Query(value = "SELECT * FROM student s WHERE s.id = :id", nativeQuery = true)
    public Optional<Student> findStudentById(@Param("id") Long id);

    // Standard find all students query
    @Query(value = "SELECT * FROM student", nativeQuery = true)
    public List<Student> findAllStudents();

    // Deletion query
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM student WHERE id = :id", nativeQuery = true)
    void deleteStudentById(@Param("id") Long id);

    // Insertion query
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO student (name, birth_date) VALUES (:name, :birthDate)", nativeQuery = true)
    void saveStudent(@Param("name") String name, @Param("birthDate") LocalDate birthDate);
}
