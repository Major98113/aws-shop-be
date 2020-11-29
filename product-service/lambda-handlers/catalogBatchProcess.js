import AWS from 'aws-sdk';

import ProductsService from '../services/products.service';

export const catalogBatchProcess = async ( event, context, callback ) => {
  try{
    for (const { body } of event.Records) {
      const record = JSON.parse( body );  
      const productsServiceInstance = new ProductsService( process.env );
        
      await productsServiceInstance.DB.connect();
      
      console.log( "createdProduct started" );
      const createdProduct = await productsServiceInstance.createProduct( record );
      console.log( "createdProduct finished" );

      const sns = new AWS.SNS();

      console.log( "Start notification to: ", process.env.SNS_ARN );
      await sns.publish({
        Subject: "Product created",
        Message: JSON.stringify( createdProduct ),
        TopicArn: process.env.SNS_ARN
      }).promise();
      console.log( "Finish notification");
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