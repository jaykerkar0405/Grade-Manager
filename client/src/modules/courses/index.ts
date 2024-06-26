// App's Internal Imports
import { Courses } from "../../types";

// App's External Imports
import toast from "react-hot-toast";

const fetch_course_records = async (): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/course/all`;

    const options = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    const response = await fetch(api_url, options);
    const data = await response.json();

    return { data, response };
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const fetch_enrolled_students = async (id: number): Promise<any> => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/course/${id}/students`;

    const options = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    const response = await fetch(api_url, options);
    const data = await response.json();

    return { enrolled_students: data, enrolled_students_response: response };
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const fetch_course_record_by_id = async (id: number): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/course/${id}`;

    const options = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    const response = await fetch(api_url, options);
    const data = await response.json();

    return { course_record: data, course_record_response: response };
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const delete_course_record = async (id: number): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/course/${id}`;

    const options = {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    const response = await fetch(api_url, options);

    if (!response.ok) {
      const data = await response.json();

      if (data.message) {
        toast.error(data.message[0], { id: "internal_server_error" });
        throw data.message[0];
      }
    }

    return response;
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const create_course_record = async (course: Courses): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/course`;

    const options = {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(course),
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    const response = await fetch(api_url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const create_student_enrollment = async (
  course_id: number,
  student_id: number
) => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/course/${course_id}/student/${student_id}`;

    const options = {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    };

    // @ts-ignore
    await fetch(api_url, options);
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

export {
  fetch_course_records,
  delete_course_record,
  create_course_record,
  fetch_enrolled_students,
  fetch_course_record_by_id,
  create_student_enrollment,
};
