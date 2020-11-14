export const importProductsFile = async event => {
    try{
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: "Hi, i am importProductsFile lambda"
      }
    }
    catch(error) {
      return {
        statusCode: 500,
        body: "Something went wrong!"
      };
    }
  };