// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import {
  delete_student_record,
  fetch_student_record_by_id,
} from "../../modules";
import { Home } from "../../types";

// App's External Imports
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initial_student = {
    name: "",
    birthDate: "",
    id: Number(id),
  };

  const [loading, set_loading] = useState<boolean>(true);
  const [student, set_student] = useState<Home>(initial_student);

  const delete_record = async () => {
    const response = await toast.promise(delete_student_record(Number(id)), {
      loading: "Deleting...",
      error: "Failed to delete record",
      success: "Record deleted successfully",
    });

    if (response.ok) {
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      const { data, response }: { data: Home; response: Response } =
        await fetch_student_record_by_id(Number(id));

      set_loading(!response.ok);

      if (!response.ok) {
        toast.error("Failed to fetch data. Redirecting...", {
          id: "fetch_failed_redirecting",
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        set_student(data);
      }
    })();

    return () => {
      set_loading(true);
      set_student(initial_student);
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
    <div className="h-[80%] py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <span className="inline-block text-white bg-gray-700 focus:ring-4 focus:outline-none rounded-lg text-sm p-2">
            #{id}
          </span>
        </div>

        <div className="flex flex-col items-center py-12">
          <h5 className="mb-1 text-2xl font-medium text-white">
            {student.name}
          </h5>

          <span className="text-base text-gray-400">{student.birthDate}</span>

          <div className="flex mt-4 md:mt-6 gap-5">
            <Link
              to={`/report/student/${id}`}
              className="px-4 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Report
            </Link>

            <button
              onClick={() => {
                delete_record();
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
