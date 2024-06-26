// React's Hook Imports
import { useState } from "react";

// App's Internal Imports
import { Grades } from "../../types";
import { edit_grade_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";

const EditScore = ({
  grades,
  grade_id,
  set_grades,
  set_edit_modal,
}: {
  grades: Grades[];
  grade_id: number;
  set_grades: React.Dispatch<React.SetStateAction<Grades[]>>;
  set_edit_modal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const selected_grade = grades.filter((grade) => grade.id === grade_id)[0];

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

  const [score, set_score] = useState<string>("");

  const handle_input_change = async ({ target: { value } }: any) => {
    set_score(value);
  };

  const edit_record = async (course_id: number, student_id: number) => {
    await toast.promise(edit_grade_record(score, course_id, student_id), {
      loading: "Editing record...",
      error: "Failed to edit record",
      success: "Record edited successfully",
    });

    const updated_grades = grades.map((grade) =>
      grade.id === grade_id ? { ...grade, score: score } : grade
    );

    set_score("");
    set_grades(updated_grades);
    set_edit_modal(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gray-700 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-600 bg-gray-700 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white">
            Edit Student Grade
          </h3>

          <button
            onClick={() => {
              set_edit_modal(false);
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
                  value={selected_grade.course.code}
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
                  value={selected_grade.course.subject}
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

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
                  value={selected_grade.student.name}
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
                  value={selected_grade.student.birthDate}
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
                onChange={handle_input_change}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500"
              >
                <option selected value="">
                  Choose a score
                </option>

                {scores.length > 0 ? (
                  scores.map((value, index) => (
                    <option
                      key={index}
                      value={value}
                      selected={value == selected_grade.score}
                    >
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
          </div>

          <button
            type="button"
            onClick={() => {
              edit_record(
                Number(selected_grade.course.id),
                Number(selected_grade.student.id)
              );
            }}
            disabled={!(score.length != 0)}
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
            Edit student grade
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditScore;
