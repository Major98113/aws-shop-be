import products from '../products.json';

export default class ProductsService {
    constructor( products ){
        this.products = products;
    }

    async getProductById( id ){
        const desiredProduct = products.find( ( item, i ) => item.id === id );
        
        return desiredProduct;
    }

    async getProductsList(){
        return products;
    }
}