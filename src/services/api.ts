import axios from "axios";

const API_URL =
  "https://pr42dgkcsb.execute-api.ap-south-1.amazonaws.com";

export const saveWellnessLog =
  async (data: any) => {
    try {
      const response =
        await axios.post(
          `${API_URL}/wellness`,
          data
        );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export const getWellnessLogs =
  async () => {
    try {
      const response =
        await axios.get(
          `${API_URL}/wellness?userId=keerthi123`
        );

      console.log(
        "AWS Logs:",
        response.data
      );

      return response.data;
    } catch (error) {
      console.error(
        "Fetch Error:",
        error
      );
    }
  };
  export const updateWellnessLog =
  async (data: any) => {
    try {
      const response =
        await axios.put(
          `${API_URL}/wellness`,
          data
        );

      return response.data;
    } catch (error) {
      console.error(
        "Update Error:",
        error
      );
    }
  };
  export const deleteWellnessLog =
  async (
    userId: string,
    date: string
  ) => {
    try {
      const response =
        await axios.delete(
          `${API_URL}/wellness`,
          {
            data: {
              userId,
              date,
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );
    }
  };