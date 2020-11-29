import AWS from 'aws-sdk';
import CSV from 'csv-parser';
import { BUCKET } from '../constants/bucket-constants';

const results = [];

const uploadRecordToSqs = async ( record ) => {
  try{
    const { SQS_CATALOG_ITEMS_QUEUE } = process.env;
    const sqs = new AWS.SQS();

    return await sqs.sendMessage({
      QueueUrl: SQS_CATALOG_ITEMS_QUEUE,
      MessageBody: JSON.stringify( record )
    }).promise();
  }
  catch( error ) {
    console.error( "Error while SQS data uploading", error );
  }
}

const asyncReadableStreamForTheRecords = async ( readableStream ) => {
    return new Promise (
        ( resolve, reject ) => {
            readableStream
                .pipe( CSV() )
                .on( 'data', ( data ) => results.push( data ) )
                .on( 'error', reject )
                .on( 'end', () => { 
                    console.log( "End of parsed records");
                    resolve();
                });
        }
    );
}

export const importFileParser = async event => {
    try{
      const S3 = new AWS.S3({ region: 'us-east-1' });
      const s3Records = event.Records;

      for( const s3Record of s3Records ) {
        const newFilePath = s3Record.s3.object.key;
        const params = {
            Bucket: BUCKET,
            Key: newFilePath
          };
        const readableStream = S3.getObject( params ).createReadStream();
        
        console.info( `Start reading from S3 bucket`);
        
        await asyncReadableStreamForTheRecords( readableStream );
        
        console.info( `Finished reading from S3 bucket`);
        console.info( `Started SQS uploading`);

        await Promise.all( 
          results.map( async ( record ) => {
            try {
              await uploadRecordToSqs( record );

              console.info( `Message ${ JSON.stringify( record ) } was successfully uploaded in SQS` );
            }
            catch( err ) {
              console.log( `Error in sending message proccess: ${ err }`);
            }
          })
        );

      console.info( `FInished SQS uploading`);

      }

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: "All records are parsered!!!"
      }
    }
    catch(error) {

      console.error( "Critical unHandled exception:", error );
      return {
        statusCode: 500,
        body: "Something went wrong!"
      };
    }
  };