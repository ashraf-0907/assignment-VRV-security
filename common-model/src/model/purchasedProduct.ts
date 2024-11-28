export class PurchasedProduct {

    productId:string;
    quantity:number;
    priceOFEachQuantity:number;

    constructor(    productId:string,
        quantity:number,
        priceOFEachQuantity:number){

            this.productId = productId;
            this.priceOFEachQuantity = priceOFEachQuantity;
            this.quantity = quantity;
    }

    static defaultPurchasedProduct():PurchasedProduct{

        return new PurchasedProduct("" , 0 , 0);

    }

    static fromJson(purchasedProductObject):PurchasedProduct{

        let purchasedProduct:PurchasedProduct = null;

        if(purchasedProductObject){
            purchasedProduct = this.defaultPurchasedProduct();
            purchasedProduct.priceOFEachQuantity = purchasedProductObject.priceOFEachQuantity ?? 0;
            purchasedProduct.productId = purchasedProductObject.productId ?? "";
            purchasedProduct.quantity = purchasedProductObject.quantity ?? 0;
        }

        return purchasedProduct;
    }
}