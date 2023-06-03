import axios from "axios";
import { checkCurrendDate } from "./checkCurrentDate";
import { trueFormDate } from "./trueFormDate";

export const fetchCitys = async (set) => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/citys/");
    set(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const findTrains = async (start, finish, date, sort, set) => {
  let query = "";
  if (start) {
    query += `startCity_id=${start}&`;
  }
  if (finish) {
    query += `finishCity_id=${finish}&`;
  }
  if (sort) {
    query += `sort=DESC&`;
  } else {
    query += `sort=ASC&`;
  }

  if (checkCurrendDate(date)) {
    query += `Date=${date}&`;
  }
  if (query.endsWith("&")) {
    query = query.slice(0, -1);
  }
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/trains/filter?${query}`
    );

    set(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const sortData = async (set, sort) => {
  let query;
  if (sort) {
    query = "DESC";
  } else {
    query = "ASC";
  }
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/trains/?sort=${query}`
    );

    set(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const updateTrains = async (id, startCity_id, finishCity_id, Date) => {
  let trueData = trueFormDate(Date);
  if (!checkCurrendDate(trueData)) {
    trueData = null;
  }
  const updateObj = {
    id: id,
    startCity_id: startCity_id,
    finishCity_id: finishCity_id,
    Date: trueData,
  };

  if (!updateObj.Date) {
    delete updateObj.Date;
  }
  try {
    await axios.patch("http://127.0.0.1:3000/trains/", updateObj);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTrains = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:3000/trains/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const addNewTrains = async (startCity_id, finishCity_id, Date) => {
  const trueData = trueFormDate(Date);
  try {
    await axios.post("http://127.0.0.1:3000/trains/", {
      startCity_id: startCity_id,
      finishCity_id: finishCity_id,
      Date: trueData,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addCity = async (city) => {
  try {
    await axios.post("http://127.0.0.1:3000/citys/", {
      City: city,
    });
  } catch (error) {
    console.error(error);
  }
};
