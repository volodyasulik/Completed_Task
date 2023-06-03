import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import "./ModalWindow.css";
import Select from "react-select";
import { DeleteOutlined } from "@ant-design/icons";
import Date from "./findDate";

import { citysList } from "../utils/citysList";
import { fetchCitys } from "../utils/fetchData";
const ModalWindow = ({
  isOpen,
  onClose,
  title,
  create,
  funckDelete,
  isUpdate,
  isAddCity,
}) => {
  const [citys, setCitys] = useState();
  const [loading, setLoading] = useState(false);
  const [newStartCity, setNewStartCity] = useState("");
  const [newFinishCity, setNewFinishCity] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newDate, setDate] = useState(null);
  useEffect(() => {
    fetchCitys(setCitys);
  }, []);

  const handleOk = async () => {
    setLoading(true);
    if (isAddCity) {
      await create(newCity);
    } else {
      await create(newStartCity, newFinishCity, newDate);
    }

    setLoading(false);
    onClose();
    window.location.reload();
  };
  const deleteHandler = async () => {
    await funckDelete();
    window.location.reload();
  };

  const handleCancel = () => {
    onClose();
  };
  const options = citysList(citys);
  return (
    <>
      <Modal
        open={isOpen}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          funckDelete && (
            <Button key="back" onClick={deleteHandler}>
              <DeleteOutlined style={{ fontSize: "16px", color: "red" }} />
            </Button>
          ),

          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {isUpdate ? "ОБНОВИТИ" : "ДОДАТИ"}
          </Button>,
        ]}
      >
        <div className="modal">
          <div className="modal-content">
            <form className="update-form">
              {isAddCity ? (
                <div className="input-block">
                  <label>Додати нове місто</label>
                  <Input
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Нове місто..."
                  />
                </div>
              ) : (
                <div>
                  <div className="input-block">
                    <label>Нове місто відправлення</label>
                    <Select
                      defaultValue={newStartCity}
                      onChange={setNewStartCity}
                      options={options}
                      className="select"
                    />
                  </div>
                  <div className="input-block">
                    <label>Нове місто прибуття</label>
                    <Select
                      defaultValue={newFinishCity}
                      onChange={setNewFinishCity}
                      options={options}
                      className="select"
                    />
                  </div>
                  <div className="date-block">
                    <Date set={setDate} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
