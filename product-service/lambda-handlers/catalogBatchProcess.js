import AWS from 'aws-sdk';

import ProductsService from '../services/products.service';

export const catalogBatchProcess = async ( event, context, callback ) => {
  try{
    for (const { body } of event.Records) {
      const record = JSON.parse( body );  
      const productsServiceInstance = new ProductsService( process.env );
        
      await productsServiceInstance.DB.connect();
      
      console.log( "createdProduct started : ", JSON.stringify( record ) );
      const createdProduct = await productsServiceInstance.createProduct( record );
      console.log( "createdProduct finished : ", JSON.stringify( createdProduct ) );
    }
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
  catch( err ){
    console.error( err );
    return {
      statusCode: 500,
      body: "Something went wrong"
    }
  }
}