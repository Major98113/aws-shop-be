import { Client } from 'pg';

export default class PostgresClient {
    constructor( { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } ) {
        const dbOptions = {
            host: PG_HOST,
            port: PG_PORT,
            database: PG_DATABASE,
            user: PG_USERNAME,
            password: PG_PASSWORD,
            ssl: {
                rejectUnauthorized: false
            },
            connectionTimeoutMillis: 5000 
        };

        this.client = new Client(dbOptions);
    }

    async connect() {
        try {
            await this.client.connect();
        }
        catch( error ) {
            console.log( "Can not connect with DB, reason: ", JSON.stringify( error ));
        }
    }

    async query( queryStr = '' ) {
        try {
            return await this.client.query( queryStr );
        }
        catch( error ) {
            console.log( "Query error: ", error );
        }
    }

    async disconnect() {
        try {
            await this.client.end();
        }
        catch( error ) {
            console.log( "Cannot disconnect with DB, reason: ", JSON.stringify( error ));
        }
    }
}
