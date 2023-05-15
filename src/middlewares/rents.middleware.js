import { db } from "../database/database.connection.js"

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