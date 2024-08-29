import { Api } from "@/services/api-client"
import { Ingridient } from "@prisma/client"
import React from "react"
import { useSet } from "react-use"

type IngredientItem = Pick<Ingridient, 'id' | 'name' >

interface ReturnProps {
    ingredients: IngredientItem[]
    loading: Boolean
    selectedIngredients: Set<String>
    onAddId: (id: string) => void
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([])
    const [loading, setLoading] = React.useState(true);
    const [selectedIds, { toggle}] = useSet(new Set<String>([]));

    React.useEffect(() => {
        async function getIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients.map((ingredient) => ({id: ingredient.id, name: ingredient.name}) ))
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getIngredients()
    },[])

    return { ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds }
}