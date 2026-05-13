const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
})

module.exports = app
