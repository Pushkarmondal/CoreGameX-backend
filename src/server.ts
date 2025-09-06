import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import { config } from './config';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes)

app.listen(config.PORT, () => {
    console.log(`App is running on PORT NO: ${config.PORT}`)
})