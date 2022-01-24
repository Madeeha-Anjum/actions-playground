import Input from "./Input";
function App() {
  return (
    <>
      <div className="md:flex md:h-screen">
        <form className="p-8 bg-blue-400 ">
          <Input
            id="url"
            label="Shortener URL"
            type="url"
            placeholder="Insert a long url"
            wrapperClassName="py-4"
          />
          <button className="px-4 py-2 text-center text-gray-500 bg-gray-200 rounded hover:bg-gray-500 hover:text-white">
            Shorten
          </button>
        </form>
        <main className="bg-gray-100 md:w-full">main content !!</main>
      </div>
    </>
  );
}

export default App;
