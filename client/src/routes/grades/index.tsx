// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import { Grades as grades_type } from "../../types";
import { EditScore, GradesModal } from "../../modals";
import { fetch_grade_records, delete_grade_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Grades = () => {
  const [grade_id, set_grade_id] = useState<number>(0);
  const [loading, set_loading] = useState<boolean>(true);
  const [grades, set_grades] = useState<grades_type[]>([]);
  const [is_visible, set_is_visible] = useState<boolean>(false);
  const [edit_modal, set_edit_modal] = useState<boolean>(false);

  const delete_record = async (
    id: number,
    course_id: number,
    student_id: number
  ) => {
    const response = await toast.promise(
      delete_grade_record(course_id, student_id),
      {
        loading: "Deleting...",
        error: "Failed to delete record",
        success: "Record deleted successfully",
      }
    );

    if (response.ok) {
      set_grades((prev_grades) =>
        prev_grades.filter((grade) => grade.id !== id)
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: grades_type[]; response: Response } =
        await fetch_grade_records();

      set_grades(data);
      set_loading(!response.ok);
    })();

    return () => {
      set_grades([]);
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
        <title>Grades | Grade Manager</title>
      </Helmet>

      {is_visible && (
        <GradesModal set_grades={set_grades} set_is_visible={set_is_visible} />
      )}

      {edit_modal && (
        <EditScore
          grades={grades}
          grade_id={grade_id}
          set_grades={set_grades}
          set_edit_modal={set_edit_modal}
        />
      )}

      <div className="h-[80%] py-12 flex flex-col items-center">
        <div className="w-4/5 relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
              <div className="flex items-center justify-between">
                <span>
                  Manage Grades
                  <p className="mt-1 text-sm font-normal text-gray-400">
                    Total Grades:{" "}
                    <span className="font-bold">{grades.length}</span>
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
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Score
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {grades.length > 0 ? (
                grades.map(
                  (
                    {
                      id,
                      score,
                      student: { id: student_id, name },
                      course: { id: course_id, code, subject },
                    },
                    index
                  ) =>
                    id && (
                      <tr
                        key={index}
                        className="border-b bg-gray-800 border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-white"
                        >
                          <span>{id}</span>
                        </th>

                        <td className="px-6 py-4 hover:underline">
                          <Link to={`/courses/${course_id}`}>{code}</Link>
                        </td>
                        <td className="px-6 py-4 hover:underline">
                          <Link to={`/courses/${course_id}`}>{subject}</Link>
                        </td>
                        <td className="px-6 py-4 hover:underline">
                          <Link to={`/${student_id}`}>{name}</Link>
                        </td>
                        <td className="px-6 py-4">{score}</td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              set_grade_id(id);
                              set_edit_modal(true);
                            }}
                            className="px-4 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                          >
                            Edit
                          </button>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              delete_record(
                                Number(id),
                                Number(course_id),
                                Number(student_id)
                              );
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

export default Grades;
