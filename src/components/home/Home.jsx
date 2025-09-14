import React, { useState, useEffect, useMemo } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { supabase } from "../../supabaseClient";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

useEffect(() => {
  fetchOrders();
  const channel = supabase
    .channel("orders-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "orders" },
      (payload) => {
        console.log("Realtime Change:", payload);
        if (payload.eventType === "INSERT") {
          const newOrder = {
            ...payload.new,
            status: payload.new.status || "pending",
          };
          setOrders((prev) => [newOrder, ...prev]);
        }
        if (payload.eventType === "UPDATE") {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === payload.new.id
                ? { ...payload.new, status: payload.new.status || "pending" }
                : o
            )
          );
        }
        if (payload.eventType === "DELETE") {
          setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
        }
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}, []);


async function fetchOrders() {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) {
    console.error("❌ Error fetching orders:", error);
  } else {
    const ordersWithStatus = data.map(o => ({ ...o, status: o.status || "pending" }));
    ordersWithStatus.sort((a, b) => b.id - a.id);
    setOrders(ordersWithStatus);
  }
}


  const totals = useMemo(() => {
    const totalOrders = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const onTheWay = orders.filter((o) => o.status === "On The Way").length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;
    return { totalOrders, pending, onTheWay, delivered };
  }, [orders]);


  const filtered = orders.filter((o) => {
    if (filter !== "All" && o.status !== filter) return false;
    if (query.trim() === "") return true;
    const q = query.toLowerCase();
    return (
      String(o.id).includes(q) ||
      (o.name && o.name.toLowerCase().includes(q)) ||
      (o.pickup && o.pickup.toLowerCase().includes(q)) ||
      (o.delivery && o.delivery.toLowerCase().includes(q)) ||
      (o.details && o.details.toLowerCase().includes(q))
    );
  });


async function changeStatus(id, status) {
  setOrders(prev =>
    prev.map(o => (o.id === id ? { ...o, status } : o))
  );
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("❌ Error updating status:", error);
    fetchOrders(); 
  }
}

  async function removeOrder(id) {
    if (!confirm("عايز تمسح الطلب؟")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) console.error("❌ Error deleting order:", error);
  }

