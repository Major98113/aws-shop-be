import AWS from 'aws-sdk';
import { BUCKET } from '../constants/bucket-constants';

export const importProductsFile = async event => {
    try{
      const { queryStringParameters: { name }} = event;
      const params = {
        Bucket: BUCKET,
        Key: `uploaded/${ name }`,
        Expires: 60,
        ContentType: 'application/vnd.ms-excel'
      };
      const S3 = new AWS.S3({ region: 'us-east-1' });
      const url = await S3.getSignedUrlPromise( 'putObject', params );

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: url
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