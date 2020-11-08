import PostgresDB from '../config/postgres.config';
export default class ProductsService {
    constructor( env ){
        this.DB = new PostgresDB( env );
    }

    async getProductById( id ) {
        try {
            const { rows: [ product ] } = await this.DB.query(`
                SELECT products.id, products.title, products.description, products.price, products.logo, stocks.count 
                FROM products 
                INNER JOIN stocks ON 
                products.id = '${ id }'
                AND stocks.product_id = '${ id }';`
            );

            return product;
        }
        catch( error ) {
            console.log( "Method getProductById. Error: ", error );
        }
        
    }

    async getProductsList() {
        try{
            const { rows } = await this.DB.query(
                `SELECT products.id, products.title, products.description, products.price, products.logo, stocks.count 
                 FROM products 
                 INNER JOIN stocks ON 
                 products.id = stocks.product_id;`
            );

            return rows;
        }
        catch( error ) {
            console.log( "Method getProductsList. Error: ", error );
        }
    }

    async createProduct( product ) {
        try{
            const { title, description, price, logo, count } = product;
            const { rows: [ createdProductRecord ] } = await this.DB.query(
                `INSERT INTO products ( title, description, price, logo ) VALUES
                 ( '${ title }', '${ description }', ${ price }, '${ logo }' ) 
                RETURNING *`
            );
            const { rows: [ createdStockRecord ] } = await this.DB.query(
                `INSERT INTO stocks ( product_id, count ) VALUES
                 ( '${ createdProductRecord.id }', ${ count } ) 
                RETURNING *`
            ); 

            return {
                ...createdProductRecord,
                count: createdStockRecord.count
            };
        }
        catch( error ) {
            console.log( "Method createProduct. Error: ", error );
        }
    }
}
