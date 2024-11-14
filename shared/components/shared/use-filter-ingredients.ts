import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface returnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): returnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIds, { toggle }] = useSet(new Set<string>(values ));

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const response = await Api.ingredients.getAll();
        // Check if response is wrapped in an object
        const ingredientsArray = Array.isArray(response) ? response : response;
        setIngredients(ingredientsArray);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  const setSelectedIngredients = (ids: string[])=>{
    ids.forEach(selectedIds.add); 
  }

  return {
    ingredients,
    loading,
    onAddId: toggle,
    selectedIngredients : selectedIds ,
  };
};
