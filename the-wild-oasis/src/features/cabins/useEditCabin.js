import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited")
      queryClient.invalidateQueries("cabins")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { isEditing, editCabin }
}
