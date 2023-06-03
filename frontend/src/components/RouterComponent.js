import { useState } from "react";
import "./Rout.css";
import ModalWindow from "../UI/ModalWindow";
import { updateTrains, deleteTrains } from "../utils/fetchData";
import { trueFormDate } from "../utils/trueFormDate";

const Rout = ({ Date, id, StartCity, FinishCity }) => {
  const [openWindow, setOpenWindow] = useState(false);

  const date = trueFormDate(Date, true);

  const closeWindow = () => {
    setOpenWindow(false);
  };

  const openModalWindowHandler = () => {
    setOpenWindow(true);
  };
  const updateTrainsHandler = async (newStartCity, newFinishCity, newDate) => {
    updateTrains(id, newStartCity.value, newFinishCity.value, newDate);
  };
  const deleteTrainsHandler = async () => {
    deleteTrains(id);
  };
  return (
    <div>
      <div onClick={openModalWindowHandler}>
        <div className="page">
          <div className="cityBlock">
            <label>Звідки</label>
            <div>{StartCity}</div>
          </div>
          <div className="cityBlock">
            <label>Куди</label>
            <div>{FinishCity}</div>
          </div>
          <div className="date">{date}</div>
        </div>
      </div>
      {openWindow ? (
        <ModalWindow
          onClose={closeWindow}
          isOpen={openWindow}
          create={updateTrainsHandler}
          funckDelete={deleteTrainsHandler}
          isUpdate={true}
        />
      ) : null}
    </div>
  );
};

export default Rout;
