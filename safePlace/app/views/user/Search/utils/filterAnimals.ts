import { Filter } from "../../../../constants/filterType";
import { AdditionalUserData, AnimalDB } from "../../../../types";

export const filterAnimals = (animals: Array<AnimalDB>, filters: Filter, userDetails?:AdditionalUserData) =>{
  const filteredAnimals = animals
  .filter((animal)=>(filters.type == undefined || filters.type == animal.type))
  .filter((animal) => (filters.environment == undefined || filters.environment == animal.environment))
  .filter((animal) => (filters.friendly == undefined || filters.friendly == animal.friendly))
  .filter((animal) => (filters.age == undefined || filters.age >= animal.age))


  const userFilterdAnimals = filters.useUserDetails ? filteredAnimals
    .filter((animal) => userAgeFilter(animal, userDetails))
    .filter((animal) => userExpierienceFilter(animal, userDetails))
    .filter((animal) => userHousingFilter(animal, userDetails))
    .filter((animal) => userLifestyleFilter(animal, userDetails))
  :filteredAnimals

  return userFilterdAnimals
}

const userAgeFilter = (animal:AnimalDB, userDetails?:AdditionalUserData): boolean => {
  if (userDetails?.age == undefined || userDetails?.age == 0)
    return true
  return (userDetails.age > 70 && animal.friendly && ["Cat", "Turtle", "Fish"].includes(animal.type))
}

const userExpierienceFilter = (animal: AnimalDB, userDetails?: AdditionalUserData): boolean => {
  if (userDetails?.experience == undefined || userDetails?.experience == "")
    return true;
  return (["None", "Little Experience"].includes(userDetails.experience)  && animal.friendly);
};

const userHousingFilter = (animal: AnimalDB, userDetails?: AdditionalUserData): boolean => {
  if (userDetails?.housing == undefined || userDetails?.housing == "")
    return true;
  return (userDetails.housing == "Apartment" && ["Land","Water"].includes(animal.environment));
};

const userLifestyleFilter = (animal: AnimalDB, userDetails?: AdditionalUserData): boolean => {
  if (userDetails?.lifestyle == undefined || userDetails?.lifestyle == "")
    return true;
  return (userDetails.lifestyle == "Sedentary lifestyle" && ["Fish","Turtle"].includes(animal.type)) 
    || (userDetails.lifestyle == "Moderately Active Lifestyle" && ["Fish", "Turtle","Cat", "Parrot"].includes(animal.type))
    || (userDetails.lifestyle == "Active lifestyle" && ["Fish", "Turtle", "Cat", "Parrot", "Dog"].includes(animal.type));
};