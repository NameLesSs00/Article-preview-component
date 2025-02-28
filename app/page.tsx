import  Product  from "@/app/components/Product";
import product from "@/app/data/data";

export default function Home() {
  return (
    <Product product={product} />
  );
}