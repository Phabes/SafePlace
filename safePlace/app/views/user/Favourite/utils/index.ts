export const sortPetitionByStatus = (
  petitions: { animalsName: string; status: string }[]
) => {
  const order = ["Accepted", "Declined", "Pending", "Done"];

  return petitions.sort(
    (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
  );
};
