const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multipleChoice = require("../frontend/src/components/multiplechoice");
const pregunta = require("../frontend/src/components/pregunta");
const profesor = require("../frontend/src/components/profesor");

const app = express();
app.use(express.json());
app.use(cors());

// Ruta para almacenar la evaluación en formato JSON
app.post("/evaluacion", (req, res) => {
  const evaluacion = req.body;

  const evaluacionJSON = JSON.stringify(evaluacion);
  const filePath = path.join(__dirname, "database", "evaluacion.json");

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFile(filePath, evaluacionJSON, (err) => {
    if (err) {
      console.error("Error al almacenar la evaluación:", err);
      res.status(500).send("Error al almacenar la evaluación");
    } else {
      console.log("Evaluación almacenada exitosamente.");
      res.status(200).send("Evaluación almacenada exitosamente");
    }
  });
});

// Ejemplo de uso
const evaluacion = {
  preguntas: [
    { pregunta: "¿Cuál es la capital de Francia?", respuesta: "París" },
    { pregunta: "¿Cuál es el resultado de 2 + 2?", respuesta: "4" },
    // Agrega más preguntas y respuestas según tus necesidades
  ],
};

// Llamada a la función para almacenar la evaluación
almacenarEvaluacion(evaluacion);

// Función para almacenar la evaluación
function almacenarEvaluacion(evaluacion) {
  const evaluacionJSON = JSON.stringify(evaluacion);
  const filePath = path.join(__dirname, "../database", "evaluacion.json");
  fs.writeFile(filePath, evaluacionJSON, (err) => {
    if (err) {
      console.error("Error al almacenar la evaluación:", err);
    } else {
      console.log("Evaluación almacenada exitosamente.");
    }
  });
}

// Iniciar el servidor
app.listen(6969, () => {
  console.log("Servidor iniciado en el puerto 6969");
});
