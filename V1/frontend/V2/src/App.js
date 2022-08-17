function App() {
  return (
    <>
      <header className="bg-blue-400 ">
        <section className="mx-auto text-center max-w-7xl">
          <h1 className="p-8 ">Shorten your URLs</h1>
        </section>
      </header>

      <main className="bg-gray-200 ">
        <section className="mx-auto max-w-7xl">
          <div className="p-8">
            <h1 className="text-3xl text-center text-gray-700">
              Shorten your links!
            </h1>
            <p className="text-center text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, quisquam.
            </p>
          </div>
          <div className="p-8 text-center">
            <form>
              <label>Shorten: </label>
              <input className="p-2 mr-2"></input>
              <button className="px-4 py-2 text-center text-gray-500 bg-green-200 rounded hover:bg-gray-500 hover:text-white">
                Shorten
              </button>
            </form>
          </div>
          <div className="p-8">
            <h2 className="text-2xl text-center text-gray-700">Your links:</h2>
            <p className="text-center text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, quisquam.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
