import ProductsService from '../services/products.service';

export const getAllProducts = async event => {
  try{
    console.info( "getAllProducts handler was invoked" );

    const productsServiceInstance = new ProductsService( process.env );
    
    await productsServiceInstance.DB.connect();

    const allProducts = await productsServiceInstance.getProductsList();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify( allProducts )
    }
  }
  catch(error) {
    console.error(JSON.stringify(error));
    
    return {
      statusCode: 500,
      body: "Something went wrong!"
    };
  }
};
