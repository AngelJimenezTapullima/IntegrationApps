import {getConnection} from "./../database/database";

const getClientes = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM clientes ORDER BY id");
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const updateCliente = async (req, res)=>{
    try {
        const {id, nombre, email, telefono, domicilio} = req.body;
        if (id === undefined || nombre === undefined || email === undefined || telefono === undefined || domicilio === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`UPDATE clientes SET 
                                                        nombre = '${nombre}',
                                                        email = '${email}',
                                                        telefono = '${telefono}',
                                                        domicilio = '${domicilio}'
                                                WHERE id = ${id}`);

        res.status(200).send("Cliente actualizado correctamente")
        //res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delCliente = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM clientes WHERE id = ?", id);

        res.status(200).send("Cliente eliminado correctamente")
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getCliente = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM clientes WHERE id = ?", id)

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addCliente = async (req, res)=>{
    try {
        
        const {nombre, email, telefono, domicilio} = req.body;
        if (nombre === undefined || email === undefined || telefono === undefined || domicilio === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO clientes (nombre, email, telefono, domicilio)
                                                VALUES ('${nombre}','${email}','${telefono}','${domicilio}')`);

        res.status(200).send("Cliente registrado correctamente");
        
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const methods = {
    getCliente,
    updateCliente,
    delCliente,
    getClientes,
    addCliente
};