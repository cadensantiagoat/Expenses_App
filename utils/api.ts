const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewTransaction = async (formData) => {
  const res = await fetch(
    new Request(createURL('/api/transactions'), {
      method: 'POST',
      // body: formData
      body: JSON.stringify({ formData }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } // error handling here
};
