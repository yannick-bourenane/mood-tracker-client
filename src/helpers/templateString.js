function templateString(template, templateValues) {
  return new Function("return `"+template +"`;").call(templateValues);
}

module.exports = templateString;
