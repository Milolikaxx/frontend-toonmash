function HomeAdmin() {
  return (
    <div className="w-screen h-screen flex justify-start items-center mt-20 flex-col">
      <h1 className="mb-12 text-center font-sans text-5xl font-bold text-gray-900">
        All User
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4">
        <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
          <img
            className="h-48 w-full object-cover"
            src="https://i.pinimg.com/564x/4b/72/e6/4b72e6f2f88a0a787d29c036a99d58c7.jpg"
            alt="Hotel Photo"
          />

          <div className="mt-1">
            <h2 className="text-white text-center">Test</h2>
          </div>
        </article>
        <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
          <img
            className="h-48 w-full object-cover"
            src="https://i.pinimg.com/564x/67/3f/c3/673fc38a5e8814e2c71251bfe0bc4154.jpg"
            alt="Hotel Photo"
          />

          <div className="mt-1">
            <h2 className="text-white text-center">Test</h2>
          </div>
        </article>
        <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
          <img
            className="h-48 w-full object-cover"
            src="https://i.pinimg.com/564x/92/0c/d0/920cd05d2a316d4504499d811802bc66.jpg"
          />

          <div className="mt-1">
            <h2 className="text-white text-center">Test</h2>
          </div>
        </article>
        <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
          <img
            className="h-48 w-full object-cover"
            src="https://i.pinimg.com/564x/f1/53/74/f15374812e2a62ec1a433b0c4697cede.jpg"
          />

          <div className="mt-1">
            <h2 className="text-white text-center">Test</h2>
          </div>
        </article>
        <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
          <img
            className="h-48 w-full object-cover"
            src="https://i.pinimg.com/564x/51/d6/91/51d6910f25e1f639582d89f9b045bb58.jpg"
          />

          <div className="mt-1">
            <h2 className="text-white text-center">Test</h2>
          </div>
        </article>
      </div>
    </div>
  );
}

export default HomeAdmin;
