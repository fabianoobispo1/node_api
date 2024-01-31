import express from'express'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const app = express()
const port = 3333

const database = new Database()

app.use(express.json())

app.get('/users', (req, res) => {
  const { search } = req.query

  const users = database.select('users', search ? {
    name: search,
    email: search
  } : null)
 

  return  res.json(users).statusCode(200)

})


app.post('/users', (req, res) => {
  console.log(req.body)
  const { name, email } = req.body

  const user = {
    id: randomUUID(),
    name,
    email,
  }

  database.insert('users', user)

  return res.writeHead(201).end()
})


app.post('/edituser/:id', (req,res) => {
  const { id } = req.params
  const { name, email } = req.body

  database.update('users', id, {
    name,
    email,
  })

  return res.writeHead(204).end()
})

app.delete('/users/:id', (req,res) => {
  const { id } = req.params

  database.delete('users', id)

  return res.writeHead(204).end()
})




app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})