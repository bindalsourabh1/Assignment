import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookTicket from "./components/BookTicket";

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<ShowList shows={shows} />} />
          <Route path="/show/:id" element={<ShowSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

function ShowList({ shows }) {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4 text-center">Shows List</h1>
      <div className="grid grid-cols-3 gap-4 p-8">
        {shows.slice(1, 13).map((show) => (
          show?.show?.image?.medium && (
            <div className="p-4 border-2" key={show?.show?.id}>
              <Link to={`/show/${show?.show?.id}`} className="block">
                <img className="mx-auto w-3/4" src={show?.show?.image?.medium} alt="show" />
                <div className="text-center">
                  <h5 className="text-xl">{show.show.name}</h5>
                  <p className="font-bold">Type - {show.show.type}</p>
                </div>
              </Link>

            </div>
          )
        ))}
      </div>
    </div>
  );
}



function ShowSummary() {
  const showId = window.location.pathname.split("/")[2];
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  return (
    <div>
      {show ? (
        <>
          <h1 className="font-bold text-2xl p-4 my-auto">{show.name} - Summary</h1>
          <div className="p-3 border-2" dangerouslySetInnerHTML={{ __html: show.summary }} />
          <BookTicket showName={show.name} className="flex justify-center" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default App;
