import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-100 bg-white">
      <div className="py-12 flex flex-col md:grid md:grid-cols-[2.5fr_1fr_1fr] gap-10 sm:gap-14 text-sm">
        
        {/* Brand info */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">
              A4
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Fashion<span className="text-gray-400 font-light">Store</span>
            </span>
          </Link>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm">
            Your destination for premium contemporary fashion. Quality craftsmanship, sustainable choices, and timeless pieces designed to elevate your everyday look.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black transition">Home</Link></li>
            <li><Link to="/collection" className="hover:text-black transition">All Collections</Link></li>
            <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-black transition">Contact & Help</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Get In Touch</h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-600">
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@a4fashionstore.com</li>
            <li>📍 123 Fashion Ave, Design District</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
        <p>© {new Date().getFullYear()} A4-FashionStore. All rights reserved.</p>
        <p>Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
};

export default Footer;