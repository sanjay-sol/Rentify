import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const propTypes = {};
const defaultProps = {};
const Navbar = () => {
    const [item, setitem] = useState(null)
    useEffect(()=>{
        setitem(localStorage.getItem("jwt"))
    },[])
    return (
     <>
     <section className="w-full px-8 text-gray-700 bg-white">
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
            <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">Quotes<span className="text-indigo-600" data-primary="indigo-600">.</span></span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
               <Link to="/" className="mr-6 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link>
               
               {item ? 
                <Link to="/profile" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">My Profile</Link>

            : null }
            
                
            </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link to="/signin" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
                Sign up
            </Link>
                    {item ? <Link to="/post" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
               POST
            </Link> : null }
            
        </div>
    </div>
</section>
     </>
    );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
// #endregion

export default Navbar;