const express = require('express');
const AutorService = require('../services/AutorService');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const autores = await AutorService.listarAutores();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar autores." });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = await AutorService.adicionarAutor(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar autor." });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await AutorService.atualizarAutor(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar autor." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await AutorService.deletarAutor(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar autor." });
  }
});

module.exports = router;