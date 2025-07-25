import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../component/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className="text-2x1 text-center pt-8 border-t">
        <Title text1="About" text2="Us" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            numquam vero unde rem saepe sapiente nulla optio reprehenderit
            alias. Omnis consectetur dolores harum velit. Nobis ipsum labore
            perspiciatis culpa a.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim eos
            mollitia dolorem accusantium voluptas autem assumenda maiores
            corporis, consectetur nemo, animi quia obcaecati non incidunt. Dolor
            libero inventore accusamus nesciunt!
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et qui
            saepe maxime magnam totam rem nesciunt, doloribus aperiam
            repudiandae. Tenetur eaque, quisquam perferendis numquam pariatur
            eius doloremque alias dignissimos dicta!
          </p>
        </div>
      </div>
      <div className="text-x1 py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sit incidunt vitae reiciendis alias sed a in ab adipisci ex at
            maxime, quidem magnam voluptate expedita impedit quas rerum ut.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sit incidunt vitae reiciendis alias sed a in ab adipisci ex at
            maxime, quidem magnam voluptate expedita impedit quas rerum ut.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5">
          <b>Customer Satisfaction:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sit incidunt vitae reiciendis alias sed a in ab adipisci ex at
            maxime, quidem magnam voluptate expedita impedit quas rerum ut.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
}

export default About