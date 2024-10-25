export const deleteProjectById = async (id: number, token: string) => {
  const response = await fetch(`http://localhost:3333/project/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  console.log(resData);
};
