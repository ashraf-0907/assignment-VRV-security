export enum Measurement{
    GRAM = "GRAM",
    KILOGRAM = "KILOGRAM",
    LITRE = "LITRE",
    MILILITRE = "MILILITRE",
    PIECE = "PIECE"
}

export class RegisteredProduct{

    businessId : string
    productName : string
    measurement : Measurement

    constructor(businessId : string,
        productName : string,
        measurement : Measurement){

            this.businessId = businessId;
            this.productName = productName;
            this.measurement = measurement;
    }

    static getDefaultRegisteredProduct():RegisteredProduct{

        return new RegisteredProduct("" , "" , Measurement.PIECE);
    }

    static fromJSON(registeredProductObject:any):RegisteredProduct{

        let registeredProduct:RegisteredProduct = null;

        if(registeredProductObject){

            registeredProduct = this.getDefaultRegisteredProduct();
            registeredProduct.businessId = registeredProductObject.businessId ?? "";
            registeredProduct.productName = registeredProductObject.productName ?? "";
            registeredProduct.measurement = registeredProductObject.measurement ?? Measurement.PIECE;
            
        }

        return registeredProduct;

    }
}