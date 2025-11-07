import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Basededatos14*", 
  database: "skyflow"
})

db.connect(err => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err.message);
  } else {
    console.log("✅ Conectado a la base skyflow");
  }
});

app.get("/api/consultar_vuelo", (req, res) => {
  const numero = req.query.numero;
  console.log("Número recibido:", numero);

  if (!numero) return res.status(400).send("Falta número de vuelo");

  db.query("SELECT * FROM vuelos WHERE numero = ?", [numero], (err, rows) => {
    if (err) {
      console.error("❌ Error en la consulta:", err.message);
      return res.status(500).send(err.message);
    }
    console.log("Resultados de la consulta:", rows);
    res.json(rows);
  });
});

app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
