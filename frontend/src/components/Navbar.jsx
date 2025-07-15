import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="hover:text-blue-300 transition duration-300">Prepify</Link>
      </div>

      <div className="flex gap-8 text-lg">
        <Link 
          to="/setup" 
          className="hover:text-blue-300 hover:drop-shadow-md transition duration-300"
        >
          Setup Interview
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
