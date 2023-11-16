import express from 'express'
import cors from 'cors'
import { db } from './src/config/db'
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    })
})


app.listen(port, () => {
    console.log(`Serving at ${port}`)
})


try {
    db.sync({ force: false , alter: true})
    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default app
