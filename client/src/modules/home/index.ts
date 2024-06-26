// App's Internal Imports
import { Home } from "../../types";

// App's External Imports
import toast from "react-hot-toast";

const fetch_student_records = async (): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/student/all`;

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

const fetch_student_record_by_id = async (id: number): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/student/${id}`;

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

const delete_student_record = async (id: number): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/student/${id}`;

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

const create_student_record = async (student: Home): Promise<any> => {
  try {
    const api_url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/student`;

    const options = {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(student),
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

export {
  fetch_student_records,
  delete_student_record,
  create_student_record,
  fetch_student_record_by_id,
};
