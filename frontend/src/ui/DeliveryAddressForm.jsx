import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import FormRow from "./FormRow";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryAddress } from "../redux/basketSlice";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deliveryAddress: deliveryValues } = useSelector(
    (state) => state.basket
  );

  const { register, handleSubmit, formState } = useForm({
    defaultValues: deliveryValues,
  });
  const { errors } = formState;

  async function onSubmit(data) {
    console.log("data ======", data);
    dispatch(saveDeliveryAddress(data));
    navigate("/payment");
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Address" error={errors?.address?.message}>
          <Input
            type="text"
            id="address"
            {...register("address", {
              required: "Please enter an address",
            })}
          ></Input>
        </FormRow>

        <FormRow label="Town/City" error={errors?.city?.message}>
          <Input
            type="text"
            id="city"
            {...register("city", {
              required: "Please enter a town/city",
            })}
          ></Input>
        </FormRow>

        <FormRow label="County/State/Area" error={errors?.county?.message}>
          <Input
            type="text"
            id="county"
            {...register("county", {
              required: "Please enter a county/area",
            })}
          ></Input>
        </FormRow>

        <FormRow label="Postcode" error={errors?.postcode?.message}>
          <Input
            type="text"
            id="postcode"
            {...register("postcode", {
              required: "Please enter a postcode",
            })}
          ></Input>
        </FormRow>

        <FormRow label="Country" error={errors?.country?.message}>
          <Input
            type="text"
            id="country"
            placeholder="United Kingdom"
            // defaultValue="United Kingdom"
            {...register("country", {
              required: "Please enter a country",
            })}
          ></Input>
        </FormRow>

        {/* <FormRow label="Same as billing address?">
          <Input
            type="checkbox"
            id="billingAddress"
            defaultValue={true}
            onChange={() => {
              // Use the checked state to determine whether it's true or false
              const isChecked = !formState.fields["billingAddress"]?.value;
              register("billingAddress").onChange(isChecked);
            }}
          ></Input>
        </FormRow> */}
        <Button type="submit">Add Address</Button>
        <Button type="reset">Reset</Button>
        {/* <FormRow label></FormRow> */}
      </Form>
    </>
  );
};

export default DeliveryAddressForm;
