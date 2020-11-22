import AWS from 'aws-sdk';

export const catalogBatchProcess = async ( event, context, callback ) => {
    const sqs = new AWS.SQS();
    const records = event.Records.map( ({ body }) => console.log( `Message received from queue and it bodt: ${ body }`) );

    console.log( records );

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
}