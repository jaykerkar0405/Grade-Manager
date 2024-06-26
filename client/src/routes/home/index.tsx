// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import { HomeModal } from "../../modals";
import { Home as home_type } from "../../types";
import { fetch_student_records, delete_student_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, set_loading] = useState<boolean>(true);
  const [students, set_students] = useState<home_type[]>([]);
  const [is_visible, set_is_visible] = useState<boolean>(false);

  const delete_record = async (id: number) => {
    const response = await toast.promise(delete_student_record(id), {
      loading: "Deleting...",
      error: "Failed to delete record",
      success: "Record deleted successfully",
    });

    if (response.ok) {
      set_students((prev_students) =>
        prev_students.filter((student) => student.id !== id)
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: home_type[]; response: Response } =
        await fetch_student_records();

      set_students(data);
      set_loading(!response.ok);
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
        <HomeModal
          set_students={set_students}
          set_is_visible={set_is_visible}
        />
      )}

      <div className="h-[80%] py-12 flex flex-col items-center">
        <div className="w-4/5 relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
              <div className="flex items-center justify-between">
                <span>
                  Manage Students
                  <p className="mt-1 text-sm font-normal text-gray-400">
                    Total Students:{" "}
                    <span className="font-bold">{students.length}</span>
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
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Date Of Birth
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

                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/report/student/${id}`}
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

export default Home;
