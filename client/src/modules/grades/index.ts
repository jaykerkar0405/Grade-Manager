// App's Internal Imports
// import { Grades } from "../../types";

// App's External Imports
import toast from "react-hot-toast";

const fetch_grade_records = async (): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/grade/all`;

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

const fetch_grade_records_by_student_id = async (id: number): Promise<any> => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/grade/student/${id}`;

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

const fetch_grade_records_by_course_id = async (id: number): Promise<any> => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/grade/course/${id}`;

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

    return { grade_record: data, grade_record_response: response };
  } catch (error) {
    toast.error("Internal server error", { id: "internal_server_error" });
    throw error;
  }
};

const delete_grade_record = async (
  course_id: number,
  student_id: number
): Promise<any> => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/grade/student/${student_id}/course/${course_id}`;

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

const create_grade_record = async (
  score: string,
  course_id: number,
  student_id: number
): Promise<any> => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/grade/student/${student_id}/course/${course_id}`;

    const options = {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ score: score }),
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

const edit_grade_record = async (
  score: string,
  course_id: number,
  student_id: number
) => {
  try {
    const api_url = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/api/grade/student/${student_id}/course/${course_id}`;

    const options = {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({ score: score }),
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
  edit_grade_record,
  fetch_grade_records,
  delete_grade_record,
  create_grade_record,
  fetch_grade_records_by_course_id,
  fetch_grade_records_by_student_id,
};
