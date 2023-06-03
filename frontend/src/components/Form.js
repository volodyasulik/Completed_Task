import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import Select from "react-select";
import { trueFormDate } from "../utils/trueFormDate";

import "./Form.css";
import { citysList } from "../utils/citysList";
import { fetchCitys } from "../utils/fetchData";

const dateFormat = "DD-MM-YYYY";

const Form = (props) => {
  const [citys, setCitys] = useState();
  const [startCitySelected, setStartCitySelected] = useState(null);
  const [finishCitySelected, setFinishCitySelected] = useState(null);
  const [someDate, setDate] = useState(null);

  useEffect(() => {
    fetchCitys(setCitys);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    let trueFormatDate = trueFormDate(someDate);
    props.onSubmit(
      startCitySelected?.value,
      finishCitySelected?.value,
      trueFormatDate
    );
  };
  const options = citysList(citys);

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="selects-block">
        <div className="selected-block">
          <label>Звідки</label>
          <Select
            defaultValue={startCitySelected}
            onChange={setStartCitySelected}
            options={options}
            className="select"
          />
        </div>
        <div className="selected-block">
          <label>Куди</label>
          <Select
            defaultValue={finishCitySelected}
            onChange={setFinishCitySelected}
            options={options}
            className="select"
          />
        </div>
        <div className="date-block">
          <DatePicker format={dateFormat} onChange={(e) => setDate(e?.$d)} />
        </div>
      </div>
      <button>ЗНАЙТИ</button>
    </form>
  );
};

export default Form;
