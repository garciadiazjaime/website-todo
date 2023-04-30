const { deleteTodo } = require("../../support/dynamo-service");

exports.handler = async function (event, _context) {
  const { uuid, position } = event.queryStringParameters;

  await deleteTodo(uuid, position);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
