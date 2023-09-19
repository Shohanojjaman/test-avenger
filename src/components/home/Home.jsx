import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cart from '../cart/Carts';

function Home() {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [costRemaining, setCostRemaining] = useState(20000);

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

  const handleSelectedActor = (actor) => {
    let cost = actor.salary;
    const isExist = selectedActors.find((item) => item.id == actor.id);
    if (isExist) {
      return Swal.fire({
        icon: 'error',
        title: 'Sorry',
        text: 'Already added!',
      });
    } else {
      selectedActors.forEach((item) => {
        cost += item.salary;
      });
      if (cost > 20000) {
        return Swal.fire({
          icon: 'error',
          title: 'Sorry',
          text: 'Out of budget!',
        });
      }
      setTotalCost(cost);
      setCostRemaining(costRemaining - actor.salary);
      setSelectedActors([...selectedActors, actor]);
    }
    console.log(cost);
  };
  return (
    <div className="container mx-auto max-sm:px-5 flex my-6 text-white gap-6">
      <div className="w-3/4 grid grid-cols-3 gap-6">
        {allActors.map((actor) => (
          <div key={actor.id} className="border-2 text-center flex flex-col gap-3 p-4 rounded-lg">
            <img className="w-20 mx-auto rounded-full" src={actor.image} alt="" />
            <h3 className="text-3xl">{actor.name}</h3>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, beatae!</p>
            <div className="flex justify-between">
              <p>Salary: ${actor.salary}</p>
              <p>Role: {actor.role}</p>
            </div>
            <ul>
              <li>
                <a href={actor.fbUrl}>Facebook</a>
              </li>
              <li>
                <a href={actor.twitter}>Twitter</a>
              </li>
            </ul>
            <button onClick={() => handleSelectedActor(actor)} className="bg-cyan-500 self-center px-7 py-2 rounded-lg">
              Select
            </button>
          </div>
        ))}
      </div>
      <Cart selectedActors={selectedActors} totalCost={totalCost} costRemaining={costRemaining}></Cart>
    </div>
  );
}

export default Home;
