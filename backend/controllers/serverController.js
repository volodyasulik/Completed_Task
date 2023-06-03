const pool = require("../server");

exports.getRouters = async () => {
  try {
    const trains =
      await pool.query(`SELECT trains.id, trains.Date, startCity.City AS StartStation, finishCity.City AS FinishStation
          FROM trains
          LEFT JOIN citys AS startCity ON trains.startCity_id = startCity.Id
          LEFT JOIN citys AS finishCity ON trains.finishCity_id = finishCity.Id`);

    return trains[0];
  } catch (err) {
    throw err;
  }
};

exports.postRout = async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO \`trains\` (\`id\`, \`startCity_id\`, \`finishCity_id\`, \`Date\`) VALUES ('${req.body.id}', '${req.body.startCity_id}', '${req.body.finishCity_id}', '${req.body.Date}')`
    );
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};

exports.patchRout = async (params, id) => {
  try {
    await pool.query(
      `UPDATE \`trains\` SET ${params} WHERE \`trains\`.\`id\` = ${id}`
    );
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};

exports.deleteRout = async (id) => {
  console.log(id);
  try {
    await pool.query(`DELETE FROM trains WHERE \`trains\`.\`id\` = ${id}`);
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};

exports.findBy = async (params) => {
  const sqlReq = `SELECT trains.id, trains.Date, startCity.City AS StartStation, finishCity.City AS FinishStation FROM trains LEFT JOIN citys AS startCity ON trains.startCity_id = startCity.Id LEFT JOIN citys AS finishCity ON trains.finishCity_id = finishCity.Id WHERE ${params}`;
  try {
    const response = await pool.query(sqlReq);
    return { status: "success", data: response[0] };
  } catch (err) {
    throw err;
  }
};

exports.sortByDate = async (sort) => {
  try {
    const response = await pool.query(
      `SELECT trains.id, trains.Date, startCity.City AS StartStation, finishCity.City AS FinishStation
          FROM trains
          LEFT JOIN citys AS startCity ON trains.startCity_id = startCity.Id
          LEFT JOIN citys AS finishCity ON trains.finishCity_id = finishCity.Id ORDER BY \`Date\` ${sort} LIMIT 5`
    );
    return { status: "success", data: response[0] };
  } catch (err) {
    throw err;
  }
};
exports.getCitysList = async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM \`citys\``);
    return {
      status: "success",
      data: response[0],
    };
  } catch (err) {
    throw err;
  }
};

exports.addCity = async (req) => {
  try {
    await pool.query(
      `INSERT INTO \`citys\` (\`id\`, \`City\`) VALUES ('${req.body.id}', '${req.body.City}')`
    );
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};
