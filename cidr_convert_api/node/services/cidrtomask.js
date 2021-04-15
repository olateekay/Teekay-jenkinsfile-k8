export const cidrToMaskFunction = (value) => {
  let addrArray = [];
  
  let cidr = "";
  if (isNaN(value) || value == "" || value < 1 || value > 32) {
    return "Invalid";
  } else {
    let binary = "".padStart(32 - value, "0").padStart(32, "1");
    for (let i = 0; i < 4; i++) {
      let gBin = binary.slice(i * 8, i * 8 + 8); 
      addrArray.push(parseInt(gBin, 2));
    }
    for (let i = 0; i < addrArray.length; i++) {
      if (i > 0) {
        cidr = cidr + "." + addrArray[i];
      } else {
        cidr = addrArray[i];
      }
    }
  }
  return String(cidr);
};
