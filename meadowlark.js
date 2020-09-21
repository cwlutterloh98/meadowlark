const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

// static middleware
app.use(express.static(__dirname + '/public'))

// custom home
app.get('/', (req, res) => res.render('home'))

// custom about with random fortune cookie
app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: randomFortune })
})



// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

/**************************** Replaced by Handlebars Layout *****************************/
/*
app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Meadowlark Travel');
})

app.get('/about', (req, res) => {
  res.type('text/plain')
  res.send('About Meadowlark Travel')
})

// custom 404 page
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

*/
app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
  
// constants
const fortunes = [
  "Friendship is an ocean that you cannot see bottom.",
  "An old friend will reenter your life.",
  "Big changes ahead.",
  "Happiness is a road to deception.",
  "At the summit of the mountain is a path back down.",
]