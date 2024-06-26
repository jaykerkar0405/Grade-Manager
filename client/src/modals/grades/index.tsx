// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import {
  create_grade_record,
  fetch_course_records,
  fetch_enrolled_students,
  fetch_grade_records_by_course_id,
} from "../../modules";
import { Home, Grades, Courses } from "../../types";

// App's External Imports
import toast from "react-hot-toast";

const GradesModal = ({
  set_grades,
  set_is_visible,
}: {
  set_grades: React.Dispatch<React.SetStateAction<Grades[]>>;
  set_is_visible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const scores = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];

  const initial_student_details = {
    id: 0,
    name: "",
    birthDate: "",
  };

  const initial_course_details = {
    id: 0,
    code: "",
    subject: "",
    description: "",
  };

  const [score, set_score] = useState<string>("");
  const [students, set_students] = useState<Home[]>([]);
  const [courses, set_courses] = useState<Courses[]>([]);
  const [loading, set_loading] = useState<boolean>(true);
  const [course_id, set_course_id] = useState<number>(0);
  const [student_id, set_student_id] = useState<number>(0);
  const [student_details, set_student_details] = useState<Home>(
    initial_student_details
  );
  const [course_details, set_course_details] = useState<Courses>(
    initial_course_details
  );

  const handle_input_change = async ({ target: { name, value } }: any) => {
    if (name == "course_id") {
      const selected_id = parseInt(value, 10);
      set_course_id(selected_id);

      const selected_course = courses.find(
        (course) => course.id === selected_id
      );

      if (selected_course) {
        set_course_details(selected_course);

        const { enrolled_students }: { enrolled_students: Home[] } =
          await fetch_enrolled_students(Number(selected_course.id));

        const { grade_record }: { grade_record: Grades[] } =
          await fetch_grade_records_by_course_id(Number(selected_course.id));

        const filtered_students = enrolled_students.filter(
          (enrolled_student) =>
            !grade_record.some(
              (grade) => grade.student.id === enrolled_student.id
            )
        );

        set_students(filtered_students);
      } else {
        set_course_details(initial_course_details);
      }
    }

    if (name == "student_id") {
      const selected_id = parseInt(value, 10);
      set_student_id(selected_id);

      const selected_student = students.find(
        (student) => student.id === selected_id
      );

      if (selected_student) {
        set_student_details(selected_student);
      } else {
        set_student_details(initial_student_details);
      }
    }

    if (name == "score") {
      set_score(value);
    }
  };

  const create_record = async () => {
    const response = await toast.promise(
      create_grade_record(score, course_id, student_id),
      {
        loading: "Adding record...",
        error: "Failed to add record",
        success: "Record added successfully",
      }
    );

    set_grades((previous_grades) => [...previous_grades, response]);

    set_score("");
    set_courses([]);
    set_students([]);
    set_course_details(initial_course_details);
    set_student_details(initial_student_details);
    set_is_visible(false);
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: Courses[]; response: Response } =
        await fetch_course_records();

      set_courses(data);
      set_loading(!response.ok);
    })();

    return () => {
      set_courses([]);
      set_loading(true);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gray-700 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-600 bg-gray-700 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white">
            Record Student Grade
          </h3>

          <button
            onClick={() => {
              set_is_visible(false);
            }}
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
          >
            <svg
              fill="none"
              aria-hidden="true"
              className="w-3 h-3"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form method="post" className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-1">
            <div>
              <label
                htmlFor="course_id"
                className="block mb-2 text-sm font-medium text-white"
              >
                Course ID
              </label>
              <select
                id="course_id"
                name="course_id"
                onChange={handle_input_change}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500"
              >
                <option selected value={0}>
                  Choose a course ID
                </option>

                {courses.length > 0 ? (
                  courses.map(({ id }, index) => (
                    <option key={index} value={id}>
                      {id}
                    </option>
                  ))
                ) : (
                  <option disabled value={0}>
                    No courses available
                  </option>
                )}
              </select>
            </div>

            {course_id != 0 && course_details.id != 0 && (
              <>
                <div className="flex space-x-4">
                  <div className="flex-grow basis-0">
                    <label
                      htmlFor="code"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Code
                    </label>
                    <input
                      disabled
                      id="code"
                      type="text"
                      autoComplete="off"
                      value={course_details.code}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex-grow-[3] basis-0">
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Subject
                    </label>
                    <input
                      disabled
                      type="text"
                      id="subject"
                      autoComplete="off"
                      value={course_details.subject}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="student_id"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Student ID
                  </label>
                  <select
                    id="student_id"
                    name="student_id"
                    onChange={handle_input_change}
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option selected value={0}>
                      Choose a student ID
                    </option>

                    {students.length > 0 ? (
                      students.map(({ id }, index) => (
                        <option key={index} value={id}>
                          {id}
                        </option>
                      ))
                    ) : (
                      <option disabled value={0}>
                        No students available
                      </option>
                    )}
                  </select>
                </div>

                {student_id != 0 && student_details.id != 0 && (
                  <>
                    <div className="flex space-x-4">
                      <div className="flex-grow-[3] basis-0">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Name
                        </label>
                        <input
                          disabled
                          id="name"
                          type="text"
                          autoComplete="off"
                          value={student_details.name}
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div className="flex-grow-[1.125] basis-0">
                        <label
                          htmlFor="date_of_birth"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Date Of Birth
                        </label>
                        <input
                          disabled
                          type="text"
                          id="date_of_birth"
                          autoComplete="off"
                          value={student_details.birthDate}
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="score"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Score
                      </label>
                      <select
                        id="score"
                        name="score"
                        onChange={handle_input_change}
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option selected value="">
                          Choose a score
                        </option>

                        {scores.length > 0 ? (
                          scores.map((value, index) => (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          ))
                        ) : (
                          <option disabled value="">
                            No scores available
                          </option>
                        )}
                      </select>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={create_record}
            disabled={!(course_id != 0 && student_id != 0 && score.length != 0)}
            className="inline-flex text-white items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="me-1 -ms-1 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              ></path>
            </svg>
            Record student grade
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradesModal;
