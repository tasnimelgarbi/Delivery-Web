import React, { useState, useEffect } from "react";
import Footer from "../home/Footer";
import { supabase } from './supabaseClient'
import './order.css'

const Order = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    delivery: "",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showScooterIntro, setShowScooterIntro] = useState(true);

  const form_details = [
    { label: "الاسم", type: "text", id: "name" },
    { label: "رقم الهاتف", type: "number", id: "phone" },
    { label: "مكان استلام الاوردر", type: "text", id: "pickup" },
    { label: "مكان توصيل الاوردر", type: "text", id: "delivery" },
    { label: "تفاصيل الاوردر", type: "textarea", id: "details" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowScooterIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "⚠ الاسم مطلوب";
    if (!formData.pickup.trim()) newErrors.pickup = "⚠ مكان الاستلام مطلوب";
    if (!formData.delivery.trim()) newErrors.delivery = "⚠ مكان التوصيل مطلوب";
    if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = "⚠ رقم الهاتف لازم يكون 11 رقم";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const { data, error } = await supabase.from('orders').insert([
        {
          name: formData.name,
          phone: formData.phone,
          pickup: formData.pickup,
          delivery: formData.delivery,
          details: formData.details,
          status: 'pending'
        }
      ]);

      setLoading(false);

      if(error){
        console.log("Supabase Error:", error);
        alert(`❌ حصل خطأ أثناء إرسال الأوردر: ${error.message}`);
      } else {
        console.log("Order Added:", data);
        alert("✅ تم إرسال الأوردر بنجاح!");
        setFormData({ name:"", phone:"", pickup:"", delivery:"", details:"" });
      }
    } catch(err){
      setLoading(false);
      console.log("Unexpected Error:", err);
      alert("❌ حصل خطأ غير متوقع أثناء إرسال الأوردر");
    }
  };

  if (showScooterIntro) {
    return (
      <div className="relative w-full h-screen bg-cyan-950 overflow-hidden">
        <img
          src="https://cdn-icons-png.flaticon.com/512/15370/15370596.png"
          alt="Scooter"
          className="animate-scooter-fly w-40 h-auto"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">

        <header className="bg-cyan-950 shadow-lg rounded-full mt-4 mx-4 flex justify-center items-center" 
          style={{ boxShadow: "0 5px 5px 0 rgba(255,255,255,0.2)", textShadow: "5px 7px 3px #000" }}>
          <div className="flex items-center gap-3 p-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt="Logo" className="w-12 h-12"/>
            <h1 className="text-2xl font-bold text-white">شركة توصيل</h1>
          </div>
        </header>

        <main className="flex-grow flex justify-center items-center mt-8">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-2xl w-80 space-y-4 shadow-lg hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
            {form_details.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label htmlFor={field.id} className="mb-1 font-semibold text-white text-right">{field.label}:</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    rows="3"
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`w-full border text-white rounded-lg p-2 focus:outline-none focus:ring-2 transition-all ${
                      errors[field.id] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-cyan-950"
                    }`}
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    className={`text-white w-full border rounded-lg p-2 focus:outline-none focus:ring-2 transition-all ${
                      errors[field.id] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-cyan-950"
                    }`}
                  />
                )}
                {errors[field.id] && <span className="text-red-500 text-sm mt-1">{errors[field.id]}</span>}
              </div>
            ))}

            <button type="submit" className="w-full bg-cyan-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-900 transition-all relative">
              {loading ? (
                <div className="flex justify-center items-center gap-2">      
                  <span>جارٍ إرسال الطلب...</span>
                  <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt="Scooter Loader" className="w-6 h-6 animate-delivery"/>
                </div>
              ) : (
                "إرسال الطلب"
              )}
            </button>
          </form>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Order;
