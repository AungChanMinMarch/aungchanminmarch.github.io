const beautify = require('js-beautify').html; // Assuming `js-beautify` is used for HTML prettification

function prettifyObject(obj, seen = new WeakSet(), indent = 2) {
  if (obj === null || typeof obj !== 'object') {
    // Handle primitives and null
    return JSON.stringify(obj);
  }

  if (seen.has(obj)) {
    return '"[Circular Reference]"'; // Prevent infinite recursion
  }

  seen.add(obj); // Track visited objects

  if (Array.isArray(obj)) {
    return prettifyArray(obj, seen, indent);
  }

  return prettifyPlainObject(obj, seen, indent);
}

function prettifyArray(array, seen, indent) {
  const indentation = ' '.repeat(indent);
  const nestedIndentation = ' '.repeat(indent + 2);
  const closingIndentation = ' '.repeat(indent - 2);

  const items = array.map(value => {
    if (typeof value === 'object' && value !== null) {
      return prettifyObject(value, seen, indent + 2);
    }
    return JSON.stringify(value);
  });

  return `[\n${items.map(item => `${nestedIndentation}${item},`).join('\n')}\n${closingIndentation}]`;
}

function prettifyPlainObject(obj, seen, indent) {
  const indentation = ' '.repeat(indent);
  const nestedIndentation = ' '.repeat(indent + 2);
  const closingIndentation = ' '.repeat(indent - 2);

  const entries = Object.entries(obj).map(([key, value]) => {
    const formattedKey = JSON.stringify(key);
    let formattedValue;

    if (key === 'question' || key === 'drawSVGstr') {
      formattedValue = formatHTMLString(value, nestedIndentation);
    } else if (typeof value === 'object' && value !== null) {
      formattedValue = prettifyObject(value, seen, indent + 2);
    } else {
      formattedValue = JSON.stringify(value);
    }

    return `${nestedIndentation}${formattedKey}: ${formattedValue},`;
  });

  return `{\n${entries.join('\n')}\n${closingIndentation}}`;
}

function formatHTMLString(htmlString, indent) {
  const prettyHTML = beautify(htmlString, { indent_size: 2, space_in_empty_paren: true });

  // Escape backticks and template literal markers
  const escapedHTML = prettyHTML
    .replace(/`/g, '\\`') // Escape backticks
    .replace(/\\/g, '\\\\')
    .replace(/\$\{/g, '\\${'); // Escape `${`

  // Indent the HTML for readability within the template literal
  return `\`\n${indent}${escapedHTML.replace(/\n/g, `\n${indent}`)}\n${indent.slice(2)}\``;
}

module.exports = prettifyObject;
