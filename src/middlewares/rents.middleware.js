import { db } from "../database/database.connection.js"

export async function rentsValidate(req, res, next){
    const { customerId, gameId } = req.body
    try {
        const userExist = await db.query(`SELECT * FROM customers WHERE customers.id = $1`, [customerId]);
        const gameExist = await db.query(`SELECT * FROM games WHERE games.id = $1`, [gameId])
        
        const checkStock = await db.query(`'SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL'`, [gameId])
        const valueStock = checkStock.rowCount
        const stockTotal = gameExist.rows[0].stockTotal

        if ( userExist.rowCount === 0 || gameExist.rowCount === 0 || valueStock >= stockTotal) return res.sendStatus(400)
        
        res.locals.rents = { pricePerDay: gameExist.rows[0].pricePerDay }

        next ()
    } catch (error) {
        return res.status(500).send(error.message)
    }
}