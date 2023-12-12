const express = require('express');
const articleRouter = require('./routers/article');
const app = express()
const router = require('./routers');
const port = 3000
const cors = require('cors');


app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})