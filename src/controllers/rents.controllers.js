import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function allRents(req, res){
    const { customerId, gameId } = req.query

    const findAllJoin = `
        SELECT rentals.*, 
        customers.id AS "idCustomer", customers.name AS "customerName", 
        games.id AS "idGame",  games.name AS "gameName", 
        games."categoryId", categories.name AS "categoryName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON games.id = rentals."gameId"
        JOIN categories ON categories.id = games."categoryId"`;
    
    try {
     
        const { rows } = customerId? await db.query(findAllJoin + 'WHERE "customerId"=$1;', [Number(customerId),])
        : gameId? await connectionDB.query(findAllJoin + 'WHERE "gameId"=$1;', [Number(gameId),])
        : db.query(queryGlobal);
  
      res.send(rows);

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
    const { id } = req.params;

  try {
    const rents = await connectionDB.query("SELECT * FROM rentals WHERE id=$1", [id]);
    const rental = rents.rows[0];
    if (rents.rowCount === 0) return res.sendStatus(404);
    if (!rental.returnDate) return res.sendStatus(400);

    await db.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}