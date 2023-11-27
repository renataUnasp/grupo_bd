const express = require('express');
const EditoraService = require('../services/EditoraService');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const editoras = await EditoraService.listarEditoras();
    res.json(editoras);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar editoras." });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = await EditoraService.adicionarEditora(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar editora." });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await EditoraService.atualizarEditora(req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar editora." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await EditoraService.deletarEditora(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar editora." });
  }
});

module.exports = router;