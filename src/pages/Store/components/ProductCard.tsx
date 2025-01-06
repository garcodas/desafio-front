import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { VITE_API_URL } from "@/config/envs";
import { ProductCardProps } from "@/types/store";
import numeral from "numeral";

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const returnImgUrl = (url: string) => {
    return `${VITE_API_URL}${url}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex items-center justify-center">
        <div className="h-30 w-30 ">
          <img src={returnImgUrl(product.ImageUrl)} alt={product.Name} />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.Name}</h2>
          <p className="text-sm text-gray-500">{product.Brand}</p>
          <p className="text-lg font-bold mt-2">
            Q{numeral(product.Price).format("Q0,0.00")}
          </p>
          <p className="text-sm text-gray-500">
            Artículos disponibles: {product.Stock}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(product)} className="w-full">
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
