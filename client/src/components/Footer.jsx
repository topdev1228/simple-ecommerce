export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-lg font-bold">Simple E-commerce</div>
                <div className="text-sm opacity-70">&copy; {new Date().getFullYear()} All rights reserved.</div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-blue-400 transition">Contact</a>
                    <a href="#" className="hover:text-blue-400 transition">Privacy</a>
                </div>
            </div>
        </footer>
    );
}
