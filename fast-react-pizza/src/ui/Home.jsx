import CreateUser from "../features/user/CreateUser"

function Home() {
  return (
    <div className="mb-10 mt-10 text-center">
      <h1 className="mb-8 text-center text-2xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500 dark:text-green-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  )
}

export default Home
