// simple test
import chai from 'chai';
import { cidrToMaskFunction } from '../services/cidrtomask'

const expect = chai.expect;

describe('cidrToMaskFunction()', function () { 
  it('should return a mask', function () {

    expect("255.0.0.0").to.be.equal(cidrToMaskFunction("8")); 
    expect("255.255.0.0").to.be.equal(cidrToMaskFunction("16"));
    expect("255.255.255.0").to.be.equal(cidrToMaskFunction("24"));
    expect("255.255.255.255").to.be.equal(cidrToMaskFunction("32"));
  });

  it('should return an invalid', function () {
    expect("Invalid").to.be.equal(cidrToMaskFunction("0"));
    expect("Invalid").to.be.equal(cidrToMaskFunction("33"));
    expect("Invalid").to.be.equal(cidrToMaskFunction("a"));
    expect("Invalid").to.be.equal(cidrToMaskFunction(""));
  });

});
