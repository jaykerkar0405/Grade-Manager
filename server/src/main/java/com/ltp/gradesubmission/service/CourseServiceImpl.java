package com.ltp.gradesubmission.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.ltp.gradesubmission.entity.Course;
import com.ltp.gradesubmission.entity.Student;
import com.ltp.gradesubmission.exception.CourseNotFoundException;
import com.ltp.gradesubmission.exception.StudentNotFoundException;
import com.ltp.gradesubmission.repository.CourseRepository;
import com.ltp.gradesubmission.repository.StudentRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

    StudentRepository studentRepository;
    CourseRepository courseRepository;
    
    @Override
    public Course getCourse(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        return unwrapCourse(course, id);
    }

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id) {  
        courseRepository.deleteById(id);      
    }

    @Override
    public List<Course> getCourses() {
        return (List<Course>)courseRepository.findAll();
    }

    @Override
    public Course addStudentToCourse(Long studentid, Long courseid) {
        Optional<Course> c = courseRepository.findById(courseid);
        Optional<Student> s = studentRepository.findById(studentid);
       Student us = StudentServiceImpl.unwrapStudent(s, courseid);
        Course uc = unwrapCourse(c, courseid);
        uc.getStudents().add(us);
        return courseRepository.save(uc);
    }

    @Override
    public Set<Student> getEnrolledStudents(Long id) {
       Course c = getCourse(id);
        return c.getStudents();
    }

    static Course unwrapCourse(Optional<Course> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new CourseNotFoundException(id);
    }


}
