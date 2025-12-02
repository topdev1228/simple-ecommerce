export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 mb-12 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Simple E-commerce</h1>
                <p className="text-xl mb-6 opacity-90">Discover amazing products, add them to your cart, and enjoy a seamless shopping experience.</p>
                <a href="#products" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition">Shop Now</a>
            </div>
        </section>
    );
}
