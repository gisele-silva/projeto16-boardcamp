import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function allClients (req, res){
    
    try {
        const clients = await db.query(`SELECT * FROM customers;`)
        
        clients.rows.map((c) => 
            {c.birthday = dayjs(c.birthday).format("YYYY-MM-DD")
        })

        return res.send(clients.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export async function oneClient (req, res){
    const { id } = req.params

    try {
        const client = await db.query(`SELECT * FROM customers WHERE customers.id = $1;`, [id])
        
        client.rows[0].birthday = dayjs(client.rows[0].birthday).format("YYYY-MM-DD");


        return res.send(client.rows[0])

    } catch (error) {
        return res.status(500).send(error.message)
    }
} 


export async function insertClient (req, res){
    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);`, 
        [name, phone, cpf, birthday]);

        return res.status(201).send("ok");
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


export async function updateClient (req, res){
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, 
        [name, phone, cpf, birthday, id])
        
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }     
}