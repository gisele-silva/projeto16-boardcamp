import { db } from "../database/database.connection.js"

export async function allGames (req, res){
    try {
        const jogos = await db.query(`SELECT * FROM games`)
        res.send(jogos.rows[0])
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}

export async function newGame (req, res){
    const {name, image, stockTotal, pricePerDay} = req.body

    try {
        const gameExist = await db.query(`SELECT * FROM games WHERE name = $1`, [game.name])
        if (gameExist.rowCount !== 0) return res.status(409).send("Jogo existente")

        await db.query(`INSERT INTO games (name, image, stockTotal, pricePerDay) 
        VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])

        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}

