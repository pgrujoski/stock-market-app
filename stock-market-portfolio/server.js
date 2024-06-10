const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())