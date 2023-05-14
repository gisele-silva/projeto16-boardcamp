import { db } from "../database/database.connection.js";

export async function gameValidate (req, res, next){
    const {name} = req.body

    try {
        const nameExist = await db.query(`SELECT * FROM games WHERE games.name=$1;`, [name]);
        if(nameExist.rowCount !== 0) return res.status(409).send("Game exist");

        next()
    } catch (error) {
        return res.status(500).send(error.message)
    }
}