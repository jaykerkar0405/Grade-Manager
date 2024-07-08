package com.ltp.gradesubmission;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ltp.gradesubmission.entity.Course;
import com.ltp.gradesubmission.repository.CourseRepository;

@SpringBootApplication
public class GradeSubmissionApplication implements CommandLineRunner {

    @Autowired
    CourseRepository courseRepository;

    public static void main(String[] args) {
        SpringApplication.run(GradeSubmissionApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Course[] courses = new Course[]{
            new Course("Electronics & Computer Science", "ECS101", "This course covers the fundamental principles of electronics and computer science, including circuit design, programming, and system integration."),
            new Course("Computer Science", "CS101", "In this class, you will explore the fundamentals of computer science, including algorithms, data structures, and software development."),
            new Course("Automation & Robotics", "AR101", "This course introduces the concepts of automation and robotics, focusing on the design, control, and operation of robotic systems."),
            new Course("Electronics and Telecommunication", "ET101", "Learn the basics of electronics and telecommunication, including signal processing, communication systems, and electronic circuits."),
            new Course("Information Technology", "IT101", "This course covers key areas of information technology, such as networking, database management, and information systems."),
            new Course("AI and Data Science", "AI101", "An introductory course to artificial intelligence and data science, focusing on machine learning algorithms, data analysis, and big data technologies."),
            new Course("Humanities and Applied Sciences (FE)", "HAS101", "Explore the intersection of humanities and applied sciences, covering topics such as ethics in technology, scientific principles, and critical thinking."),
            new Course("Electronics", "ELE101", "This course delves into the principles of electronics, including circuit analysis, electronic devices, and system design."),
            new Course("Instrumentation", "INS101", "Study the principles of instrumentation, focusing on the measurement and control of physical variables in engineering systems.")

        };

        courseRepository.saveAll(Arrays.asList(courses));

    }
}
