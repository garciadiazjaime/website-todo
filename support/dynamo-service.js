const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const documentClient = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

module.exports.getList = () => {
  const params = {
    TableName: "todo",
  };

  return documentClient.scan(params).promise();
};

module.exports.saveList = (list) => {
  const batch = list.map(({ uuid, position, todo }) => ({
    PutRequest: {
      Item: {
        uuid: { S: uuid },
        position: { N: position.toString() },
        todo: { S: todo },
        created: { N: new Date().getTime().toString() },
      },
    },
  }));

  const params = {
    RequestItems: {
      todo: batch,
    },
  };

  return documentClient.batchWriteItem(params).promise();
};

module.exports.updateTodo = (todo, position, uuid) => {
  const batch = [
    {
      PutRequest: {
        Item: {
          uuid: { S: uuid },
          position: { N: position.toString() },
          todo: { S: todo },
        },
      },
    },
  ];

  const params = {
    RequestItems: {
      todo: batch,
    },
  };

  return documentClient.batchWriteItem(params).promise();
};

module.exports.deleteTodo = (uuid, position) => {
  const params = {
    TableName: "todo",
    Key: {
      uuid: { S: uuid },
      position: { N: position },
    },
  };

  return documentClient.deleteItem(params).promise();
};

module.exports.deleteList = (list) => {
  const batch = list.map(({ uuid, position }) => ({
    DeleteRequest: {
      Key: {
        uuid: { S: uuid },
        position: { N: position.toString() },
      },
    },
  }));

  const params = {
    RequestItems: {
      todo: batch,
    },
  };

  return documentClient.batchWriteItem(params).promise();
};
