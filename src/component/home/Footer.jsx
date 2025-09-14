import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-xl font-bold mb-3">شركة توصيل</h2>
          <p className="text-gray-300 leading-relaxed">
            شركة شحن وتوصيل سريعة وموثوقة، بنقدملك خدماتنا لحد باب بيتك 
            بأسرع وقت وبأفضل الأسعار 🛵⚡
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">تابعنا</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">تواصل معنا</h3>
          <p className="flex items-center gap-2 text-gray-300">
         <FontAwesomeIcon icon={faPhone} />
          <a 
           href="tel:01001234567" 
           className="flex items-center gap-2 text-gray-300 hover:text-white transition" 
          dir="ltr">
          0100 123 4567
        </a>
        </p>


          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <FontAwesomeIcon icon={faEnvelope} /> info@tawseel.com
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} TM. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
