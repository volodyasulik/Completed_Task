import { useEffect, useState } from "react";
import Rout from "./RouterComponent";
import Form from "./Form";
import {
  findTrains,
  sortData,
  addNewTrains,
  addCity,
} from "../utils/fetchData";
import "./Main.css";
import {
  HomeOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import ModalWindow from "../UI/ModalWindow";

let list;
const iconSortOptions = { fontSize: 30, color: "grey" };
const iconAddOptions = { fontSize: 30, color: "rgb(71, 199, 71)" };
const iconAddCityOptions = { fontSize: 30, color: "blue" };
const Main = () => {
  const [data, setData] = useState();
  const [sort, setSort] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);

  const [openCityWindow, setOpenCityWindow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await sortData(setData, true);
    };

    fetchData();
  }, []);

  const findHandler = async (start, finish, date) => {
    if (start || finish) {
      list = [start, finish, date];
    }

    await findTrains(start, finish, date, sort, setData);
  };

  const sortHandler = async () => {
    if (!list) {
      sortData(setData, sort);
      setSort(!sort);
    } else {
      await findTrains(...list, sort, setData);
      setSort(!sort);
    }
  };
  const closeWindow = () => {
    setOpenWindow(false);
  };
  const closeCityWindow = () => {
    setOpenCityWindow(false);
  };
  const openAddTrainsModalWindowHandler = () => {
    setOpenWindow(true);
  };
  const openAddCityModalWindowHandler = () => {
    setOpenCityWindow(true);
  };
  const addNewTrainsHandler = async (start, finish, data) => {
    await addNewTrains(start.value, finish.value, data);
  };
  const addNewCityHandler = async (city) => {
    await addCity(city);
  };
  return (
    <div className="block">
      <Form onSubmit={findHandler} />
      <div>
        <div className="button-block">
          <Button className="button sort" onClick={sortHandler}>
            {sort ? (
              <SortAscendingOutlined style={iconSortOptions} />
            ) : (
              <SortDescendingOutlined style={iconSortOptions} />
            )}
          </Button>
          <div className="adds-block">
            <Button
              className="button add-city"
              onClick={openAddCityModalWindowHandler}
            >
              <HomeOutlined style={iconAddCityOptions} />
            </Button>
            <Button
              className="button add-train"
              onClick={openAddTrainsModalWindowHandler}
            >
              <PlusOutlined style={iconAddOptions} />
            </Button>
          </div>
        </div>
        {data && Array.isArray(data.data) ? (
          data.data.map((el) => (
            <Rout
              key={el.id}
              StartCity={el.StartStation}
              FinishCity={el.FinishStation}
              Date={el.Date}
              id={el.id}
            />
          ))
        ) : (
          <div>Hello</div>
        )}
      </div>
      <ModalWindow
        onClose={closeWindow}
        isOpen={openWindow}
        create={addNewTrainsHandler}
        isUpdate={false}
      />
      <ModalWindow
        onClose={closeCityWindow}
        isOpen={openCityWindow}
        create={addNewCityHandler}
        isUpdate={false}
        isAddCity={true}
      />
    </div>
  );
};

export default Main;
