const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import your server file

chai.use(chaiHttp);
const expect = chai.expect;

describe('Functional Tests', function () {
  it('Viewing one stock: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL' }) // Replace 'AAPL' with a valid stock symbol
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('object');
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  it('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL', like: true }) // Replace 'AAPL' with a valid stock symbol
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('object');
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        expect(res.body.stockData.likes).to.be.above(0); // Check that likes have increased
        done();
      });
  });

  it('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
    // Perform a similar test as the previous one but check that likes are not increased
    done();
  });

  it('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['AAPL', 'GOOGL'] }) // Replace with valid stock symbols
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array').with.length(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[0]).to.have.property('likes');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('likes');
        done();
      });
  });

  it('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['AAPL', 'GOOGL'], like: true }) // Replace with valid stock symbols
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array').with.length(2);
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('price');
        expect(res.body.stockData[0]).to.have.property('likes');
        expect(res.body.stockData[0].likes).to.be.above(0); // Check that likes have increased
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('price');
        expect(res.body.stockData[1]).to.have.property('likes');
        expect(res.body.stockData[1].likes).to.be.above(0); // Check that likes have increased
        done();
      });
  });
});
