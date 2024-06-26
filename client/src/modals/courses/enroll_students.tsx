// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import {
  fetch_student_records,
  create_student_enrollment,
} from "../../modules";
import { Home } from "../../types";

// App's External Imports
import toast from "react-hot-toast";

const EnrollStudents = ({
  course_id,
  set_is_visible,
  course_students,
  set_course_students,
}: {
  course_id: number;
  course_students: Home[];
  set_is_visible: React.Dispatch<React.SetStateAction<boolean>>;
  set_course_students: React.Dispatch<React.SetStateAction<Home[]>>;
}) => {
  const initial_student_details = {
    id: 0,
    name: "",
    birthDate: "",
  };

  const [students, set_students] = useState<Home[]>([]);
  const [loading, set_loading] = useState<boolean>(true);
  const [student_id, set_student_id] = useState<number>(0);
  const [student_details, set_student_details] = useState<Home>(
    initial_student_details
  );

  const handle_input_change = ({ target: { value } }: any) => {
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
  };

  const create_record = async () => {
    await toast.promise(create_student_enrollment(course_id, student_id), {
      loading: "Adding record...",
      error: "Failed to add record",
      success: "Record added successfully",
    });

    set_course_students((previous_students) => [
      ...previous_students,
      student_details,
    ]);
    set_student_details(initial_student_details);
    set_is_visible(false);
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: Home[]; response: Response } =
        await fetch_student_records();

      const filtered_students = data.filter(
        (student) =>
          !course_students.some(
            (course_students) => course_students.id === student.id
          )
      );

      set_students(filtered_students);
      set_loading(!response.ok);
    })();

    return () => {
      set_students([]);
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
            Enroll New Student
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
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="student_id"
                className="block mb-2 text-sm font-medium text-white"
              >
                Student ID
              </label>
              <select
                id="student_id"
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
                <div className="col-span-2">
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

                <div className="col-span-2">
                  <label
                    htmlFor="birthDate"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Date Of Birth
                  </label>
                  <input
                    disabled
                    type="text"
                    id="birthDate"
                    autoComplete="off"
                    value={student_details.birthDate}
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={create_record}
            disabled={!(student_id != 0 && student_details.id != 0)}
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
            Enroll new student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollStudents;
