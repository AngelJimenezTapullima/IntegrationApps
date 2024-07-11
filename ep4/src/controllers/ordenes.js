import {getConnection} from "./../database/database";

/*
SELECT `idorden`, c.nombre as cliente, p.nombre as producto, o.cantidad, o.total
FROM `ordenes` o 
INNER JOIN clientes c ON o.idcliente = c.id 
INNER JOIN productos p ON o.idproducto = p.id
*/
const getOrdenes = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT `idorden`, c.nombre as cliente, p.nombre as producto, o.cantidad, o.total FROM `ordenes` o INNER JOIN clientes c ON o.idcliente = c.id INNER JOIN productos p ON o.idproducto = p.id");
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const updateOrden = async (req, res)=>{
    try {
        const {idorden, idcliente, idproducto, cantidad} = req.body;
        if (idorden === undefined || idcliente === undefined || idproducto === undefined || cantidad === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }
        
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ordenes SET 
                                                        idcliente = ${idcliente},
                                                        idproducto = ${idproducto},
                                                        cantidad = ${cantidad}
                                                WHERE idorden = ${idorden}`);

        res.status(200).send("Orden actualizada correctamente")
        //res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delOrden = async (req, res)=>{
    try {
        const {idorden} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM ordenes WHERE idorden = ?", idorden);

        res.status(200).send("Orden eliminada correctamente")
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOrden = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT `idorden`, c.nombre as cliente, p.nombre as producto, o.cantidad, o.total FROM `ordenes` o INNER JOIN clientes c ON o.idcliente = c.id INNER JOIN productos p ON o.idproducto = p.id WHERE o.idorden = ?", id)

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addOrden = async (req, res)=>{
    try {
        
        const {idcliente, idproducto, cantidad} = req.body;
        if (idcliente === undefined || idproducto === undefined || cantidad === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO ordenes (idcliente, idproducto, cantidad)
                                                VALUES (${idcliente},${idproducto},${cantidad})`);

        res.status(200).send("Orden registrada correctamente");
        
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const methods = {
    getOrden,
    updateOrden,
    delOrden,
    getOrdenes,
    addOrden
};