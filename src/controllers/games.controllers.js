import { db } from "../database/database.connection.js"

export async function allGames (req, res){
    
    try {
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function newGame (req, res){
    
    const {name, image, stockTotal, pricePerDay}  = req.body

    try {
        
        const nameExist = await db.query(`SELECT * FROM games WHERE name = $1;` [name]);
        if(nameExist.rowCount !== 0) return res.status(409).send("Game exist");

        await db.query(` INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4);`, 
            [name, image, stockTotal, pricePerDay]);

        return res.status(201).send("ok");

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

