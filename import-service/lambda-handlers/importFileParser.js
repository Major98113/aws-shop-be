import AWS from 'aws-sdk';
import { BUCKET } from '../constants/bucket-constants';

export const importFileParser = async event => {
    try{
      const S3 = new AWS.S3({ region: 'us-east-1' });
      const params = {
        Bucket: BUCKET,
        Prefix: 'uploaded/'
      }
      
      

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(  )
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