import products from '../products.json';
import ProductsService from '../services/products.service';

export const getProductById = async event => {
  try{
    const { productId = '' } = event.pathParameters;
    const productsServiceInstance = new ProductsService( products );
    const desiredProduct = await productsServiceInstance.getProductById( productId );

    if( !desiredProduct )
      return {
        statusCode: 404,
        body: "Product not found!"
      };
    
    return {
      statusCode: 200,
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