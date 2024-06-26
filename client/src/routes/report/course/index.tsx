// React's Hook Imports
import { useState, useEffect } from "react";

// App's Internal Imports
import { Grades } from "../../../types";
import { fetch_grade_records_by_course_id } from "../../../modules";

// App's External Imports
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { usePDF } from "react-to-pdf";
import { Link, useParams, useNavigate } from "react-router-dom";

const CourseReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    page: { orientation: "landscape" },
    filename: `course_report_${id}.pdf`,
  });

  const [grades, set_grades] = useState<Grades[]>([]);
  const [loading, set_loading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const {
        grade_record,
        grade_record_response,
      }: { grade_record: Grades[]; grade_record_response: Response } =
        await fetch_grade_records_by_course_id(Number(id));

      if (!grade_record_response.ok) {
        toast.error("Failed to fetch data. Redirecting...", {
          id: "fetch_failed_redirecting",
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        if (grade_record.length == 0) {
          toast.error("No grade assigned. Redirecting...", {
            id: "no_grade_assigned",
          });

          setTimeout(() => {
            navigate("/courses");
          }, 3000);
        } else {
          set_grades(grade_record);
          set_loading(!grade_record_response.ok);
        }
      }
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
        <title>Course Report | Grade Manager</title>
      </Helmet>

      <div ref={targetRef} className="h-[80%] py-12 flex flex-col items-center">
        <div className="w-4/5 relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left text-white bg-gray-800">
              <div className="flex items-center justify-between">
                <span>
                  Course Report - [{grades[0].course.code}]{" "}
                  {grades[0].course.subject}
                  <p className="mt-1 text-sm font-normal text-gray-400">
                    Total Grades:{" "}
                    <span className="font-bold">{grades.length}</span>
                  </p>
                </span>

                <button
                  onClick={() => toPDF()}
                  className="px-5 py-2.5 text-base rounded-lg bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
                >
                  Download
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
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {grades.length > 0 ? (
                grades.map(
                  (
                    { id, score, student: { id: student_id, name, birthDate } },
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
                          <span>{index + 1}</span>
                        </th>

                        <td className="px-6 py-4 hover:underline">
                          <Link to={`/${student_id}`}>{name}</Link>
                        </td>
                        <td className="px-6 py-4">
                          <span>{birthDate}</span>
                        </td>
                        <td className="px-6 py-4">{score}</td>
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

export default CourseReport;
