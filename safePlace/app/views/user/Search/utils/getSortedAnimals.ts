import { AnimalDB } from "../../../../types";

export const getSortedAnimals = (
  animals: Array<AnimalDB>,
  favouriteIDs: Array<string>
) => {
  return animals.sort((a, b) => {
    const aIsFavourite = favouriteIDs.includes(a.id);
    const bIsFavourite = favouriteIDs.includes(b.id);

    if (aIsFavourite && !bIsFavourite) {
      return -1;
    }
    if (!aIsFavourite && bIsFavourite) {
      return 1;
    }
    return 0;
  });
};
