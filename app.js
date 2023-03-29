const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurantList.results.find(item =>
        item.id.toString() === req.params.id)

    res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
    const filterRestaurants = restaurantList.results.filter(item => {
        if (item.name.toLowerCase().includes(req.query.keyword.toLowerCase())) {
            return item
        } else if (item.category.toLowerCase().includes(req.query.keyword.toLowerCase())) {
            return item
        }
    })

    res.render('index', { restaurants: filterRestaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`)
})

app.use(express.static('public'))