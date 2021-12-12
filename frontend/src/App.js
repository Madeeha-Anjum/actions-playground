import logo from './img/logo.svg';
import footer from './img/footer.svg';
import { useState, useEffect } from 'react';
import api from './api';
function App() {
  const [longURl, setURL] = useState('');

  const [persons, setPersons] = useState([]);

  let onClickHandler = () => {
    console.log('clicked');
    console.log(longURl);
  };

  useEffect(() => {
    api.get('/persons').then((res) => {
      console.log(res.data);
      setPersons(res.data.data);
    });
  }, []);

  return (
    <>
      {/* {persons.map((person) => (
        <div key={person.firstname + person.lastname}>
          {person.firstname} {person.firstname}
        </div>
      ))} */}

      <div className="min-h-screen bg-bottom bg-no-repeat bg-background bg-wave-pattern ">
        <header className="border-black md:mx-16">
          <nav className="inline-block py-4 text-white sm:p-4 ">
            <span>
              <img
                src={logo}
                alt="logo"
                className="inline-block h-10 text-left"
              />
            </span>
            <span>
              <a href="/#" className="m-8">
                Home
              </a>
            </span>
            <span>
              <a href="#" className="m-8">
                History
              </a>
            </span>
            <span>
              <a href="/#" className="m-8">
                Feedback
              </a>
            </span>
          </nav>
        </header>
        <main className="mt-12">
          <h1 className="mb-8 text-2xl text-center text-white">
            Shorten your Links
          </h1>
          <div className="flex mx-4 sm:mx-10 md:mx-20 xl:mx-40 ">
            <form className="px-8 py-8 mx-auto mb-4 rounded bg-opacity-10 bg-gray-50 shadow-3xl">
              <label
                className="block mb-2 text-sm font-bold text-white"
                htmlFor="creditCard"
              >
                Shorten URL
              </label>
              <div className="flex m-4">
                <input
                  className="w-full p-4 mr-0 text-white bg-transparent bg-gray-500 border-t border-b border-l border-transparent rounded-l-lg focus:outline-none focus:border-gray-300"
                  id="creditCard"
                  type="text"
                  placeholder="Url"
                />

                <button
                  className="p-4 px-8 font-bold text-gray-800 uppercase bg-blue-400 border-t border-b border-r border-blue-500 rounded-r-lg "
                  type="submit"
                >
                  Shorten
                </button>
              </div>
            </form>
          </div>
          <div className="mx-4 overflow-auto h-96 sm:mx-10 md:mx-20 xl:mx-40">
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
            <div className="w-full px-8 py-8 mx-auto mb-4 text-white rounded bg-opacity-10 bg-gray-50 shadow-3xls">
              <h1>
                Long URL: <span className="text-blue-500">www.google.com</span>
              </h1>
              <h1>
                Short URL: <span className="text-blue-500">short.ca</span>
              </h1>
            </div>
          </div>
        </main>
        <footer className=""></footer>
      </div>
    </>
  );
}

export default App;
