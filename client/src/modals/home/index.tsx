// React's Hook Imports
import { useState } from "react";

// App's Internal Imports
import { Home } from "../../types";
import { create_student_record } from "../../modules";

// App's External Imports
import toast from "react-hot-toast";

const HomeModal = ({
  set_students,
  set_is_visible,
}: {
  set_students: React.Dispatch<React.SetStateAction<Home[]>>;
  set_is_visible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initial_student_details = {
    name: "",
    birthDate: "",
  };

  const [student_details, set_student_details] = useState<Home>(
    initial_student_details
  );

  const handle_input_change = ({ target }: any): void => {
    const { name, value } = target;

    if (name === "birthDate" && value.length <= 10) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        set_student_details({
          ...student_details,
          [name]: value,
        });
      } else if (/^\d{4}-\d{2}$/.test(value)) {
        set_student_details({
          ...student_details,
          [name]: value + "-",
        });
      } else if (/^\d{4}$/.test(value)) {
        set_student_details({
          ...student_details,
          [name]: value + "-",
        });
      } else {
        set_student_details({
          ...student_details,
          [name]: value,
        });
      }
    } else {
      set_student_details({
        ...student_details,
        [name]: value,
      });
    }
  };

  const create_record = async () => {
    const { name, birthDate } = student_details;

    const name_pattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const birth_date_pattern =
      /^(\d{4})(?:-(0[1-9]|1[0-2]))?(?:-(0[1-9]|[12]\d|3[01]))?$/;

    if (!name_pattern.test(name)) {
      toast.error("Name should contain only letters and spaces");
    } else if (!birth_date_pattern.test(birthDate)) {
      toast.error("Date of Birth must be in the format YYYY-MM-DD");
    } else {
      const response = await toast.promise(
        create_student_record(student_details),
        {
          loading: "Adding record...",
          error: "Failed to add record",
          success: "Record added successfully",
        }
      );

      set_students((previous_students) => [...previous_students, response]);
      set_student_details(initial_student_details);
      set_is_visible(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-gray-700 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-600 bg-gray-700 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white">Add New Student</h3>

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
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                required
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                pattern="[A-Za-z\s]+"
                value={student_details.name}
                onChange={handle_input_change}
                placeholder="Type student name"
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
                required
                type="text"
                id="birthDate"
                name="birthDate"
                autoComplete="off"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={handle_input_change}
                value={student_details.birthDate}
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
            Add new student
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeModal;
