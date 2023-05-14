import { db } from "../database/database.connection.js"

export async function allGames (req, res){
    
    try {
        const games = await db.query(`SELECT * FROM games`)
        return res.send(games.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function newGame (req, res){
    
    const {name, image, stockTotal, pricePerDay}  = req.body

    try {
        await db.query(` INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4);`, 
            [name, image, stockTotal, pricePerDay]);

        return res.status(201).send("ok");

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

