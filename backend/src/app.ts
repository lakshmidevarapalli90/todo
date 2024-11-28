import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from './routes/todo';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/todo', todoRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
