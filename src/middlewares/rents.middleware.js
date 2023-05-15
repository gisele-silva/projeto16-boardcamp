import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function rentsValidate(req, res, next){
  const rental = req.body
  const userExist = await db.query(`SELECT * FROM customers WHERE id=$1;`, [rental.customerId])
  const gameExist = await db.query(`SELECT * FROM games WHERE id=$1;`, [rental.gameId])
  const checkStock = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [rental.gameId])

  const valueStock = checkStock.rowCount
  const stockTotalGame = gameExist.rows[0].stockTotal

  if (userExist.rowCount === 0 || gameExist.rowCount === 0 || 
    valueStock >= stockTotalGame) return res.sendStatus(400)

  res.locals.rental = { ...rental, pricePerDay: gameExist.rows[0].pricePerDay }

  next()
}

export async function finishValidate(req, res, next){
    const { id } = req.params

    let rents = await db.query('SELECT * FROM rentals WHERE id=$1', [id])
    rents = rents.rows[0]
  
    if (!rents) return res.sendStatus(404)
    if (rents.returnDate) return res.sendStatus(400)
  
    const returnDate = dayjs().format('YYYY-MM-DD')
    const dateExpires = dayjs(rents.rentDate, 'day').add(rents.daysRented, 'day')
    const diffDays = dayjs().diff(dateExpires, 'day')
  
    let delayFee
  
    if (diffDays > 0) delayFee = diffDays * (rents.originalPrice / rents.daysRented)
  
    res.locals.rental = { returnDate, delayFee, id }
  
    next()
}