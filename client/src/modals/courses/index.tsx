// React's Hook Imports
import { useState } from "react";

// App's Internal Imports
import { Courses } from "../../types";
import { create_course_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";

const CoursesModal = ({
  set_courses,
  set_is_visible,
}: {
  set_courses: React.Dispatch<React.SetStateAction<Courses[]>>;
  set_is_visible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initial_course_details = {
    code: "",
    subject: "",
    description: "",
  };

  const [course_details, set_course_details] = useState<Courses>(
    initial_course_details
  );

  const handle_input_change = ({ target }: any): void => {
    const { name, value } = target;

    set_course_details({
      ...course_details,
      [name]: value,
    });
  };

  const create_record = async () => {
    const { code, subject, description } = course_details;

    const parsed_code = code.toUpperCase();
    course_details.code = parsed_code;

    const code_pattern = /^[A-Z]{2}\d{3}$/;
    const subject_pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const description_pattern = /^[A-Za-z0-9.,!?\"'() -]*$/;

    if (!code_pattern.test(parsed_code)) {
      toast.error("Code: Two letters followed by three digits");
    } else if (!subject_pattern.test(subject)) {
      toast.error("Subject: Only letters and spaces");
    } else if (
      description.length == 0 ||
      !description_pattern.test(description)
    ) {
      toast.error("Description: Letters, numbers, and common punctuation");
    } else {
      const response = await toast.promise(
        create_course_record(course_details),
        {
          loading: "Adding record...",
          error: "Failed to add record",
          success: "Record added successfully",
        }
      );

      set_courses((previous_courses) => [...previous_courses, response]);
      set_course_details(initial_course_details);
      set_is_visible(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gray-700 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-600 bg-gray-700 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white">Add New Course</h3>

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
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-white"
              >
                Code
              </label>
              <input
                required
                id="code"
                name="code"
                type="text"
                autoComplete="off"
                pattern="[A-Z]{2}\d{3}"
                value={course_details.code}
                onChange={handle_input_change}
                placeholder="Type course code"
                className="uppercase border text-sm rounded-lg block w-full p-2.5 placeholder-none bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-white"
              >
                Subject
              </label>
              <input
                required
                type="text"
                id="subject"
                name="subject"
                autoComplete="off"
                pattern="[A-Za-z\s]+"
                onChange={handle_input_change}
                value={course_details.subject}
                placeholder="Type course subject"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-white"
              >
                Description
              </label>
              <textarea
                required
                rows={5}
                id="description"
                name="description"
                autoComplete="off"
                onChange={handle_input_change}
                value={course_details.description}
                placeholder="Type course description"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={create_record}
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
            Add new course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoursesModal;
