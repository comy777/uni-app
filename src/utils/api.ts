import axios, { isAxiosError } from 'axios';

const baseURL = import.meta.env.DEV_BASE_URL;
const apiKey = import.meta.env.DEV_API_KEY;

const apiNews = axios.create({ baseURL, params: { apiKey } });

export const queryApi = async <T>(url: string, query: string): Promise<T | undefined> => {
  try {
    const { data } = await apiNews.get<T>(`${url}?q=${query}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      console.log(error.response.data);
      return;
    }
    console.log(error);
  }
};
