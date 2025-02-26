import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {
  FaCode,
  FaMobileAlt,
  FaChartLine,
  FaBullhorn,
  FaSearch,
  FaPaintBrush,
  FaServer,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();

  const handleScroll = () => {
    const targetId = location.pathname === "/aboutdesc" ? "about-desc" : "car";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }) ||
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  return (
    <>
      <footer
        className={`bg-black w-full m-auto lg:px-20 px-10 py-7 grid lg:grid-cols-3 grid-cols-1 justify-center items-start lg:gap-20 gap-10`}
      >
        <div
          // data-aos="zoom-in"
          className="flex flex-col justify-center items-start gap-5 lg:ml-20"
        >
          <div className="mb-0">
            <h1 className="text-white text-2xl font-semibold border-b-2 border-red-500 inline-block">
              About Us
            </h1>
          </div>
          <p className="text-slate-200">
            We are committed to delivering{" "}
            <span>high-quality digital solutions</span>, including{" "}
            <span>website & mobile app development</span>, SEO optimization,
            UI/UX design, and digital marketing. Our expert team ensures that
            your business stays ahead in the competitive market by providing{" "}
            <span>innovative, scalable, and user-friendly services</span>{" "}
            tailored to your needs. From <span>SEO-optimized content</span> to{" "}
            <span>seamless user experiences</span>, we focus on driving growth,
            engagement, and long-term success.
          </p>
        </div>

        <div
          // data-aos="zoom-in"
          className="flex flex-col justify-center items-start gap-5 lg:ml-30"
        >
          <div className="mb-0">
            <h1 className="text-white text-2xl font-semibold border-b-2 border-red-500 inline-block">
              Contact Us
            </h1>
          </div>

          <div className="group flex justify-center items-center gap-3">
            <FaMapMarkerAlt className="text-yellow-400 size-6 group-hover:scale-125" />
            <p className="text-slate-200 group-hover:text-red-400">
              34, 3rd floor, Sanket park, Iskon mandir,
              Harinagar,Vadodara-390007, India
            </p>
          </div>

          <div className="group flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-green-400 size-6 group-hover:text-green-500 group-hover:scale-125" />
            <p className="text-slate-200 group-hover:text-red-400">
              +91 8866646691
            </p>
          </div>

          <div className="group flex justify-center items-center gap-3">
            <FaEnvelope className="text-blue-400 size-6 group-hover:text-blue-500 group-hover:scale-125" />
            <p className="text-slate-200 group-hover:text-red-400">
              techybuilderr@gmail.com
            </p>
          </div>
        </div>

        <div
          // data-aos="zoom-in"
          className="flex flex-col justify-center items-start gap-2 lg:ml-30"
        >
          <div className="mb-1">
            <h1 className="text-white text-2xl font-semibold border-b-2 border-red-400 inline-block">
              Our Services
            </h1>
          </div>
          <Link to="services" spy={true} smooth={true} offset={-50}>
            <div className="flex flex-col gap-2">
              {[
                {
                  icon: <FaCode className="text-blue-500" />,
                  text: "Website Development",
                },
                {
                  icon: <FaMobileAlt className="text-green-500" />,
                  text: "Mobile App Development",
                },
                {
                  icon: <FaChartLine className="text-yellow-500" />,
                  text: "SEO Service",
                },
                {
                  icon: <FaBullhorn className="text-purple-500" />,
                  text: "Digital Marketing Service",
                },
                {
                  icon: <FaSearch className="text-orange-500" />,
                  text: "Social Media Management",
                },
                {
                  icon: <FaPaintBrush className="text-pink-500" />,
                  text: "UI/UX Design",
                },
                {
                  icon: <FaServer className="text-teal-500" />,
                  text: "Website Maintenance Service",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-xl transition-all duration-300 group-hover:scale-125">
                    {service.icon}
                  </span>
                  <h1 className="text-lg text-white transition-all duration-300 group-hover:text-red-400">
                    {service.text}
                  </h1>
                  <HiArrowRight className="ml-1 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-gray-300" />
                </div>
              ))}
            </div>
          </Link>
        </div>
      </footer>

      <div className={`bg-black py-6 px-6`}>
        {/* Policy Links */}
        <div className="max-w-[80%] mx-auto flex flex-wrap justify-center md:justify-between items-center text-sm mb-2 gap-x-6">
          <a
            href="#"
            className="hover:underline whitespace-nowrap text-xl text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline whitespace-nowrap text-xl text-white"
          >
            Refund Policy
          </a>
          <a
            href="#"
            className="hover:underline whitespace-nowrap text-xl text-white"
          >
            Terms and Conditions
          </a>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-500 w-[90%] mx-auto my-2"></div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 text-3xl mb-2 mt-5">
          <a
            href="https://www.facebook.com/share/1BY1P9GX4v/"
            className="text-blue-500 hover:text-blue-400 hover:scale-145 transition-transform duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/techy-builder-2a074834b"
            className="text-blue-700 hover:text-blue-600 hover:scale-145 transition-transform duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/techy_builder?igsh=MWVpMnc5M3YxOG4xeg%3D%3D&utm_source=qr"
            className="text-pink-500 hover:text-pink-400 hover:scale-145 transition-transform duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            className="text-red-500 hover:text-red-400 hover:scale-145 transition-transform duration-300"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/9826250413"
            className="text-green-500 hover:text-green-400 hover:scale-145 transition-transform duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://x.com/techy_builder?t=RyVr_J-sE9HsW_6xBX6F4Q&s=09"
            className="text-blue-400 hover:text-blue-300 hover:scale-145 transition-transform duration-300"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-center">
          © 2025 Copyright Techy Builder. All rights reserved
        </p>
      </div>

    

<div
      className="bg-[#2a52be] p-5 rounded-full hover:scale-110 cursor-pointer fixed bottom-6 right-6 z-50"
      onClick={handleScroll}
    >
      <FaArrowUp className="size-6 text-white" />
    </div>

      {/* WhatsApp Contact Button */}
      <div
  id="whatsapp-box"
  className="fixed bottom-6 left-5 flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7 z-50"
>
  {/* WhatsApp Icon */}
  <a
    href="https://wa.me/8866646691"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 rounded-full md:p-5 p-5  hover:bg-black flex items-center justify-center shadow-lg cursor-pointer"
  >
    <FaWhatsapp className="text-white size-6" />
  </a>
</div>

    </>
  );
};

export default Footer;
