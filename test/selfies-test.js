var Lab = require("lab"),
  server = require("../");
var lab = exports.lab = Lab.script();

lab.experiment("When querying the selfies api", function() {
  lab.before(function (done) {

    // Wait 10 milliseconds
    setTimeout(function () { done(); }, 10);
  });

  lab.beforeEach(function (done) {
    // Run before every single test
    done();
  });

  lab.test("the main endpoint lists all selfies in a normal frontend call", function(done) {
    var num = 16,
      options = {
        method: "GET",
        url: "/selfies/" + num
      };

    server.inject(options, function(response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(result).to.be.instanceof(Object);
      Lab.expect(result).to.have.length(num);
   
      done();
    });
  });

});