function kebabCaseToPascalCase(kebabString) {
  return kebabString.split("-").reduce((acc, current) => {
    acc += current.charAt(0).toUpperCase() + current.slice(1);
    return acc;
  }, "");
}

export { kebabCaseToPascalCase as k };
