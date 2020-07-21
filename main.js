
var mark=-1;

const barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];

function printReceipt(barcodes) {
    console.log(`
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`)
    return createMenu(barcodes);
}

function isBarcodesEmpty(barcodes){
    if(barcodes.length<=0){
        return true;
    }
    return false;
}

function createMenu(barcodes){
    if(isBarcodesEmpty(barcodes)){
        return null;
    }
    var menu=[];
    var meals=[
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
    ];
    var meal= {
        barcode: '',
        name: '',
        price: '',
        amount: ''
    };
    for(var i=0;i<barcodes.length;i++){
        var barcodeMeal = isBarcodeExist(barcodes[i],meals);
        if(barcodeMeal!==undefined){
            var barcodeMenu=isMenuContainsMeal(barcodeMeal,menu);
            if(barcodeMenu==undefined){
                meal.barcode=barcodeMeal.barcode;
                meal.name=barcodeMeal.name;
                meal.price=barcodeMeal.price;
                meal.amount=1;
                barcodeMenu=meal;
            }else{
                barcodeMenu.amount++;
            }
            saveOrFlushMenu(barcodeMenu,this.mark,menu);
        }
    }
    return createReceipt(menu);
}

function createReceipt(finalMenu){
    var totalPrice=0;
    var receipt="***<store earning no money>Receipt ***\n";
    finalMenu.forEach(menu => {
        receipt=receipt+"Name: "+menu.name+", Quantity: "+menu.amount+", Unit price: "+menu.price+" (yuan), Subtotal: "+menu.price*menu.amount+" (yuan)\n";
        totalPrice=totalPrice+menu.price*menu.amount;
    });

    receipt=receipt+"----------------------\nTotal: "+totalPrice+" (yuan)\n**********************";
    return receipt;
}


function isBarcodeExist(barcode,meals){
    return meals.find(function(x){
        return barcode==x.barcode;
    })
}

function isMenuContainsMeal(barcodeMeal,menu){
    this.mark=-1;
    return menu.find((x,index) =>{
        if(x.barcode==barcodeMeal.barcode){
            this.mark=index;
            return true;
        }else{
            return false;
        }
    })
}

function saveOrFlushMenu(barcodeMenu,mark,menu){
    if(mark!=-1){
        menu[mark]=barcodeMenu;
    }else{
        menu.push(barcodeMenu);
    }
}

module.exports = {
    printReceipt
};