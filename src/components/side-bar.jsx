//import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
// import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
// import SpeedIcon from '@mui/icons-material/Speed';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
export default function SideBar(props) {
    const { children } = props;
    return (
        <>
            <main className="d-flex flex-nowrap vh-100">
                <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-4  "><h1 className='text-end w-100'>Menu</h1></span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        {/* <li className="nav-item">
                            <div className='nav-link text-white flex-row  '>
                                <HomeIcon />
                                <Button className='text-white'  >Home</Button>
                            </div>
                        </li> */}
                        <li className="nav-item">
                            <div className='nav-link text-white flex-row active '>
                                <SettingsIcon />
                                <Button className='text-white'  >Configuracion</Button>
                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <div className='nav-link text-white flex-row  '>
                                <CalendarViewMonthIcon />
                                <Button className='text-white'  >Horarios</Button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className='nav-link text-white flex-row  '>
                                <SpeedIcon />
                                <Button className='text-white'  >Funcionamiento</Button>
                            </div>
                        </li> */}

                    </ul>
                    <hr />
                </div>
                <div className="vh-100 container-md overflow-scroll text-center ">
                    <Container maxWidth="xl">
                        {children}
                    </Container>
                </div>
            </main>

        </>
    )
}