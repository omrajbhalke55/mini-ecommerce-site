import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/product";
import useCart from "../hooks/useCart";

const ProductDetails = () => {

    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        const thumbnail = product?.images?.[0] || product?.image;
        if (thumbnail) setThumbnail(thumbnail);
    }, [product]);

    // if (!product) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found</p>;

    const { addToCart } = useCart();

    return (
        <div className="max-w-6xl w-full my-10 px-6 font-[Geist]">

            {/* Breadcrumb */}
            <p className="text-sm text-zinc-500">
                <span><Link to="/">Home</Link></span> /
                <span> Products</span> /
                <span> {product.category}</span> /
                <span className="text-[#2AA7A1]"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-6">

                {/* LEFT: IMAGES */}
                <div className="flex gap-3">

                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {(product.images || [product.image]).map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(image)}
                                className="border border-zinc-300 rounded overflow-hidden cursor-pointer hover:border-[#2AA7A1]"
                            >
                                <img src={image} alt="" className="w-20 h-20 object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="border border-zinc-300 rounded overflow-hidden w-80 h-80">
                        <img
                            src={thumbnail}
                            alt="product"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="text-sm w-full md:w-1/2 text-zinc-800">

                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        {Array(5).fill("").map((_, i) => (
                            <span key={i}>
                                {product.rating > i ? "⭐" : "☆"}
                            </span>
                        ))}
                        <p className="ml-2 text-zinc-600">({product.rating})</p>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <p className="text-zinc-900">
                            MRP: ₹{product.price}
                        </p>

                        {product.offerPrice && (
                            <p className="text-2xl font-medium text-[#2AA7A1]">
                                ₹{product.offerPrice}
                            </p>
                        )}

                        <span className="text-zinc-500 text-xs">
                            (inclusive of all taxes)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-base font-medium mt-6">
                        About Product
                    </p>

                    <ul className="list-disc ml-4 text-zinc-600">
                        {Array.isArray(product.description)
                            ? product.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))
                            : <li>{product.description}</li>}
                    </ul>

                    {/* Extra Info */}
                    {product.filter && (
                        <p className="mt-4 text-xs text-zinc-500">
                            Tags: {product.filter}
                        </p>
                    )}

                    {/* Button */}
                    <div className="flex items-center mt-10 gap-4 text-sm">

                        <button
                            onClick={() => addToCart(product)}
                            className="w-full py-3 rounded-full bg-[#2AA7A1] text-white hover:bg-[#23918c] transition cursor-pointer"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;