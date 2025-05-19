// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./connection");

const { v4: uuidv4 } = require('uuid'); // importa o gerador de ID


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Conectar ao MongoDB
connect();

// Modelo do atendimento
const mongoose = require("mongoose");

const AtendimentoSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // ID manual
  nome: String,
  descricao: String,
  data: String,
  empresa: String
});

const Atendimento = mongoose.model("Atendimento", AtendimentoSchema);

app.get("/api/atendimentos", async (req, res) => {
  try {
    const atendimentos = await Atendimento.find().sort({ data: -1 });
    res.json(atendimentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/atendimentos", async (req, res) => {
  try {
    const novoAtendimento = {
      id: uuidv4(), // Aqui o ID é garantido
      nome: req.body.nome,
      descricao: req.body.descricao,
      data: req.body.data,
      empresa: req.body.empresa
    };

    const atendimento = new Atendimento(novoAtendimento);
    const saved = await atendimento.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta: ${port}`);
});

// Rota para deletar atendimento por ID
app.delete("/api/atendimentos/:id", async (req, res) => {
  try {
    const result = await Atendimento.findOneAndDelete({ id: req.params.id });

    if (!result) {
      return res.status(404).json({ error: "Atendimento não encontrado." });
    }

    res.json({ message: "Atendimento excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

