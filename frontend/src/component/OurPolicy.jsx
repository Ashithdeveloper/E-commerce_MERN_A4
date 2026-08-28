import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const OurPolicy = () => {
  return (
    <div className="my-16 py-12 px-6 bg-gray-50/70 border border-gray-100 rounded-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        
        {/* Policy 1 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition duration-300">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <img src={assets.exchange_icon} alt="Exchange" className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">Easy Exchange Policy</h4>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            Hassle-free size and product exchanges within 14 days of purchase.
          </p>
        </div>

        {/* Policy 2 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition duration-300">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <img src={assets.quality_icon} alt="Return" className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">7-Day Free Returns</h4>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            100% money-back guarantee with zero return shipping fees.
          </p>
        </div>

        {/* Policy 3 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition duration-300">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <img src={assets.support_img} alt="Support" className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">Dedicated 24/7 Support</h4>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            Our expert support team is always ready to assist you anytime.
          </p>
        </div>

      </div>
    </div>
  );
};

export default OurPolicy;