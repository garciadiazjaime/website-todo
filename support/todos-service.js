const getBatchesOf25Items = (data, accu) => {
  if (!Array.isArray(data) || !data.length) {
    return accu;
  }

  accu.push(data.slice(0, 25));

  return getBatchesOf25Items(data.slice(25), accu);
};

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const getList = async () => {
  const url = `.netlify/functions/get-list`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const updateTodo = async (todo, position, uuid) => {
  const url = ".netlify/functions/update-todo";

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      todo,
      position,
      uuid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const saveList = async (data) => {
  const batches = getBatchesOf25Items(data, []);
  const url = ".netlify/functions/save-list";

  const promises = batches.map((items) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return Promise.all(promises);
};

export const deleteTodo = async (uuid, position) => {
  const url = `.netlify/functions/delete-todo?uuid=${uuid}&position=${position}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteList = async (list) => {
  const batches = getBatchesOf25Items(list, []);
  const url = `.netlify/functions/delete-list`;

  const promises = batches.map((items) => {
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(
        items.map(({ uuid, position }) => ({ uuid, position }))
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  return Promise.all(promises);
};
