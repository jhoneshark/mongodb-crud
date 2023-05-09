const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const handlebars = require('handlebars');

handlebars.registerHelper('startsWith', function (str, prefix) {
  return str.startsWith(prefix);
});


const productsRoutes = require('./routes/productsRoutes')


app.engine('handlebars', exphbs.engine())
app.set('view engine' , 'handlebars')

//read body
app.use(express.urlencoded({
    extended:true
})
)

app.use(express.json())

app.use(express.static('public'))

app.use('/products', productsRoutes)
app.listen(3000)