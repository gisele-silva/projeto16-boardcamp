import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function allRents(req, res){
    try {
        const { rents } = await db.query(`
        SELECT FROM rentals.*, games.name, games.id, customers.name, customers.id
        JOIN games ON rentals.gameId = games.id 
        JOIN rentals.customersId ON customers.id;`)

        return res.send(rents.rows)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function newRents(req, res){
    
    const  { customerId, gameId, daysRented } = req.body
    const { pricePerDay } = res.locals.rents 
    const originalPrice = daysRented * pricePerDay

    try {
        await db.query(` INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", 
        "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, null, $5, null);
    `, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, originalPrice])

    res.sendStatus(201)

        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function finishRents(req, res){
    try {
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function deleteRents(req, res){
    const { id } = req.params

    try {
        const { rows, rowCount } = await db.query('SELECT * FROM rentals WHERE id=$1', [id])

        if (rowCount === 0) return res.sendStatus(404)
        if (!rows[0].returnDate) return res.sendStatus(400)

        await db.query(`DELETE FROM rentals WHERE rentals.id = $1`, [$1])
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}