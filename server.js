const express = require('express')
const { notebookRouter } = require('./Routes/notebookRoutes')

const app = express()

app.use(express.json())
app.use('/notebook', notebookRouter)

app.use((err, req, res, next) => {
    res.json({Error: err})
})

app.listen(4500, ()=>{
    console.log('Server running on port 4500');
})