import ProductsService from '../services/products.service';

export const createProduct = async event => {
    try{
        console.info( "createProduct handler was invoked with next args: ", JSON.stringify( event.body ) );
        
        const productsServiceInstance = new ProductsService( process.env );
        
        await productsServiceInstance.DB.connect();
    
        const createdProduct = await productsServiceInstance.createProduct(
            JSON.parse( event.body )
        );
        
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify( createdProduct )
        }
      }
    catch(error) {
        console.error(JSON.stringify(error));
        
        return {
          statusCode: 500,
          body: "Something went wrong!"
        };
      }
}