import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import OrderList from "./components/OrderList";
import { Order as OrderType } from "@/types/order";
import { useCallback, useEffect, useState } from "react";
import { getOrders, getOrdersByUserId } from "@/services/orderService";

const Order = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const user = useSelector((state: RootState) => state.user);

  const fetchOrders = useCallback(async () => {
    let response: { data: OrderType[] };

    if (user.RoleId === 1) {
      response = await getOrders();
    } else {
      response = await getOrdersByUserId(user.Id ?? 0);
    }

    setOrders(response.data);
  }, [user.Id, user.RoleId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ordenes</h1>
      </div>
      <OrderList orders={orders} />
    </div>
  );
};

export default Order;
