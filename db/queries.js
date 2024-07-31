const pool = require("./pool");

async function getAllInstruments() {
  const { rows } = await pool.query("SELECT * FROM instruments");
  return rows.map((instrument) => ({
    id: instrument.id,
    name: instrument.name,
    description: instrument.description,
    price: instrument.price,
    categoryId: instrument.category_id,
  }));
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}

async function getInstrumentsByCategories(categoryName) {
  const { rows } = await pool.query(
    `SELECT     
    instruments.id AS instrument_id,
    instruments.name AS instrument_name,
    instruments.description,
    instruments.price,
    categories.id AS category_id,
    categories.name AS category_name
    FROM instruments INNER JOIN categories ON instruments.category_id = categories.id 
    WHERE categories.name iLIKE $1`,
    [categoryName]
  );
  console.log(rows);
  return rows.map((instrument) => ({
    id: instrument.instrument_id,
    name: instrument.instrument_name,
    description: instrument.description,
    price: instrument.price,
    categoryId: instrument.category_id,
    categoryName: instrument.category_name,
  }));
}

module.exports = {
  getAllInstruments,
  getCategories,
  getInstrumentsByCategories,
};