import {getConnection} from "./../database/database";

/*
SELECT p.id, p.nombre, p.descripcion, p.precio, p.cantidad, c.descripcion as `categoria` 
FROM `productos` p INNER JOIN `categorias` c ON p.categoria = c.id;
*/
const getProductos = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT p.id, p.nombre, p.descripcion, p.precio, p.cantidad, c.descripcion as `categoria` FROM productos p INNER JOIN `categorias` c ON p.categoria = c.id ORDER BY p.id");
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const updateProducto = async (req, res)=>{
    try {
        const {id, nombre, descripcion, precio, cantidad, categoria} = req.body;
        if (id === undefined || nombre === undefined || descripcion === undefined || precio === undefined || cantidad === undefined || categoria === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`UPDATE productos SET 
                                                        nombre = '${nombre}',
                                                        descripcion = '${descripcion}',
                                                        precio = ${precio},
                                                        cantidad = ${cantidad},
                                                        categoria = ${categoria}
                                                WHERE id = ${id}`);

        res.status(200).send("Producto actualizado correctamente")
        //res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delProducto = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM productos WHERE id = ?", id);

        res.status(200).send("Producto eliminado correctamente")
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getProducto = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT p.id, p.nombre, p.descripcion, p.precio, p.cantidad, c.descripcion as `categoria` FROM productos p INNER JOIN `categorias` c ON p.categoria = c.id WHERE p.id = ?", id)

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addProducto = async (req, res)=>{
    try {
        
        const {nombre, descripcion, precio, cantidad, categoria} = req.body;
        if (nombre === undefined || descripcion === undefined || precio === undefined || cantidad === undefined || categoria === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO productos (nombre, descripcion, precio, cantidad, categoria)
                                                VALUES ('${nombre}','${descripcion}',${precio},${cantidad},${categoria})`);

        res.status(200).send("Producto registrado correctamente");
        
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const methods = {
    getProducto,
    updateProducto,
    delProducto,
    getProductos,
    addProducto
};