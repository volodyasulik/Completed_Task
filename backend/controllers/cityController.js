const controllers = require("./serverController");

exports.getCitysList = async (req, res) => {
  try {
    const response = await controllers.getCitysList();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

exports.addCity = async (req, res) => {
  try {
    const response = await controllers.addCity(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};
