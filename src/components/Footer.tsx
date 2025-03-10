const Footer = () => {
  return (
    <footer className="bg-[#403D94] text-gray-300 py-8 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <p className="bg-white w-fit py-2 px-4 font-bold text-[#161653] md:text-xl text-sm rounded-md shadow-md">
          Lorem Ipsum
        </p>
        
        <div className="flex flex-col md:flex-row justify-between md:space-x-10">
          <div className="md:w-1/3 space-y-4">
            <p className="text-2xl font-bold">Sign Up Today!</p>
            <button className="bg-white text-[#403D94] font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-all">
              Sign Up
            </button>
          </div>
          
          <div className="flex flex-wrap md:w-2/3 justify-between">
            <div className="space-y-3">
              <a className="hover:underline" href="https://unai.edu/">UNAI</a>
              <a className="hover:underline" href="https://fti.unai.edu/">FTI</a>
              <a className="hover:underline" href="https://github.com/">Github</a>
            </div>
            <div className="space-y-3">
              <a className="hover:underline" href="https://tailwindcss.com/">Tailwind</a>
              <a className="hover:underline" href="https://react.dev/">React JS</a>
              <a className="hover:underline" href="https://axios-http.com/docs/intro">Axios</a>
            </div>
            <div className="space-y-3">
              <a className="hover:underline" href="https://tanstack.com/query/latest">Tanstack Query</a>
              <a className="hover:underline" href="https://reactnavigation.org/">React Navigation</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-500 pt-4 flex flex-col md:flex-row justify-between text-xs">
          <p className="md:w-2/3 leading-5">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="text-right md:text-left">© Lorem Ipsum 2025.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;