function exportCSV() {
  if (!orders || orders.length === 0) return;
  const keys = ["name", "phone", "pickup", "delivery"];
  const headers = ["الاسم", "رقم الهاتف", "الاستلام", "التوصيل"];
  const rows = orders.map((o) =>
    keys.map((k) => {
      let val = o[k] !== undefined ? o[k] : "";
      if (k === "phone") val = `="${val}"`;
      return val;
    })
  );
  const csvContent =
    "\uFEFF" +
    [headers, ...rows]
      .map((row) =>
        row.map((v) => `"${v.toString().replace(/"/g, '""')}"`).join(";")
      )
      .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}


  return (
    <div className="min-h-screen font-sans">

      <Header onAddOrder={() => {}} onExport={exportCSV} />

    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 mt-10 mb-16 w-full max-w-6xl mx-auto justify-items-center text-center">
    <div className="w-36 sm:w-40 lg:w-72 p-2 sm:p-4 lg:p-10" >
    <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-lg" style={{boxShadow: "0 4px 6px rgba(15, 23, 42, 0.8)"}}>
      <div className="text-sm lg:text-lg text-gray-500">اجمالي الطلبات</div>
      <div className="text-xl lg:text-4xl font-bold">{totals.totalOrders}</div>
    </div>
  </div>
   <div className="w-36 sm:w-40 lg:w-72 p-2 sm:p-4 lg:p-10">
    <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-lg" style={{boxShadow: "0 4px 6px rgba(15, 23, 42, 0.8)"}}>
      <div className="text-sm lg:text-lg text-gray-500">في الانتظار</div>
      <div className="text-xl lg:text-4xl font-bold text-amber-600">{totals.pending}</div>
    </div>
  </div>
    <div className="w-36 sm:w-40 lg:w-72 p-2 sm:p-4 lg:p-10">
    <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-lg" style={{boxShadow: "0 4px 6px rgba(15, 23, 42, 0.8)"}}>
      <div className="text-sm lg:text-lg text-gray-500">في الطريق</div>
      <div className="text-xl lg:text-4xl font-bold text-blue-600">{totals.onTheWay}</div>
    </div>
  </div>
  <div className="w-36 sm:w-40 lg:w-72 p-2 sm:p-4 lg:p-10">
    <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-lg" style={{boxShadow: "0 4px 6px rgba(15, 23, 42, 0.8)"}}>
      <div className="text-sm lg:text-lg text-gray-500">تم التوصيل</div>
      <div className="text-xl lg:text-4xl font-bold text-green-600">{totals.delivered}</div>
    </div>
  </div>
</section>


<section className="flex flex-col items-center mb-4 px-4 gap-3 w-full">
  <div className="flex flex-wrap justify-center gap-4 font-bold w-full">
    {["All", "pending", "On The Way", "Delivered"].map((s) => {
      let label = "";
      let emoji = "";
      switch (s) {
        case "All":
          label = "الكل";
          emoji = "📋";
          break;
        case "pending":
          label = "في الانتظار";
          emoji = "⏳";
          break;
        case "On The Way":
          label = "في الطريق";
          emoji = "🚚";
          break;
        case "Delivered":
          label = "تم التوصيل";
          emoji = "✅";
          break;
      }
      return (
        <button
          key={s}
          onClick={() => setFilter(s)}
          className={`cursor-pointer flex justify-center items-center gap-2 px-3 py-2 sm:py-3 rounded-xl border-2 border-gray-300 transition-all
          w-1/3 sm:w-auto
          ${filter === s ? "bg-green-500 text-white" : "bg-white"}`}
        >
          <span>{label}</span>
          <span className="animate-bounce">{emoji}</span>
        </button>
      );
    })}
  </div>

  <div className="relative w-full sm:w-2xl mt-3">
    <input
      placeholder="ابحث بالاسم / العنوان..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full py-3 bg-white border-2 border-gray-300 rounded-xl px-10 focus:border-green-500 transition-all outline-none"
    />
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    </span>
  </div>
</section>


 <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 mb-10 mt-12">
  {filtered.map((o) => {
    let bgColor = "bg-white";
    let textColor = "text-gray-900";
    let borderColor = "border-gray-300";
    let shadowColor = "shadow-gray-300";
    switch (o.status) {
      case "pending":
        textColor = "text-yellow-700";
        borderColor = "border-yellow-400";
        shadowColor = "shadow-yellow-300";
        break;
      case "On The Way":
        textColor = "text-blue-800";
        borderColor = "border-blue-400";
        shadowColor = "shadow-blue-300";
        break;
      case "Delivered":
        textColor = "text-green-800";
        borderColor = "border-green-400";
        shadowColor = "shadow-green-300";
        break;
      default:
        textColor = "text-gray-900";
        borderColor = "border-gray-300";
    }
    return (
      <div
        key={o.id}
        className={`border ${borderColor} bg-white rounded-3xl shadow-md ${shadowColor} p-6 flex flex-col justify-between transform transition-transform hover:-translate-y-3 hover:scale-105 hover:shadow-lg duration-300`}
        aria-label={`Order card for ${o.name || "بدون اسم"}`}
      >
        <div className="font-extrabold text-2xl mb-5 text-center space-y-2">
          <div className="text-4xl" aria-hidden="true">
            {o.status === "pending" ? "⏳" : o.status === "On The Way" ? "🚚" : "✅"}
          </div>
          <h2 className={` ${textColor} truncate`}>
            {o.name || "بدون اسم"}
          </h2>
          <p className={`text-sm ${textColor} flex items-center justify-center gap-2`}>
            <span className="material-icons text-base"></span> {o.phone}
          </p>
        </div>
        <div className="bg-white bg-opacity-70 rounded-xl p-4 shadow-inner mb-6">
          <p className={`text-sm ${textColor} mb-2`}>
            <span className="font-bold">من:</span> {o.pickup}
          </p>
          <p className={`text-sm ${textColor} mb-2`}>
            <span className="font-bold">إلى:</span> {o.delivery}
          </p>
          <p className={`text-sm ${textColor} whitespace-pre-wrap`}>
            <span className="font-bold">التفاصيل:</span> {o.details}
          </p>
        </div>


        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex gap-4 text-2xl cursor-pointer" role="group" aria-label="Change order status">
            {["pending", "On The Way", "Delivered"].map((statusStep) => {
              let emoji = statusStep === "pending" ? "⏳" : statusStep === "On The Way" ? "🚚" : "✅";
              return (
                <button
                  key={statusStep}
                  onClick={() => changeStatus(o.id, statusStep)}
                  className={`transition-transform hover:scale-125 duration-300 rounded-full p-2 ${
                    o.status === statusStep
                      ? "opacity-100 animate-pulse bg-white shadow-md"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-pressed={o.status === statusStep}
                  aria-label={`Set status to ${statusStep}`}
                  title={statusStep}
                >
                  {emoji}
                </button>
              );
            })}
          </div>


<div className="flex justify-center flex-wrap gap-4 sm:gap-6 lg:gap-8">
  <button
    onClick={() => removeOrder(o.id)}
    className="text-red-600 text-2xl transition-transform hover:scale-125 hover:text-red-400 cursor-pointer"
    title="حذف الطلب"
    aria-label="Delete order"
  >
    🗑️
  </button>
  <a
    href={`https://wa.me/201004201439?text=${encodeURIComponent(
      `طلب #${o.id} - ${o.name || "بدون اسم"}\n📞 ${o.phone}\n📍 من: ${o.pickup}\n➡️ إلى: ${o.delivery}\n🍴 ${o.details}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition duration-300 flex items-center gap-3 shadow-md"
    title="إرسال واتساب"
    aria-label="Send WhatsApp message"
  >
    <span className="text-xl">💬</span> واتساب
  </a>
          </div>
        </div>
      </div>
    );
  })}
</section>


<div className="flex justify-center mt-4">
  <button
    onClick={async () => {
      if (!confirm("هل أنتِ متأكدة إنك عايزة تمسحي كل الطلبات؟")) return;
      const { error } = await supabase.from("orders").delete().neq("id", 0); 
      if (error) {
        console.error("❌ Error deleting all orders:", error);
      } else {
        setOrders([]);
      }
    }}
    className="bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-900 transition duration-300 font-bold"
  >
    حذف الكل
  </button>
</div>

      <Footer />
    </div>
  );
}

