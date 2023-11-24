// import React from "react";
// import FormContainer from "../ui/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import Input from "./Input";
import FileInput from "./FileInput";
import { useCreateProduct } from "../productHooks/useCreateProduct.js";
import Checkbox from "./CheckBox.jsx";

import FormRow from "./FormRow";
import { uploadImage, uploadImages } from "../utils/imageUtils";

const CreateProductForm = () => {
  const { register, handleSubmit, reset, formState, control, watch, setValue } =
    useForm();
  const { errors } = formState;
  const isPrint = useWatch({
    control,
    name: "isPrint",
    defaultValue: false,
  });

  const { isCreating, createProduct } = useCreateProduct();

  async function onSubmit(data) {
    let uploadedOtherImages = [];

    if (data.otherImages && data.otherImages.length > 0) {
      uploadedOtherImages = await uploadImages(data.otherImages);
      console.log("other images = ", uploadedOtherImages);
    }
    const uploadedImage = await uploadImage(data.image[0]);

    console.log("other images2 =", uploadedOtherImages);

    createProduct(
      {
        ...data,
        image: uploadedImage,
        otherImages: uploadedOtherImages,
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
            required: "A new product needs a name",
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
        <FileInput
          id="image"
          type="file"
          {...register("image", {
            required: "A new product needs an image",
          })}
        ></FileInput>
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
              value: 1,
              message: "You must have more than one item to sell",
            },
          })}
          value={isPrint ? "99" : ""}
        ></Input>
      </FormRow>

      <Button
        disabled={isCreating}
        type="submit"
        variant="primary"
        className="my-2"
      >
        Create Product
      </Button>
      <Button type="reset" variant="primary" className="my-2">
        Cancel
      </Button>
    </Form>
  );
};

export default CreateProductForm;
