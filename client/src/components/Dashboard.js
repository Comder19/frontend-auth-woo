import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
// import NavBar from './Navbar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import Navbar from './Navbar';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import backgroundImage from "./img/image.jpg"
// import {Img} from 'react-image'
import Image from "./img/image.jpg"
import { ListGroup } from "reactstrap";
import logo from "./img/logo.png"
import "./Footer.css"
// import Contact from './Contact/Contact'
// import Experience from './Experience/Experience';
// import Footer from './Footer/Footer';

// import Intro from './components/Intro/Intro';
// import Navbar from './components/Navbar/Navbar';
// import Portfolio from './components/Portfolio/Portfolio';
// 
// import Works from './Works/Works';
// import {themeContext} from './Context'
// import {
//     Nav,
//     NavLogo,
//     NavLink,
//     Bars,
//     NavMenu,
//     NavBtn,
//     NavBtnLink,
// } from "./NavbarElements";

const Dashboard = () => {
    // const { logindata, setLoginData } = useContext(LoginContext);

    // const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }


    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

    


    

    return (
        <>
        <header>





           
            <Nav>
            <NavLogo to="" >
                Eatify
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to=""
                  activeStyle={{ color:'black' }}
                >
                    Home
                </NavLink>
                <NavLink 
                  to=""
                  activeStyle={{ color: 'black' }}
                >
                    About
                </NavLink>
                <NavLink 
                  to="" 
                  activeStyle={{ color: 'black' }}
                >
                    Cart
                </NavLink>
                <NavLink
                  to=""
                  activeStyle={{ color: 'black' }}
                >
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/register">Sign Up</NavBtnLink>
                </NavBtn>
                
                <NavBtn>
                    <NavBtnLink to="/">Sign Out</NavBtnLink>
                </NavBtn>
                



        
                


            </NavMenu>
           </Nav> 
           </header>
           
           <img src={Image } alt="/" width={"max-width: -webkit-fill-available;"} height={"1400vh"} sizes='fit' />
           
           
  
           {/* <div
            class = "image"
            style = {{
               height: "350px",
               width: "550px",
               backgroundImage:
               'url("image.jpg")',
               backgroundSize: "contain",
               backgroundRepeat: "no-repeat",
            }}
         >
            This div contains a background image.
         </div> */}
         {/* </img> */}
         <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>MyPizza</h5>
        <p>Best Pizzas in town, try it out!</p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Delivery Time</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Friday - Tuesday</span>
            <p>10:00am - 11:00pm</p>
          </div>
          <div className="delivery__time-item border-0 ps-0" >
            <span>Wednesday - Thursday</span>
            <p>Off day</p>
          </div>
        </ListGroup>
      </div>
    </footer>

    

        </>

    )
}
export const Nav = styled.nav`
    background: #3c6d79;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  text: bold;
  justify-content: flex-start;
  font-size: 2rem;
  text-decoration: none;

`;
// export const NavImg = styled(Link)`
  
  
//   justify-content: center;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   max-width: -webkit-fill-available;

// `;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&:hover {
  color: black;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
export const Menus = styled(Link)`
position: relative;
display: inline-block;
margin : left;
`
    /* Styles for the menu container, e.g., background color, border, etc. */

  ;
  
//   const menulist = styled(Link)`
//     /* Styles for the menu item list, e.g., padding, spacing */
//     justify-content: flex-end; /* Align items to the right, equivalent to Material-UI prop */
//   }
//   `;
  
//   const menuitem = styled(Link)    `
//     /* Existing styles... */
//     background-color: #fff; /* Button background color */
//     color: #000;            /* Button text color */
//     border: 1px solid #ccc;  /* Button border */
//     padding: 10px 20px;     /* Button padding */
//     cursor: pointer;        /* Indicates clickable element */
//     /* Add hover effects for button interaction (optional) */
//     transition: background-color 0.2s ease;
//     &:hover {
//       background-color: #f0f0f0;
//     }
//   }
//   `;


export default Dashboard