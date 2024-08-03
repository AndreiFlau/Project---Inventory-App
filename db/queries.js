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

async function getSingleInstrument(id) {
  const result = await pool.query("SELECT * FROM instruments WHERE id = ($1)", [id]);
  const instrument = result.rows[0];
  return {
    id: instrument.id,
    name: instrument.name,
    description: instrument.description,
    price: instrument.price,
    categoryId: instrument.category_id,
  };
}

async function addInstrument(name, description, price, category) {
  await pool.query(
    `
    INSERT INTO instruments (name, description, price, category_id)
    VALUES ($1,$2,$3,$4)`,
    [name, description, price, category]
  );
}

async function deleteCategory(instrumentId) {
  await pool.query(
    `
    DELETE FROM instruments
    WHERE instruments.id = ($1)`,
    [instrumentId]
  );
}

async function editInstrument(id, name, description, price, category) {
  await pool.query(
    `
    UPDATE instruments
    SET name = ($1),
    description = ($2),
    price = ($3),
    category_id = ($4)
    WHERE id = ($5)`,
    [name, description, price, category, id]
  );
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}

async function getSingleCategory(id) {
  const result = await pool.query("SELECT * FROM categories WHERE id = ($1)", [id]);
  const category = result.rows[0];
  return {
    id: category.id,
    name: category.name,
  };
}

async function createCategory(name) {
  await pool.query(
    `
    INSERT INTO categories (name)
    VALUES ($1)
    `,
    [name]
  );
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

async function deleteCategory(categoryId) {
  await pool.query(
    `
    DELETE FROM categories
    WHERE categories.id = ($1)`,
    [categoryId]
  );
}

async function editCategory(id, name) {
  await pool.query(
    `
    UPDATE categories
    SET name = ($1)
    WHERE id = ($2)`,
    [name, id]
  );
}

module.exports = {
  getAllInstruments,
  getSingleInstrument,
  deleteInstrument: deleteCategory,
  addInstrument,
  editInstrument,
  getCategories,
  getSingleCategory,
  getInstrumentsByCategories,
  createCategory,
  deleteCategory,
  editCategory,
};
