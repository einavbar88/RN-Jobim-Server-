const express = require('express')
const cors = require('cors')

const UsersRouter = require('./router/UsersRouter')
const JobsRouter = require('./router/JobsRouter')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(UsersRouter)
app.use(JobsRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
