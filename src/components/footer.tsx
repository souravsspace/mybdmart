const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {year} MyBDmart, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
