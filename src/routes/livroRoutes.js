const express = require('express');
const LivroService = require('../services/LivroService');
const router = express.Router();

// Rotas da API de livros
router.get('/', async (req, res) => {
    try {
        const livros = await LivroService.listarLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar livros." });
    }
});

router.post('/', async (req, res) => {
    try {
        const id = await LivroService.adicionarLivro(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar livro." });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await LivroService.atualizarLivro(req.params.id, req.body);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar livro." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await LivroService.deletarLivro(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar livro." });
    }
});

module.exports = router;
