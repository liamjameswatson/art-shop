import { useEditProduct } from "../productHooks/useEditProduct.js";

import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "./Input";
import FormRow from "./FormRow";
import FileInput from "./FileInput";
import { uploadImage, uploadImages } from "../utils/imageUtils";

const EditProductForm = ({ product }) => {
  const { _id: editId, ...editValues } = product;

  const { isEditing, editProduct } = useEditProduct();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  async function onSubmit(data) {
    if (editValues.image !== data.image) {
      data.image = await uploadImage(data.image[0]);
    }

    let uploadedOtherImages = [];
    if (
      JSON.stringify(editValues.otherImages) !==
      JSON.stringify(data.otherImages)
    ) {
      uploadedOtherImages = await uploadImages(data.otherImages);
      data.otherImages = uploadedOtherImages;
    }

    editProduct(
      {
        id: editId,
        ...data,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "A product needs a name",
          })}
        ></Input>
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Input
          as="textarea"
          id="description"
          {...register("description", {
            required: "A new product needs a description",
          })}
        ></Input>
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput id="image" type="file" {...register("image")}></FileInput>
      </FormRow>
      <FormRow label="otherImages" error={errors?.otherImages?.message}>
        <FileInput
          id="otherImages"
          type="file"
          multiple={true}
          {...register("otherImages")}
        ></FileInput>
      </FormRow>

      <FormRow label="Is this a print?" error={errors?.isPrint?.message}>
        <Input type="checkbox" id="isPrint" {...register("isPrint")}></Input>
      </FormRow>

      <FormRow label="category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          {...register("category", {
            required: "A new product needs a category",
          })}
        ></Input>
      </FormRow>

      <FormRow label="price" error={errors?.price?.message}>
        <Input
          type="float"
          id="price"
          {...register("price", {
            required: "A new product needs a price",
            min: {
              value: 1,
              message: "You don't want to give away this item",
            },
          })}
        ></Input>
      </FormRow>

      <FormRow label="stockNumber" error={errors?.stockNumber?.message}>
        <Input
          type="number"
          id="stockNumber"
          {...register("stockNumber", {
            required: "How many do you have?",
            min: {
              value: 0,
              message: "You must have more than one item to sell",
            },
          })}
        ></Input>
      </FormRow>

      <Button
        disabled={isEditing}
        type="submit"
        variant="primary"
        className="my-2"
      >
        Edit Product
      </Button>
      <Button type="reset" variant="primary" className="my-2">
        Cancel
      </Button>
    </Form>
  );
};

export default EditProductForm;
