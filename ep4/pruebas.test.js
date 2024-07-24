import { methods } from './src/controllers/categoria';
import { getConnection } from './src/database/database'

jest.mock('./src/database/database', () => ({
    getConnection: jest.fn(),
}));

describe('Controlador de categorías', () => {

    it('Obtener una categoría por id', async () => {
        const mquery = jest.fn();
        const cn = { query: mquery };
        getConnection.mockResolvedValue(cn);

        const req = {
            body: {
                id: 1
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await methods.getCategoria(req, res);

        expect(getConnection).toHaveBeenCalled();
        expect(mquery).toHaveBeenCalledWith(
            "SELECT * FROM categorias WHERE id = ?",1
        );

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('Actualizar una categoría', async () => {
        const mquery = jest.fn();
        const cn = { query: mquery };
        getConnection.mockResolvedValue(cn);

        const req = {
            body: {
                id: 1,
                descripcion: 'NUEVA DESCRIPCIÓN',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await methods.updateCategoria(req, res);

        expect(getConnection).toHaveBeenCalled();
        expect(mquery).toHaveBeenCalledWith(
            "UPDATE categorias SET descripcion = 'NUEVA DESCRIPCIÓN' WHERE id = 1"
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Categoria actualizada correctamente');
    });

});

