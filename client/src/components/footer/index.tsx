const Footer = () => {
  const fetch_current_year = (): number => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex items-center justify-center">
          <span className="text-sm sm:text-center text-gray-400">
            &copy; {fetch_current_year()}{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              href="https://github.com/Afnankazi/Gradesub-test-"
            >
              Grade Manager
            </a>{" "}
            | All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
