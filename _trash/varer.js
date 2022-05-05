const express = require('express');

const app = express();

app.use(express.json());

const PORT = 9000;

app.listen(PORT, () =>{
    console.log('Serveren lytter på 9000');
});
let varer =  [
    {
        "productID" : "PM1",
        "productName" : "Gryder",
        "productPrice" :  1000, 
        "ProductCategory" : "kitchen",
        "productPriceFormatted" : "DKK 1.000,00", 
        "inStock" : true,
        "relatedProducts": [
            {"productID": "PM8"}
        ]
    },
    {
            "productID" : "PM2",
            "productName" : "Biler",
            "productPrice" :  2500, 
            "ProductCategory" : "Spare time",
            "productPriceFormatted" : "DKK 2.500,00", 
            "inStock" : true, 
            "relatedProducts": [
                {"productID": "PM4"},
                {"productID": "PM5"},
                {"productID": "PM7"}
        ]
    },
    {
        "productID" : "PM3",
        "productName" : "Hugo Boss mens suit",
        "productPrice" :  2000, 
        "ProductCategory" : "Clothes",
        "productPriceFormatted" : "DKK 2.000,00", 
        "inStock" : true, 
        "relatedProducts": [
            {"productID": "PM6"}
        ] 
    },
    {
        "productID" : "PM4",
        "productName" : "Mobiltelefoner",
        "productPrice" :  1500, 
        "ProductCategory" : "Spare time",
        "productPriceFormatted" : "DKK 1.500,00", 
        "inStock" : true, 
        "relatedProducts": [
            {"productID": "PM2"},
            {"productID": "PM5"},
            {"productID": "PM7"}
        ] 
    },
    {
        "productID" : "PM5",
        "productName" : "Cykler",
        "productPrice" :  1500, 
        "ProductCategory" : "Spare time",
        "productPriceFormatted" : "DKK 1.500,00", 
        "inStock" : true, 
        "relatedProducts": [
            {"productID": "PM2"},
            {"productID": "PM4"},
            {"productID": "PM7"}
        ] 
    },
    {
        "productID" : "PM6",
        "productName" : "Støvler",
        "productPrice" :  900, 
        "ProductCategory" : "Clothes",
        "productPriceFormatted" : "DKK 900,00", 
        "inStock" : true, 
        "relatedProducts": [
            {"productID": "PM3"}       
        ] 
    },
    {
        "productID" : "PM7",
        "productName" : "Højtaler",
        "productPrice" :  700, 
        "ProductCategory" : "Spare time",
        "productPriceFormatted" : "DKK 700,00", 
        "inStock" : true, 
        "relatedProducts": [
            {"productID": "PM2"},
            {"productID": "PM4"},
            {"productID": "PM5"}
        ] 
    },
    {
        "productID" : "PM8",
        "productName" : "Knive",
        "productPrice" :  500, 
        "ProductCategory" : "kitchen",
        "productPriceFormatted" : "DKK 500,00", 
        "inStock" : true,
        "relatedProducts": [
            {"productID": "PM1"}
        ]}
    ]
