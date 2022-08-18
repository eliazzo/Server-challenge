const server = require("../solution/server.js");

async function request(pathname, options = {}) {
  const app = server.listen(9876);
  const url = new URL(pathname, "http://localhost:9876");
  const response = await fetch(url, options);
  app.close();
  const body = await response.text();
  return { status: response.status, body };
}

function assert_attr(body, name, expected, msg) {
  const get_attr = new RegExp(`${name}="([^"]*)"`, "i");
  const match = body.match(get_attr);
  if (!match && !expected.includes("")) {
    console.log({ name, expected, match });
    throw new Error(msg);
  }
  if (match) {
    // [0] is the full match, [1] is the bit between the quotes
    const attr = match[1];
    if (!expected.includes(attr)) {
      throw new Error(msg);
    }
  }
}

module.exports = { request, assert_attr };