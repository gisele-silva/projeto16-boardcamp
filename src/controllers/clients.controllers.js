import { db } from "../database/database.connection.js"

export async function allClients (req, res){
    try {
        const clients = await db.query(`SELECT * FROM customers;`)
        res.send(clients.rows)
    } catch (error) {
        return res.status(500).send(error.message) 
    }
}


export async function oneClient (req, res){
    const { id } = req.params

    try {
        const findClient = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])

        if (findClient.rowCount === 0) return res.sendStatus(404)
        
        res.send(findClient.rows[0])

    } catch (error) {
        return res.status(500).send(error.message) 
    }
    
} 


export async function insertClient (req, res){
    const {name, phone, cpf, birthday} = req.body;
    
    try {
        const clientExist = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
        if (clientExist.rowCount !== 0) return res.status(409).send("Cliente existente")

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

     res.sendStatus(200)

    } catch (error) {
        return res.status(500).send(error.message) 
    }
    
}


export async function updateClient (req, res){
    const { id } = req.params
    const {name, phone, cpf, birthday} = req.body;

    try {
        const clientExist = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (clientExist.rowCount === 0) return res.status(409).send("Cliente não cadastrado")

        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [name, phone, cpf, birthday, id])

        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }

    
}