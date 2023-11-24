import { useMyOrders } from "../orderhooks/useMyOrder";
import { useProduct } from "../productHooks/useProduct";
import { stockChecker } from "../utils/stockChecker";

function SuccessPage() {
  const { data, isLoading } = useMyOrders();

  if (!isLoading) {
    const thisOrder = data.at(-1);
    stockChecker(thisOrder);
  }

  return (
    <div>
      <h1>Checkout success 🎉</h1>
    </div>
  );
}

export default SuccessPage;
