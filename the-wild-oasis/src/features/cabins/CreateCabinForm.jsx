import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import Input from "../../ui/Input"
import Form from "../../ui/Form"
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"
import Textarea from "../../ui/Textarea"
import FormRow from "../../ui/FormRow"

import { useCreateCabin } from "./useCreateCabin"
import { useEditCabin } from "./useEditCabin"

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit || {}
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  const { errors } = formState

  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if (isEditSession) {
      console.log(data)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => reset(getValues()),
        }
      )
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => reset(getValues()),
        }
      )
    }
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capicity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) < Number(getValues("regularPrice")) ||
              "Discount must be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
