import ModelButton from "../modelComponents/ModelButton";
import Status from "../statusbar/Status";
// import ToggleButton from "../ToogleButton/ToggleButton";
import './Main.css';
import { Outlet } from "react-router-dom";
import Filter from "../filter/Filter";
import { useMediaQuery } from 'react-responsive';


export default function Main () {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199px)' });

    return (
        <>
            <main>
                {isTabletOrMobile && <ModelButton />}
                <section id="dashboard">
                    {/* <div className="navbar-sections">
                        <Navbar />
                    </div> */}
                    <div className="table-container">
                        <div className="filter-contain">
                            {!isTabletOrMobile && <Filter />}
                        </div>
                        <div className="table-data">
                            <Outlet />
                        </div>
                    </div>
                </section>
                <Status />
            </main>
        </>
    );
}