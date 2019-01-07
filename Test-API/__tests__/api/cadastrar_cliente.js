const frisby = require('frisby');
var url = "https://sandbox.moip.com.br/v2/customers/";

frisby.globalSetup({
    request: {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("LIAWRTIBIKKWYRRTX6GPIILKFSHBFXEP:UZQ8TKOQZAHNWYBAM4CJYELTQXRRNQ6Q4ZTKUNI5").toString('base64'),
        'Content-Type': 'application/json',
      }
    }
  });

describe('Funcionalidade: Cadastrar Clientes ', function () {

var ownID =  "customer-id_00" +  Math.floor((Math.random() * 1000) + 1);
console.log("ID Gerado: " + ownID);

  it ('Cadastrar cliente com dados válidos', function () {
    return frisby
      .post(url, {
        "ownId": ownID,
        "fullname": "Gisele Cunha",
        "email": "gisele@email.com",
        "birthDate": "1985-10-19",
        "taxDocument": {
          "type": "CPF",
          "number": "22288866644"
        },
        "phone": {
          "countryCode": "55",
          "areaCode": "11",
          "number": "55552266"
        },
        "shippingAddress": {
          "city": "São Paulo",
          "complement": "10",
          "district": "Itaim Bibi",
          "street": "Avenida Faria Lima",
          "streetNumber": "500",
          "zipCode": "01234000",
          "state": "SP",
          "country": "BRA"
        }
      })
      .expect('status', 201)
      .expect('bodyContains', ownID)
  });

  it ('Cadastrar cliente com data de nascimento inválida', function () {
    return frisby
      .post(url, {
        "ownId": ownID,
        "fullname": "Elvis Presley",
        "email": "elvis@email.com",
        "birthDate": "1935-01",
        "taxDocument": {
          "type": "CPF",
          "number": "22288866644"
        },
        "phone": {
          "countryCode": "55",
          "areaCode": "11",
          "number": "55552266"
        },
        "shippingAddress": {
          "city": "São Paulo",
          "complement": "10",
          "district": "Itaim Bibi",
          "street": "Avenida Faria Lima",
          "streetNumber": "500",
          "zipCode": "01234000",
          "state": "SP",
          "country": "BRA"
        }
      })
      .expect('status', 400)
      .expect('bodyContains', "A data de nascimento informada é inválida")
  });
});