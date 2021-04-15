export const maskToCidrFunction = (value) => {
  let cidrArray = [];
  let binary = "";
  let tempStr = "";
  if (value=="0.0.0.0"){
    return "Invalid";
  }
  for (var i = 0; i < value.length; i++) {
    tempStr = tempStr + value.charAt(i);
    if (isNaN(value.charAt(i)) && value.charAt(i) != ".") {
      return "Invalid";
    } else if (tempStr > 255) {
      return "Invalid";
    } else if (value.charAt(i) == "." || i == value.length - 1) {
      cidrArray.push(tempStr);
      tempStr = "";
    }
  }
  for (let i = 0; i < cidrArray.length; i++) {
    if (cidrArray[i] < 255) { 
      if (cidrArray[i] > 0) {
        return "Invalid";
      }
    }
  }
  cidrArray.map((bit) => {
    binary += Number(bit).toString(2);
  });
  let cidrValue = binary.split("1").length - 1;
  return String(cidrValue);
};
