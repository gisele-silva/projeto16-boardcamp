import { db } from "../database/database.connection.js"

export async function clientsValidate(req, res, next){
    const { cpf } = req.body
    
    try {
        const cpfExist = await db.query(`SELECT * FROM customers WHERE customers.cpf=$1;`, [cpf])
        if(cpfExist.rowCount !== 0) return res.status(409).send("User exist");    
        
        next()

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function clientsId(req, res, next){
    const { id } = req.params;
    
    try {
        const idExist = await db.query(`SELECT * FROM customers WHERE customers.id=$1;`, [id])
        if(idExist.rowCount === 0) return res.status(404).send("Id don't exist");    
        
        next()

    } catch (error) {
        return res.status(500).send(error.message)
    }
}