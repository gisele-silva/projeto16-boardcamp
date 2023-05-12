import { db } from "../database/database.connection.js"

export async function allClients (req, res){
    try {
        const clients = await db.query(`SELECT * FROM customers`)
        res.send(clients.rows)
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}


export async function oneClient (req, res){

}


export async function insertClient (req, res){
    const {name, phone, cpf, birthday} = req.body;
    
    const clientExist = await db.query(`SELECT * FROM games WHERE name = $1`, [cpf])
    if (clientExist.rowCount !== 0) return res.status(409).send("Cliente existente")

    await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])

    res.sendStatus(200)
}


export async function updateClient (req, res){
    
}