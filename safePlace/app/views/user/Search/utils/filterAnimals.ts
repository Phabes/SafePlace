import { Filter } from "../../../../constants/filterType";
import { AdditionalUserData, AnimalDB } from "../../../../types";

export const filterAnimals = (animals: Array<AnimalDB>, filters: Filter, userDetails?:AdditionalUserData) =>{
  const filteredAnimals = animals
  .filter((animal)=>(filters.type == undefined || filters.type == animal.type))
  .filter((animal) => (filters.environment == undefined || filters.environment == animal.environment))
  .filter((animal) => (filters.friendly == undefined || filters.friendly == animal.friendly))
  .filter((animal) => (filters.age == undefined || filters.age >= animal.age))


  const userFilterdAnimals = filters.useUserDetails ? filteredAnimals
    .filter((animal) => (userDetails?.age == undefined || userDetails?.age == 0 || filters.type == animal.type))
  :filteredAnimals

  
}

const userAgeFilter = (animal:AnimalDB, userDetails:AdditionalUserData): boolean => {
  if (userDetails?.age == undefined || userDetails?.age == 0)
    return true
  return (userDetails.age > 70 && animal.friendly && ["Cat", "Turtle", "Fish"].includes(animal.type))
}