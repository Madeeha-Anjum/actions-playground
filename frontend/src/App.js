import logo from './img/logo.png';
import footer from './img/footer.svg';
function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <header className="m-8">
          <nav className="flex items-end justify-between border-b border-black ">
            <img src={logo} className="h-full" alt="logo" />
            <div className="flex flex-wrap">
              <a href="/#" className="px-8">
                Home
              </a>
              <a href="/#" className="px-8">
                About
              </a>
              <a href="/#" className="px-8">
                Contact
              </a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto bg-gray-400">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Shorten
          </button>
        </main>
        <footer className="mx-auto ">
          <img
            src={footer}
            className="absolute bottom-0 left-0 z-1"
            alt="footer"
          />
        </footer>
      </div>
    </>
  );
}

export default App;
