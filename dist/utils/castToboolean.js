function castToboolean(source) {
  return ![false, null, void 0, 0, "", "false", "null", "undefined", "0"].includes(source);
}

export { castToboolean as default };
