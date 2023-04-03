function kebabCaseToCamelCase(kebabString) {
  return kebabString.split("-").reduce((acc, current, index) => {
    let newText;
    if (index === 0) {
      newText = current.charAt(0).toLowerCase() + current.slice(1);
    } else {
      newText = current.charAt(0).toUpperCase() + current.slice(1);
    }
    acc += newText;
    return acc;
  }, "");
}

export { kebabCaseToCamelCase as default };
