import chai from 'chai';
import { maskToCidrFunction } from '../services/masktocidr'

const expect = chai.expect;

describe('maskToCidrFunction()', function () {
  it('should return a cidr', function () {

    expect("8").to.be.equal(maskToCidrFunction("255.0.0.0"));
    expect("16").to.be.equal(maskToCidrFunction("255.255.0.0"));
    expect("24").to.be.equal(maskToCidrFunction("255.255.255.0"));
    expect("32").to.be.equal(maskToCidrFunction("255.255.255.255"));
  });

  it('should return an Invalid', function () {
    expect("Invalid").to.be.equal(maskToCidrFunction("0.0.0.0"));
    expect("Invalid").to.be.equal(maskToCidrFunction("256.0.0.0"));
    expect("Invalid").to.be.equal(maskToCidrFunction("a.b.c.d"));
    expect("Invalid").to.be.equal(maskToCidrFunction("192.168.0.0"));
  });
});
