const frisby = require('frisby');
var url1 = "https://sandbox.moip.com.br/v2/orders/ORD-MCRWMSCKUHVL/payments";
var url2 = "https://sandbox.moip.com.br/v2/orders/ORD-QIWFNVEB7T37/payments";

frisby.globalSetup({
    request: {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("LIAWRTIBIKKWYRRTX6GPIILKFSHBFXEP:UZQ8TKOQZAHNWYBAM4CJYELTQXRRNQ6Q4ZTKUNI5").toString('base64'),
        'Content-Type': 'application/json',
      }
    }
  });

describe('Funcionalidade: Realizar Pagamentos ', function () {

  it ('Realizar pagamento via cartão de crédito criptografado', function () {
    return frisby
      .post(url1, {
        "installmentCount": 1,
        "statementDescriptor": "minhaLoja.com",
        "fundingInstrument": {
          "method": "CREDIT_CARD",
          "creditCard": {
            "hash": "rTcjDNrs0qNSxj3F3nWIp68XxSQtAbB0glWAOLH7kZIt2qottYRCnBpu9SMMQQ4hEkIxOcDZxInTe20n60+PKcmM0zy5e388yxcf82MXtW/ZFMPe0sNPUoEB+3lIZ981Ym7IMud0rmTnsW1Lr2WT0sNTdn9/kuHK5/9asegAXDhMvxInUcuyYkjjsNKCBV6wD8VZFDsG8SCzlOrrrpWM3i5U7qY82z1zalg13QGT3GXyBRA4tKF4j+vSSR21XTRGC0UQoUHhDBfdxG3FjgbNNP/XsM9BfcwDw9AS3DklLB7+8HqELy7+McmZoNWlUxnkt2Akejg7+er3ulBQ7b3z0w==",
            "store": true,
            "holder": {
              "fullname": "Jose Portador da Silva",
              "birthdate": "1988-12-30",
              "taxDocument": {
                "type": "CPF",
                "number": "33333333333"
              },
              "phone": {
                "countryCode": "55",
                "areaCode": "11",
                "number": "66778899"
              }
            }
          }
        },
        "device": {
          "ip": "127.0.0.1",
          "geolocation": {
            "latitude": -33.867,
            "longitude": 151.206
          },
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
          "fingerprint": "QAZXswedCVGrtgBNHyujMKIkolpQAZXswedCVGrtgBNHyujMKIkolpQAZXswedCVGrtgBNHyujMKIkolpQAZXswedCVGrtgBNHyujMKIkolp"
        }
      })
      .expect('status', 201)
      .expect('bodyContains', "PAYMENT.CREATED")
  });

  it ('Realizar pagamento via boleto bancário de pedido já pago', function () {
    return frisby
      .post(url2, {  
        "statementDescriptor":"Minha Loja",
        "fundingInstrument":{  
           "method":"BOLETO",
           "boleto":{  
              "expirationDate":"2020-06-20",
              "instructionLines":{  
                 "first":"Atenção,",
                 "second":"fique atento à data de vencimento do boleto.",
                 "third":"Pague em qualquer casa lotérica."
              },
              "logoUri":"http://www.lojaexemplo.com.br/logo.jpg"
           }
        }
     })
      .expect('status', 400)
      .expect('bodyContains', "O pedido já foi pago")
  });
});