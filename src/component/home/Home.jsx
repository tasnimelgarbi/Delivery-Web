import { Link } from "react-router-dom";
import './Home.css' 
import Photo from '../../assets/Untitled Project.jpg'
import Feedback from './Feedback'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10 gap-6 md:gap-8 lg:gap-10">

        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-right order-2 lg:order-1 w-full lg:w-1/2">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 lg:mb-5" style={{ textShadow: "5px 7px 3px #000" }}>
              أهلا بيك في شركتنا للتوصيل
              <span className="scooter ml-2 text-white inline-block">🛵</span>
            </h1>
            <p className="text-amber-50 text-base sm:text-lg md:text-lg mt-4 md:mt-5 lg:mt-6">
              خدمتك أسرع وأبسط معانا 👌
              <br />
              دلوقتي تقدر تسجّل طلبك أونلاين ونوصله لحد باب بيتك في أسرع وقت وبأقل تكلفة✨
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 justify-center mt-2">
         <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 lg:p-6 flex flex-col items-center gap-3 md:gap-4
              hover:scale-105 hover:shadow-[0_0_20px_rgba(189,168,168,0.8)]
              active:scale-105 active:shadow-[0_0_20px_rgba(189,168,168,0.8)]
              transition-transform duration-500 ease-in-out w-full sm:w-[calc(50%-0.5rem)]">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/7662/7662469.png" 
                alt="Logo 1" 
                className="w-12 h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 animate-bounce"  
              />
              <p className="text-white text-center font-semibold text-sm md:text-base">
                توصيل سريع لكل الأماكن القريبة منك
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 lg:p-6 flex flex-col items-center gap-3 md:gap-4
                hover:scale-105 hover:shadow-[0_0_20px_rgba(189,168,168,0.8)]
                active:scale-105 active:shadow-[0_0_20px_rgba(189,168,168,0.8)]
                transition-transform duration-500 ease-in-out w-full sm:w-[calc(50%-0.5rem)]">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/5976/5976651.png" 
                alt="Logo 3" 
                className="w-12 h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 animate-bounce"
              />
              <p className="text-white text-center font-semibold text-sm md:text-base">
                طلباتك بسهولة في أي وقت
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/order">
           <button 
           className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl md:rounded-2xl shadow-lg px-6 py-3 text-white font-bold text-lg 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(189,168,168,0.8)] 
            active:scale-105 active:shadow-[0_0_20px_rgba(189,168,168,0.8)] 
            transition-all duration-600 inline-flex items-center gap-2"
            >
           <span>اطلب الآن</span>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
            className="w-5 h-5 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
           </svg>
          </span>
          </button>
          </Link>
          </div>

        </div>

        <div className="circle order-1 lg:order-2 mb-6 lg:mb-0 lg:ml-10 w-40 h-36 md:w-48 md:h-42 lg:w-60 lg:h-52 xl:w-72 xl:h-64">
          <img src={Photo} alt="crepe" className="circular-move circular-shadow w-full h-full object-cover" />
        </div>
      </div>
      
      <Feedback />
      <Footer />
    </>
  )
}

export default Home
