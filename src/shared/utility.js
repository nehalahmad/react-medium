export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const calcTime = (inputDate) => {
  console.log(inputDate);
  let dateDiff = new Date(Date.now() - new Date(inputDate).getTime());

  let hrDiff = dateDiff.getHours();
  let minDiff = dateDiff.getMinutes();
  let secDiff = dateDiff.getSeconds();

  let calcTime = "";
  if (hrDiff) {
    calcTime += hrDiff;
    if (hrDiff > 1) {
      calcTime += " hours ";
    } else {
      calcTime += " hour ";
    }

    return calcTime + " ago";
  }

  if (minDiff) {
    calcTime += minDiff;

    if (minDiff > 1) {
      calcTime += " minutes ";
    } else {
      calcTime += " minute ";
    }

    return calcTime + " ago";
  }

  if (secDiff) {
    calcTime += secDiff;

    if (secDiff > 1) {
      calcTime += " seconds ";
    } else {
      calcTime += " second ";
    }
    return calcTime + " ago";
  }
};
