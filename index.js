const router = require('./src/routes/app-info.route')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(404).send()
})

app.use('/app-info', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
