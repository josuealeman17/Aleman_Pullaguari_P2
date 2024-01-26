const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const EVALUACIONES_DIR = './evaluaciones';

app.post('/evaluaciones', (req, res) => {
  try {
    const { profesor, preguntas } = req.body;
    const evaluacion = { profesor, preguntas };
    const fileName = `${Date.now()}.json`;
    fs.writeFileSync(`${EVALUACIONES_DIR}/${fileName}`, JSON.stringify(evaluacion, null, 2));
    res.status(201).json({ message: 'Evaluación guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la evaluación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
