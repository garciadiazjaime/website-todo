const dynamoService = require("../../support/dynamo-service");

exports.handler = async function (event, _context) {
  const body = event.body;
  const { todo, position, uuid } = JSON.parse(body);

  await dynamoService.updateTodo(todo, position, uuid);

  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
