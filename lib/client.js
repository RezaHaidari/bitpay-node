const request = require('request')
const api = "https://bitpay.com/api"

function Client(options) {
  this._opts = options;
  this.httpOptions = {
    auth: {
      user: options.apiKey,
      pass: '',
      sendImmediately: true
    }
  } 
}

Client.prototype.createInvoice = function(opts, fn) {
  var options = new Object(this.httpOptions)
  options.method = "POST"
  options.url = api+"/invoice";
  options.form = {
    ...opts
  };
  request(options, function(err, resp, body) {
    result = JSON.parse(body);
    if (result.error) {
      fn(result.error, null);
    } else {
      fn(null, result);
    }
  });
};

Client.prototype.getInvoice = function(invoiceId, fn) {
  var options = new Object(this.httpOptions);
  options.url = api+'/invoice/'+invoiceId;
  console.log(options.url);
  options.methd = 'GET';
  request(options, function(err, resp, body) {
    if(err) console.log(err);
    result = JSON.parse(body);
    if (result.error) {
      fn(result.error, null);
    } else {
      fn(null, result);
    }
  });
};

module.exports =  Client

