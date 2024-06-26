// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import { CoursesModal } from "../../modals";
import { Courses as courses_type } from "../../types";
import { fetch_course_records, delete_course_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Courses = () => {
  const [loading, set_loading] = useState<boolean>(true);
  const [courses, set_courses] = useState<courses_type[]>([]);
  const [is_visible, set_is_visible] = useState<boolean>(false);

  const delete_record = async (id: number) => {
    const response = await toast.promise(delete_course_record(id), {
      loading: "Deleting...",
      error: "Failed to delete record",
      success: "Record deleted successfully",
    });

    if (response.ok) {
      set_courses((prev_courses) =>
        prev_courses.filter((course) => course.id !== id)
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: courses_type[]; response: Response } =
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
      <div className="h-[80%] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Courses | Grade Manager</title>
      </Helmet>

      {is_visible && (
        <CoursesModal
          set_courses={set_courses}
          set_is_visible={set_is_visible}
        />
      )}

      <div className="h-[80%] py-12 flex flex-col items-center">
        <div className="w-4/5 relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
              <div className="flex items-center justify-between">
                <span>
                  Manage Courses
                  <p className="mt-1 text-sm font-normal text-gray-400">
                    Total Courses:{" "}
                    <span className="font-bold">{courses.length}</span>
                  </p>
                </span>

                <button
                  onClick={() => {
                    set_is_visible(true);
                  }}
                  className="px-5 py-2.5 text-base rounded-lg bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
                >
                  Add
                </button>
              </div>
            </caption>

            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Code
                </th>

                <th scope="col" className="px-6 py-3">
                  Subject
                </th>

                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Report</span>
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.length > 0 ? (
                courses.map(
                  ({ id, code, subject, description }, index) =>
                    id && (
                      <tr
                        key={index}
                        className="border-b bg-gray-800 border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-white hover:underline"
                        >
                          <Link to={`/courses/${id}`}>{id}</Link>
                        </th>

                        <td className="px-6 py-4">{code}</td>
                        <td className="px-6 py-4">{subject}</td>
                        <td className="px-6 py-4">{description}</td>

                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/report/course/${id}`}
                            className="px-4 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                          >
                            Report
                          </Link>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              delete_record(id);
                            }}
                            className="px-4 py-2 text-sm text-white rounded-lg bg-red-600 hover:bg-red-700 focus:ring-red-800"
                          >
                            Delete
                          </button>
                        </td>
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

export default Courses;
