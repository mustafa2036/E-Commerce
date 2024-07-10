import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'


const app = express()
const port = 3000
app.use(express.json());
bootstrap(app)

// 4
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 401))
})
// 3
app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))