import Nav from '../components/Home/Navbar';

const Error = () => {
    return (
        <div className="">
            <Nav />
            <div className="h-screen  flex items-center justify-center flex-col">
                <h1 className="text-[8rem] text-center font-Roboto text-black">404 Page Not Found</h1>
                <p className="text-[2rem] ">Oops! The page you are looking for does not exist.</p>
                <p className="">Please check the URL or go back to the homepage.</p>
                <a 
                className="text-blue-500 cursor-pointer"
                href="/"> Click Here </a>
            </div>

        </div>
    )
};

export default Error;