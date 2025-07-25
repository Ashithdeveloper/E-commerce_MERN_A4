import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <div className='mb-5'>
            <h1 className="text-2xl font-bold navLogo w-full ">
              A4-FashionStore
            </h1>
          </div>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
            voluptate molestiae rerum natus et laudantium illo exercitationem
            dicta aperiam voluptatem, suscipit repellat tempora incidunt neque
            velit odio! Eligendi, illum incidunt?
          </p>
        </div>
        <div>
          <p className="text-x1 font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>Privacy policy</li>
            <li>About us</li>
            <li>Delivery</li>
          </ul>
        </div>

        <div>
          <p className="text-x1 font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1 234 567 890</li>
            <li>1Ih8I@example.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Coypright &copy; 2023 All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer