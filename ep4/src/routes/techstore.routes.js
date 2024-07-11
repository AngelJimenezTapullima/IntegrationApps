import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as productoController} from "./../controllers/producto";
import {methods as clienteController} from "./../controllers/cliente";
import {methods as categoriaController} from "./../controllers/categoria";
import {methods as ordenController} from "./../controllers/ordenes";

const router = Router();

router.get("/api/productos", productoController.getProductos);
router.get("/api/producto/:id", productoController.getProducto);
router.post("/api/addproducto", productoController.addProducto);
router.delete("/api/producto", productoController.delProducto);
router.put("/api/producto", productoController.updateProducto);

router.get("/api/clientes", clienteController.getClientes);
router.get("/api/cliente/:id", clienteController.getCliente);
router.post("/api/addcliente", clienteController.addCliente);
router.delete("/api/cliente", clienteController.delCliente);
router.put("/api/cliente", clienteController.updateCliente);

router.get("/api/categorias", categoriaController.getCategorias);
router.get("/api/categoria/:id", categoriaController.getCategoria);
router.post("/api/addcategoria", categoriaController.addCategoria);
router.delete("/api/categoria", categoriaController.delCategoria);
router.put("/api/categoria", categoriaController.updateCategoria);

router.get("/api/ordenes", ordenController.getOrdenes);
router.get("/api/orden/:id", ordenController.getOrden);
router.post("/api/addorden", ordenController.addOrden);
router.delete("/api/orden", ordenController.delOrden);
router.put("/api/orden", ordenController.updateOrden);

export default router;