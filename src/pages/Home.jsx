import { useState } from "react"
import HealthChart from "../components/HealthChart"
import HealthRecord from "../components/HealthRecord"
import Navbar from "../wrapper/Navbar"

const Home = () => {

  const [count, setcount] = useState(0);

  return (
    <div className="">
      <Navbar />
      <div className="flex gap-10 mt-5">
        <HealthRecord setcount={setcount}
          count={count} />
        <HealthChart count={count} />
      </div>

    </div>
  )
}

export default Home