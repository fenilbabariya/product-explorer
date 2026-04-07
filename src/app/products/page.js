import ProductsClient from "@/components/ProductsClient";

const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
};

const ProductsPage = async () => {
    const products = await getProducts();

    return (
        <main className="mx-auto w-full max-w-7xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Products</h1>

            <ProductsClient products={products} />
        </main>
    );
};

export default ProductsPage;