const forms = {
  readFormValues: form => {
    let result = {};
    for (let elem of form.elements) {
      let name = elem.name;
      if (name) {
        result[elem.name] = elem.value;
      }
    }
    return result;
  },
  checkValidity: (form, success, fail) => {
    if (!form.checkValidity || form.checkValidity()) {
      if (typeof success === 'function') success();
      return true;
    }
    else if (form.reportValidity) {
      form.reportValidity();
      if (typeof fail === 'function') fail();
      return false;
    }
  }
};
export default forms;
