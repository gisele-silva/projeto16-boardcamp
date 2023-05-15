import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function allRents(req, res){
   
    try {
     const { rows } = await db.query(`
        SELECT 
        rentals.*, 
        customers.id AS "idCustomer", customers.name AS "customerName", 
        games.id AS "idGame",  games.name AS "gameName", 
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON games.id = rentals."gameId"`);

        const results = rows.map(({ idCustomer, customerName, idGame, gameName, ...rental }) => {
            return {
              ...rental,
              customer: { id: idCustomer, name:  customerName },
              game: { id: idGame, name: gameName }
            }
          })
      
          res.send(results)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function newRents(req, res){
    
    const { customerId, gameId, daysRented, pricePerDay } = res.locals.rental

  try {
    const originalPrice = daysRented * pricePerDay

    await db.query(`
    INSERT 
    INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", 
    "originalPrice", "delayFee") 
    VALUES ($1, $2, $3, $4, null, $5, null);
    `, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, originalPrice])

    res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function finishRents(req, res){
    const { returnDate, delayFee, id } = res.locals.rental
    
    try {
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`, 
        [returnDate, delayFee, id])
        
        return res.sendStatus(200)
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
  
      await db.query("DELETE FROM rentals WHERE id=$1", [id])
  
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  
  }