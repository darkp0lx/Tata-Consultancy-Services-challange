export class FormHelper {
    onInputNumber(event: any, callback: any) {
      let number = event.target.value.replace(/[^0-9]/g, "");
      if (event.target.getAttribute("data-max-length")) {
        number = number.substring(
          0,
          event.target.getAttribute("data-max-length")
        );
      }
      callback(event, number);
    }
  
    cleanInputWithRegex(event: any, regex: any, callback: any) {
      let value = event.target.value.replace(regex, "");
      callback(event, value);
    }
  
    validateForm(form: any, callback: any) {
      const inputValues = Object.values(form);
      const inputValidityValues = Object.values(form.formError);
      const inputRequiredValues = Object.values(form.formRequired);
      const inputRequiredValidityValues = inputValidityValues.filter(
        (_ele, index) => {
          return inputRequiredValues[index] === true || inputValues[index] !== "";
        }
      );
      const res = inputRequiredValidityValues.every((ele: any) => {
        return ele.valid === true;
      });
      callback(res);
    }
  
    getValidityInput(validityInstance: any) {
      let validity: any = {};
      for (var key in validityInstance) {
        validity[key] = validityInstance[key];
      }
      return validity;
    }
  }
  