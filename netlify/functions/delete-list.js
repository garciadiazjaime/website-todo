const { deleteList } = require("../../support/dynamo-service");

exports.handler = async function (event, _context) {
  const body = event.body;
  const list = JSON.parse(body);

  await deleteList(list);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

