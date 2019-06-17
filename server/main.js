const express = require('express')
const cors = require('cors')
const app = express()

const JsonDB = require('node-json-db');
const JsonDBConfig = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new JsonDBConfig.Config("CDTheque", true, true, '/'));

try {
  let artists = db.getData('/artists')
} catch (err) {
  db.push('/artists', [])
}

app.use(cors())
app.use(express.json())

// Recupere le tableau d'artistes
app.get('/artists', function (req, res) {
  try {
    res.json(db.getData('/artists'))
  } catch(err) {
    res.json(err)
  }
})

// Recupere l'artiste à l'index id dans le tableau artistes
app.get('/artist/:id', function(req, res) {
  try {
    res.json(db.getData(`/artists[${req.params.id}]`))
  } catch(err) {
    res.json(err)
  }
})

// Ajoute un artiste au tableau artiste
app.post('/artist', function(req, res) {
  try {
    db.push('/artists[]', req.body)
    res.json(db.getData('/artists[-1]'))
  } catch(err) {
    res.json(err)
  }
})

// Modifie l'artiste à l'index id dans le tableau artistes
app.post('/artist/:id', function(req, res) {
  try {
    db.push(`/artists[${req.params.id}]`, req.body)
    res.json(db.getData(`/artists[${req.params.id}]`))
  } catch(err) {
    res.json(err)
  }
})

// Supprime l'artiste à l'index id dans le tableau artistes
app.delete('/artist/:id', function(req, res) {
  try {
    db.delete(`/artists[${req.params.id}]`)
    res.json(true)
  } catch(err) {
    res.json(err)
  }
})

app.listen(3000, function () {
  console.log('CDTheque app listening on port 3000!')
})
