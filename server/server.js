// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Database
require(`./config/db`)


// Express
const express = require(`express`)
const app = express()
// #for session only
// app.use(require(`express-session`)({
//     secret: process.env.SESSION_PRIVATE_KEY,
//     resave: false,
//     cookie: {secure: false, maxAge: 60000},
//     saveUninitialized: true
// }))

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))


// Routers
app.use(require(`./routes/cars`))
app.use(require(`./routes/users`))
app.use(require(`./routes/products`))
app.use(require('./routes/carts'))
app.use(require('./routes/sales'))
// Port
app.listen(process.env.SERVER_PORT, () => 
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})