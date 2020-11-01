import products from '../products.json';
import ProductsService from '../services/products.service';

export const getAllProducts = async event => {
  try{
    const productsServiceInstance = new ProductsService( products );
    const allProducts = await productsServiceInstance.getProductsList();
    
    return {
      statusCode: 200,
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
