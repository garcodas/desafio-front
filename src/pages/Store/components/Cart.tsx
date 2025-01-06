import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  clearCart,
  removeFromCart,
  toggleChart,
} from "@/store/slices/cart.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";
import { Client } from "@/types/client";
import { getClientByUserId } from "@/services/clientService";
import ClientDeactivatedAlert from "@/components/app/ClientDeactivatedAlert/ClientDeactivatedAlert";
import { Order } from "@/types/order";
import { createOrder } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [couldDoOrders, setCouldDoOrders] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [client, setClient] = useState<Client | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { toast } = useToast();
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.Price * (item.OrderQty || 1),
    0
  );

  const fetchClient = useCallback(async () => {
    const response: { data: Client } = await getClientByUserId(user.Id ?? 0);

    setClient(response.data);
    if (!response.data || response.data.StatusId === 2) {
      setCouldDoOrders(false);
      setShowAlert(true);
    }
  }, [user.Id]);

  const createOrderfnc = async () => {
    try {
      const order: Order = {
        FullName: user.FullName,
        Address: client?.DeliveryAddress ?? "",
        Phone: client?.Phone ?? "",
        Email: client?.Email ?? "",
        Total: totalPrice,
        UserId: user.Id,
        Products: [],
      };

      for (const item of cart.items) {
        order.Products?.push({
          Qty: item.OrderQty || 1,
          UnitPrice: item.Price,
          SubTotal: item.Price * (item.OrderQty || 1),
          ProductId: item.Id ?? 0,
        });
      }

      await createOrder(order);

      toast({
        title: "Orden Creada",
        description: "La orden se creo con éxito.",
      });
      dispatch(clearCart());
      dispatch(toggleChart());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);
  return (
    <Sheet open={cart.isOpen} onOpenChange={() => dispatch(toggleChart())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-3/5 mt-4">
          {cart.items.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío</p>
          ) : (
            cart.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b"
              >
                <div>
                  <h3 className="font-semibold">{item.Name}</h3>
                  <h3 className="text-sm text-gray-500">
                    Cantidad en tu carrito: {item.OrderQty}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Q{numeral(item.Price).format("Q0,0.00")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.Id!))}
                >
                  Eliminar
                </Button>
              </div>
            ))
          )}
        </ScrollArea>
        <div className="mt-4">
          {showAlert && (
            <ClientDeactivatedAlert
              title="Error en perfil"
              message="Tu perfil aún no está completo o está desactivado, ve a la sección de cliente"
            />
          )}
          <p className="text-lg font-semibold">
            Total: Q{numeral(totalPrice).format("Q0,0.00")}
          </p>
          <Button
            disabled={!couldDoOrders}
            onClick={createOrderfnc}
            className="w-full mt-4"
          >
            Confirmar Compra
          </Button>

          <Button
            variant={"outline"}
            onClick={() => dispatch(clearCart())}
            className="w-full mt-4"
          >
            Limpiar carrito
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
