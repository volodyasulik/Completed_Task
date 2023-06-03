const controllers = require("./serverController");

function generateRandomNumber() {
  const min = 0;
  const max = 2147483647;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const paddedNumber = randomNumber.toString().padStart(11, "0");

  return paddedNumber;
}
exports.generateId = (req, res, next) => {
  req.body.id = generateRandomNumber();
  next();
};

exports.getRouters = async (req, res) => {
  const response = await controllers.getRouters();

  res.status(200).json(response);
};

exports.postRout = async (req, res) => {
  try {
    const response = await controllers.postRout(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

exports.patchRout = async (req, res) => {
  const params = Object.entries(req.body)
    .filter(([key]) => key !== "id")
    .reduce((acc, [key, value], index) => {
      if (index !== 0) {
        acc += ", ";
      }
      acc += `\`${key}\` = '${value}'`;
      return acc;
    }, ``);
  try {
    const response = await controllers.patchRout(params, req.body.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

exports.deleteRout = async (req, res) => {
  try {
    const response = await controllers.deleteRout(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

exports.findBy = async (req, res) => {
  let params = Object.entries(req.query)
    .filter(([key, value]) => key !== "sort")
    .reduce((acc, [key, value], index) => {
      if (key === "Date") {
        acc += ` Date >= '${value}' AND Date <= DATE_ADD('${value}', INTERVAL 7 DAY) AND`;
      } else {
        acc += ` ${key} = '${value}' AND`;
      }

      return acc;
    }, ``);
  if (params.endsWith(" AND")) {
    params = params.slice(0, -4);
  }
  if (req.query.sort) {
    params += ` ORDER BY \`Date\` ${req.query.sort}`;
  }

  try {
    const response = await controllers.findBy(params);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

exports.sortByDate = async (req, res, next) => {
  if (req.query.sort) {
    try {
      const response = await controllers.sortByDate(req.query.sort);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({
        status: err,
      });
    }
  } else {
    return next();
  }
};
