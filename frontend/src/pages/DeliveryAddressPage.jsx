import Steps from "../ui/Steps";
import DeliveryAddressForm from "../ui/DeliveryAddressForm";

const DeliveryAddressPage = () => {
  // const cart = useSelector((state) => state.cart);
  // const { deliveryAddress } = cart;

  // const [address, setAddress] = useState(deliveryAddress?.address || "");
  // const [city, setCity] = useState(deliveryAddress?.city || "");
  // const [postcode, setPostcode] = useState(deliveryAddress?.postcode || "");
  // const [country, setCountry] = useState(deliveryAddress?.country || "");

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(savedeliveryAddress({ address, city, postcode, country }));
  //   navigate("/payment");
  // };
  return (
    <>
      <Steps step1 step2 />
      <h1>Delivery Address</h1>

      <DeliveryAddressForm />
    </>
  );
};

export default DeliveryAddressPage;
