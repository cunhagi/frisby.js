const frisby = require('frisby');
var url = "https://sandbox.moip.com.br/v2/orders";

frisby.globalSetup({
    request: {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("LIAWRTIBIKKWYRRTX6GPIILKFSHBFXEP:UZQ8TKOQZAHNWYBAM4CJYELTQXRRNQ6Q4ZTKUNI5").toString('base64'),
        'Content-Type': 'application/json',
      }
    }
  });

describe('Funcionalidade: Realizar pedidos ', function () {

var ownID =  "order_id_00" +  Math.floor((Math.random() * 1000) + 1);
console.log("ID Gerado: " + ownID);

  it ('Realizar pedido cliente novo', function () {
    return frisby
      .post(url, {
        "ownId": ownID,
        "amount": {
          "currency": "BRL",
          "subtotals": {
            "shipping": 1500
          }
        },
        "items": [
          {
            "product": "Câmera fotográfica",
            "category": "CAMERAS",
            "quantity": 1,
            "detail": "Câmera fotográfica, modelo CM54296, cor preta",
            "price": 100000
          }
        ],
        "customer": {
          "ownId": "customer_id_003",
          "fullname": "Marcos Monteiro",
          "email": "marcos@email.com",
          "birthDate": "1980-01-07",
          "taxDocument": {
            "type": "CPF",
            "number": "57390209674"
          },
          "phone": {
            "countryCode": "55",
            "areaCode": "11",
            "number": "88763546"
          },
          "shippingAddress": {
            "street": "Avenida 23 de Maio",
            "streetNumber": 654,
            "complement": 12,
            "district": "Centro",
            "city": "Sao Paulo",
            "state": "SP",
            "country": "BRA",
            "zipCode": "01244500"
          }
        }
      })
      .expect('status', 201)
      .expect('bodyContains', ownID)
  });  

  it ('Realizar pedido com ID de cliente inválido', function () {
    return frisby
      .post(url, {  
        "ownId":"order_id_011",
        "amount":{  
           "currency":"BRL",
           "subtotals":{  
              "shipping":2050
           }
        },
        "items":[  
           {  
              "product":"Descrição do pedido",
              "category":"CLOTHING",
              "quantity":1,
              "detail":"Blusa Básica",
              "price":5000
           }
        ],
        "customer":{  
           "id":"CUS-5X3FO74LPSXQ111"
        }
     })
      .expect('status', 400)
      .expect('bodyContains', "O identificador próprio não foi informado")
  });
});