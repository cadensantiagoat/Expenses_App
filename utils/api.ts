const createURL = (path: String) => {
  return window.location.origin + path;
};

export const createNewTransaction = async (formData: Object) => {
  // asynchronously call the route handler, assigning it to "res"
  const res = await fetch(
    new Request(createURL('/api/transactions'), {
      // Route Handler is located at path: /api/transactions/route.ts
      method: 'POST',
      body: JSON.stringify(formData),
    })
  );
  // "res" is of type NextResponse (https://nextjs.org/docs/app/api-reference/functions/next-response)
  if (res.ok) {
    // on success, resolve "res" by calling .json() method
    const result = await res.json();
    return result.data;
  } else {
    console.log('createNewTransaction FAILED: ', res);
  }
};

export const getAllExpenses = async () => {
  const response = await fetch(
    new Request(createURL('/api/transactions'), {
      method: 'GET',
    })
  );

  if (response.ok) {
    const transactions = await response.json();
    return transactions;
  } else {
    console.log('GET transactions failed', response.status);
  }
};
