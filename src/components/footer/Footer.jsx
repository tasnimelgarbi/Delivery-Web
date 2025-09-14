const Footer = () => {
  return (
    <footer className="mt-6 pb-5 bg-black ">
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} TM. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
