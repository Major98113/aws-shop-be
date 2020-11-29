export const basicAuthorizer = async event => {
    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
    }
}