import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="relative mb-4 h-48 rounded-lg bg-gray-50 p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
        {product.category}
      </p>
      <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-900">
        {product.title}
      </h2>

      <p className="mt-4 text-lg font-bold text-gray-900">
        ${product.price?.toFixed(2)}
      </p>
    </article>
  );
};

export default ProductCard;
