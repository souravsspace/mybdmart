const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto py-10">
        <p className="text-center text-xs">
          &copy; {year} MyBDmart, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
