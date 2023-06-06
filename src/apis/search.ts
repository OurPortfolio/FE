import axios from 'axios';
import { SERVER_URL } from '@src/constants/constants';

export const search = async term => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/portfolios/autocomplete?keyword=${term}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchPage = async (pageNum: number, searchTerm?: string) => {
  console.log(pageNum);
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/portfolios/search?keyword=${searchTerm}&page=${pageNum}&size=12`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
