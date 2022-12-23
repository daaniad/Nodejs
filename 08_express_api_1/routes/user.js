// imports
import express from 'express'
import { USERS_BBDD } from '../bbdd.js'
// Creamos un router
const userRouter = express.Router()

userRouter.use((req, res, next) => {
  console.log(
    'Se ejecuta nuestra función definida en el middleware de account'
  )
  next()
})

// obtener los detalles de la cuenta
userRouter.get('/:guid', (req, res) => {
  const { guid } = req.params
  const user = USERS_BBDD.find((user) => user.guid === guid)
  if (!user) return res.status(404).send()
  res.send({ 'color de ojos': user.eyeColor, edad: user.age })
})

userRouter.patch('/:guid', (req, res) => {
  const { guid } = req.params
  const { age } = req.body
  const user = USERS_BBDD.find((user) => user.guid === guid)

  if (!age) return res.status(400)

  if (!user) return res.status(404).send()

  user.age = age
  res.send(user)
})
export default userRouter