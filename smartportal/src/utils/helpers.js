const isNullOrEmpty = text => {
  if (text === null || text === undefined) {
    return true;
  } else {
    text = text.toString();
    return !text || text.toString().replace(/\s/g, '').length === 0;
  }
};

export {isNullOrEmpty};
