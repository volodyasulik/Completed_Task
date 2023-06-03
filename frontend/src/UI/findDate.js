import { DatePicker } from "antd";

const dateFormat = "DD-MM-YYYY";

const Date = (props) => {
  return <DatePicker format={dateFormat} onChange={(e) => props.set(e?.$d)} />;
};

export default Date;
