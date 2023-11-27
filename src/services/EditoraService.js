const pool = require('../config/database');

async function listarEditoras() {
  const [editoras] = await pool.query('SELECT * FROM Editoras');
  return editoras;
}

async function adicionarEditora(Editora) {
  const { nome, endereco, telefone } = Editora;
  // Você vai criar o INSERT INTO abaixo.
  const [results] = await pool.query('INSERT INTO Editoras (nome, endereco, telefone) VALUES (?, ?, ?)', [nome, endereco, telefone]);
  return results.insertId;
}

async function atualizarEditora(id, Editora) {
  const { nome, endereco, telefone } = Editora;
  // Você vai criar o UPDATE abaixo.
  await pool.query('UPDATE Editoras SET nome = ?, endereco = ?, telefone = ? WHERE id = ?', [nome, endereco, telefone, id]);
}

async function deletarEditora(id) {
  // Você vai criar o DELETE abaixo.
  await pool.query('DELETE FROM Editoras WHERE id = ?', [id]);
}

module.exports = {
  listarEditoras,
  adicionarEditora,
  atualizarEditora,
  deletarEditora
};