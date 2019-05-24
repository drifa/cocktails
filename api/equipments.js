const { query } = require('../utils/db');

// =========
//    GET
// =========

async function getEquipmentsDB(id) {
  return await query('SELECT * FROM equipments WHERE id=$1;', [id]);
}

async function getEquipment(req, res) {
  const { id } = req.params;
  res.json(await getEquipmentsDB(id));
}

async function getAllEquipmentsDB(queryString) {
  return await query('SELECT * FROM equipments WHERE title ILIKE $1;', ['%'+queryString+'%']);
}

async function getAllEquipments(req, res) {
  if (typeof req.query.query != 'undefined') {
    const result = await getAllEquipmentsDB(req.query.query);
    res.json({
      count: result.rowCount,
      items: result.rows
    });
  } else {
    const result = await getAllEquipmentsDB('');
    res.json({
      count: result.rowCount,
      items: result.rows
    });
  }
}

// ==========
//    POST
// ==========

async function createEquipmentDB(title) {
  const result = await query('INSERT INTO equipments (title) VALUES ($1) RETURNING id, title;', [title]);
  return result.rows[0];
}

async function createEquipment(req, res) {  
  res.json(await createEquipmentDB(req.body.title));
}

module.exports = {
  getEquipment,
  createEquipment,
  getAllEquipments,
};