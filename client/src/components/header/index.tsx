// React's Hook Imports
import { useState, useEffect } from "react";

const Header = () => {
  const [pathname, set_pathname] = useState<string>("/");
  const [is_menu_open, set_is_menu_open] = useState<boolean>(false);

  const handle_toggle_menu = () => {
    set_is_menu_open(!is_menu_open);
  };

  useEffect(() => {
    set_pathname(window.location.pathname);

    return () => {
      set_pathname("/");
    };
  }, []);

  return (
    <nav className="bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6">
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-white">
            Grade Manager
          </span>
        </a>

        <div className="flex md:order-2 space-x-0 md:space-x-0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Afnankazi/Gradesub-test-"
            className="text-white mr-3 md:mr-0 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 flex items-center justify-center"
          >
            Source Code
          </a>

          <button
            onClick={() => {
              handle_toggle_menu();
            }}
            aria-expanded={is_menu_open ? "true" : "false"}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>

            <svg
              fill="none"
              aria-hidden="true"
              className="w-5 h-5"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            is_menu_open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li
              className={`pb-1.5 border-b-2 border-gray-800 md:hover:border-purple-500 ${
                pathname == "/" ? "md:border-purple-500" : "md:border-gray-900"
              }`}
            >
              <a
                href="/"
                className={`block py-2 px-3 md:p-0 text-white rounded md:bg-transparent ${
                  pathname == "/" && "bg-purple-700"
                }`}
              >
                Home
              </a>
            </li>

            <li
              className={`pb-1.5 border-b-2 border-gray-800 md:hover:border-purple-500 ${
                pathname == "/courses"
                  ? "md:border-purple-500"
                  : "md:border-gray-900"
              }`}
            >
              <a
                href="/courses"
                className={`block py-2 px-3 md:p-0 text-white rounded md:bg-transparent ${
                  pathname == "/courses" && "bg-purple-700"
                }`}
              >
                Courses
              </a>
            </li>

            <li
              className={`pb-1.5 border-b-2 border-gray-800 md:hover:border-purple-500 ${
                pathname == "/grades"
                  ? "md:border-purple-500"
                  : "md:border-gray-900"
              }`}
            >
              <a
                href="/grades"
                className={`block py-2 px-3 md:p-0 text-white rounded md:bg-transparent ${
                  pathname == "/grades" && "bg-purple-700"
                }`}
              >
                Grades
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
