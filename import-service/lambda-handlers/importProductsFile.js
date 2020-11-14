import AWS from 'aws-sdk';
import { BUCKET } from '../constants/bucket-constants';

export const importProductsFile = async event => {
    try{
      const S3 = new AWS.S3({ region: 'us-east-1' });
      const params = {
        Bucket: BUCKET,
        Prefix: 'uploaded/'
      }
      
      const s3Response = await S3.listObjectsV2( params ).promise();
      const data = s3Response.Contents;

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify( data )
      }
    }
    catch(error) {
      console.error( error );
      return {
        statusCode: 500,
        body: "Something went wrong!"
      };
    }
  };