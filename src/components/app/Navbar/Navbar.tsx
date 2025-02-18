import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logOut } from "@/services/authService";
import { removeCookie } from "@/services/cookieService";
import { toggleChart } from "@/store/slices/cart.slice";
import { logOutUser } from "@/store/slices/user.slice";
import { RootState } from "@/store/store";
import {
  AUTH_COOKIE_NAME,
  AUTH_STORAGE_TOKEN_NAME,
} from "@/utils/constants/auth.constant";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const goTo = (url: string) => {
    navigate(url);
  };
  const logOutf = async () => {
    const response = await logOut();

    if (response.status === 200) {
      dispatch(logOutUser());
      removeCookie(AUTH_COOKIE_NAME);
      localStorage.removeItem(AUTH_STORAGE_TOKEN_NAME);
    }
    navigate("/auth/signin");
  };
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                Mi tiendita
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user.RoleId === 1 && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Administrador
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => goTo("/orders")}>
                      Ordenes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => goTo("/admin/users")}>
                      Usuarios
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => goTo("/admin/clients")}>
                      Clientes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => goTo("/admin/product")}>
                      Productos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => goTo("/admin/product-category")}
                    >
                      Categorias
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => dispatch(toggleChart())}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => goTo("/client")}>
                  Cliente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goTo("/orders")}>
                  Ordenes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logOutf()}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                {/* Add cart items here */}
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full mb-2"
            />

            {user.RoleId === 1 && (
              <>
                <Link
                  to="/orders"
                  className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Ordenes
                </Link>
                <Link
                  to="/admin/users"
                  className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Usuarios
                </Link>
                <Link
                  to="/admin/clients"
                  className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clientes
                </Link>
                <Link
                  to="/admin/category-products"
                  className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Ordenes Pendientes
                </Link>
              </>
            )}
            <Link
              to="/client"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Cliente
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
