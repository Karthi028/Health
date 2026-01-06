import HealthChart from "../components/HealthChart"
import HealthRecord from "../components/HealthRecord"
import Navbar from "../wrapper/Navbar"

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex gap-10 mt-5">
        <HealthRecord />
        <HealthChart/>
      </div>

    </div>  
  )
}

export default Home