export class Item{
    barcode: number | string;
	description: string;
	discount: number;
	images: string;
	itemType: string;
	maxOrderQuantity: number;
	name : string;
	publish: boolean;
	qrCode: number | string;
	salePrice: number;
	unitPrice : number;
	sku: string;
	itemID: number;//itemID
    categoryID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
//	  this.itemID =5;
	}
}
export class Properties{
	name: string;
	value: string; 
	propertiesID: number;
	itemID: number;	
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }   
}
export class Category{
	categoryName: string;
	description: string;
	level: number;
	hasSubCategory: string;
	categoryID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }   
}
export class Stock{
	   id: number;
       sku: string;
       barcode: string;
       itemID: number;
	   name: string;
	   description:string;
       images: string;
       categoryName: string;
       maxOrderQuantity: number;
       itemType: string;
       quantityInStock: number;
       stockTrackingDate: Date;
       discount: number;
       unitPrice: number;
       publish: boolean;	  
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }   
}

export class StockLevel{
	stockTrackingDate: Date;
	quantityInStock: number;
	stockLevelID: number;
	itemID: number;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }   
}
export class _StockLevel{
	calculate_stock_lebel: String;
    constructor(values: Object = {}) {
        //Constructor initialization
        Object.assign(this, values);            
    }   
}
