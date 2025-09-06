import express from 'express'
import cors from 'cors'
import { Router } from 'express'

const app = express();

app.use(cors());
app.use(express.json());

