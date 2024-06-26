// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import {
  fetch_enrolled_students,
  fetch_course_record_by_id,
} from "../../modules";
import { Home, Courses } from "../../types";
import { EnrollStudents } from "../../modals";

// App's External Imports
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initial_course = {
    code: "",
    subject: "",
    description: "",
  };

  const [loading, set_loading] = useState<boolean>(true);
  const [students, set_students] = useState<Home[]>([]);
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const [course, set_course] = useState<Courses>(initial_course);

  useEffect(() => {
    (async () => {
      const {
        enrolled_students,
        enrolled_students_response,
      }: { enrolled_students: Home[]; enrolled_students_response: Response } =
        await fetch_enrolled_students(Number(id));

      const { course_record }: { course_record: Courses } =
        await fetch_course_record_by_id(Number(id));

      if (!enrolled_students_response.ok) {
        toast.error("Failed to fetch data. Redirecting...", {
          id: "fetch_failed_redirecting",
        });

        setTimeout(() => {
          navigate("/courses");
        }, 3000);
      } else {
        set_course(course_record);
        set_students(enrolled_students);
        set_loading(!enrolled_students_response.ok);
      }
    })();

    return () => {
      set_students([]);
      set_loading(true);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-[80%] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {is_visible && (
        <EnrollStudents
          course_id={Number(id)}
          course_students={students}
          set_is_visible={set_is_visible}
          set_course_students={set_students}
        />
      )}

      <div className="h-[80%] py-12 flex flex-col items-center">
        <div className="w-4/5 relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
              <div className="flex items-center justify-between">
                <span>
                  [{course.code}] {course.subject}
                  <p className="mt-1 text-sm font-normal text-gray-400">
                    Total Students Enrolled:{" "}
                    <span className="font-bold">{students.length}</span>
                  </p>
                </span>

                <div>
                  <button
                    onClick={() => {
                      set_is_visible(true);
                    }}
                    className="px-5 py-2.5 mr-4 text-base rounded-lg bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
                  >
                    Add
                  </button>

                  <span className="inline-block text-white bg-gray-700 focus:ring-4 focus:outline-none rounded-lg text-base px-2 py-2.5">
                    #{id}
                  </span>
                </div>
              </div>
            </caption>

            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Date Of Birth
                </th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map(
                  ({ id, name, birthDate }, index) =>
                    id && (
                      <tr
                        key={index}
                        className="border-b bg-gray-800 border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-white hover:underline"
                        >
                          <Link to={`/${id}`}>{id}</Link>
                        </th>

                        <td className="px-6 py-4">{name}</td>
                        <td className="px-6 py-4">{birthDate}</td>
                      </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        alt="No records found"
                        className="w-1/4 mb-4 rounded-lg"
                        src="/assets/no_records_found.jpg"
                      />

                      <p className="text-gray-500 text-lg font-semibold">
                        No records found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
