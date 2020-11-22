import AWS from 'aws-sdk';
import CSV from 'csv-parser';
import { BUCKET } from '../constants/bucket-constants';

const asyncReadableStreamForTheRecords = async ( readableStream ) => {
    return new Promise (
        ( resolve, reject ) => {
            readableStream
                .pipe( CSV() )
                .on( 'data', ( data ) => console.log( "Record: ", data ) )
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
        
        await asyncReadableStreamForTheRecords( readableStream );
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