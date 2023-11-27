const pool = require('../config/database');

async function listarLivros() {
    const [results] = await pool.query('SELECT * FROM livros');
    return results;
}

async function adicionarLivro(livro) {
    const { titulo, autor, dataPublicacao } = livro;
    const [results] = await pool.query('INSERT INTO livros (titulo, autor, dataPublicacao) VALUES (?, ?, ?)', [titulo, autor, dataPublicacao]);
    return results.insertId;
}

async function atualizarLivro(id, livro) {
    const { titulo, autor, dataPublicacao } = livro;
    await pool.query('UPDATE livros SET titulo = ?, autor = ?, dataPublicacao = ? WHERE id = ?', [titulo, autor, dataPublicacao, id]);
}

async function deletarLivro(id) {
    await pool.query('DELETE FROM livros WHERE id = ?', [id]);
}

module.exports = {
    listarLivros,
    adicionarLivro,
    atualizarLivro,
    deletarLivro
};