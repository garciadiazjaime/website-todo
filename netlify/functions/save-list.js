const dynamoService = require("../../support/dynamo-service");

exports.handler = async function (event, _context) {
  const body = event.body;
  const list = JSON.parse(body);

  await dynamoService.saveList(list);

  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
