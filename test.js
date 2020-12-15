var assert = require('assert');
var index = require("../nodejs-mysql-backend/index");
var agremment = require("../nodejs-mysql-backend/controllers/agreement_controller");
var alert = require("../nodejs-mysql-backend/controllers/alert_controller");
var request = require("../nodejs-mysql-backend/controllers/request_controller");
var company = require("../nodejs-mysql-backend/controllers/company_controller");
var legal_representant = require("../nodejs-mysql-backend/controllers/legal_representant_controller");
var student = require("../nodejs-mysql-backend/controllers/student_controller");

describe('Array', function() {
    describe('#indexOf()', function() {
        it('testing all controllers ', function() {
            result = index.addTested("text");
            assert.strictEqual(result, "text tested");
            result = agremment.addTested("text");
            assert.strictEqual(result, "text tested");
            result = alert.addTested("text");
            assert.strictEqual(result, "text tested");
            result = request.addTested("text");
            assert.strictEqual(result, "text tested");
            result = company.addTested("text");
            assert.strictEqual(result, "text tested");
            result = legal_representant.addTested("text");
            assert.strictEqual(result, "text tested");
            result = student.addTested("text");
            assert.student(result, "text tested");
        });
    });
});