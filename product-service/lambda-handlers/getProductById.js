import ProductsService from '../services/products.service';
export const getProductById = async event => {
  try{
    const { productId = '' } = event.pathParameters;
    const productsServiceInstance = new ProductsService( process.env );
    
    await productsServiceInstance.DB.connect();

    const desiredProduct = await productsServiceInstance.getProductById( productId );

    if( !desiredProduct )
      return {
        statusCode: 404,
        body: "Product not found!"
      };
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify( desiredProduct )
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