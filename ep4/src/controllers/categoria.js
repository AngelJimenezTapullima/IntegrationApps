import {getConnection} from "./../database/database";

const getCategorias = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categorias ORDER BY id");
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const updateCategoria = async (req, res)=>{
    try {
        const {id, descripcion} = req.body;
        if (id === undefined || descripcion === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`UPDATE categorias SET
                                                        descripcion = '${descripcion}'
                                                WHERE id = ${id}`);

        res.status(200).send("Categoria actualizada correctamente")
        //res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delCategoria = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categorias WHERE id = ?", id);

        res.status(200).send("Categoria eliminada correctamente")
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getCategoria = async (req, res)=>{
    try {
        const {id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categorias WHERE id = ?", id)

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addCategoria = async (req, res)=>{
    try {
        
        const {descripcion} = req.body;
        if (descripcion === undefined) {
            res.status(400).json({"message":"Bad request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO categorias (descripcion)
                                                VALUES ('${descripcion}')`);

        res.status(200).send("Categoria registrada correctamente");
        
    } catch (error) {
        res.status(500).send(error.message)
    }
};

export const methods = {
    getCategoria,
    updateCategoria,
    delCategoria,
    getCategorias,
    addCategoria
};