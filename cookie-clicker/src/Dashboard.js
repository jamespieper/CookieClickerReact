import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment, orderBy, limit, arrayUnion } from 'firebase/firestore'

import cookieImg from './assets/cookie.png'
import Leaderboard from './Leaderboard'
import Upgrades from './Upgrades'
import Achievements from './Achievements'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import Alert from '@material-ui/lab/Alert';

import 'animate.css'

import './Dashboard.css'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    const [cookies, setCookies] = useState(0)

    const [achievements, setAchievements] = useState([10])


    const usersCollectionRef = query(collection(db, 'users'), orderBy("cookies", 'desc'), limit(10))

    // removed orderBy("prestigeLvl", 'desc')

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)

            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data)

        }

        const getCookiesFromDB = async () => {

            const docRef = doc(db, "users", currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().cookies);
                setCookies(docSnap.data().cookies)
                setInterval(() => {
                    getUsers();
                }, 5000);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        const getAchievements = async () => {

            const docSnap = await getDoc((doc(db, 'users', currentUser.email)))

            if (docSnap.exists()) {
                console.log("Achievements: " + docSnap.data().achievements)


                setAchievements(docSnap.data().achievements)


            }


        }

        getUsers();
        getCookiesFromDB();
        getAchievements();


    }, [])




    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to logout')
        }
    }

    const animate = (element, animation, duration) => {
        const animationName = `animate__${animation}`;
        const node = document.querySelector(element);

        node.classList.add("animate__animated", animationName);
        node.style.setProperty('--animate-duration', duration)

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove("animate_animated", animationName);
        }

        node.addEventListener("animationend", handleAnimationEnd, { once: true });
    };

    const onBuyButtonClick = () => {
        animate(".cookie-main-img", "pulse", "50ms");
    };

    function clickCookie() {

        // update cookies on UI here

        setCookies(cookies + 1)

        onBuyButtonClick()

        console.log('Cookie count: ' + cookies)

        //change state in here
        updateCookies();

    }




    const updateCookies = async () => {
        // make API call periodically here

        const q = doc(db, "users", currentUser.email)


        await updateDoc(q, {
            //cookies: increment(1)
            cookies: increment(1)

        });

        console.log('updated in database!')
        //take code from state and then push it

    }

    const clickCookie2 = async () => {

        console.log("cookie clicked!")

        const q = doc(db, "users", currentUser.email)

        await updateDoc(q, {
            cookies: increment(1)

        });

        const docRef = doc(db, "users", currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().cookies);
            setCookies(docSnap.data().cookies)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    return (

        <>
            {/* <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" />, }} onClose={() => { }}>Achievement Unlocked!</Alert> */}


            <Navbar className='d-flex justify-content-between px-5 py-3' bg='' style={{ backgroundColor: '#92c9b1', width: '100%' }} variant="light" fixed="" >
                {/* <Container> */}

                <img src={cookieImg} style={{ height: '40px' }} />
                <div className="title" href="/" style={{ fontSize: '28px' }}>COOKIE CLICKER</div>
                <Nav>

                    <Nav.Link href="">{currentUser.email}</Nav.Link>
                    <Nav.Link href="" onClick={handleLogout}>Sign out</Nav.Link>
                </Nav>
                {/* </Container> */}
            </Navbar>




            {error && <Alert variant='danger'>{error}</Alert>}


            <Container className='d-flex align-items-center justify-content-center'>
                <div className='dashboard-container'>

                    <Leaderboard userList={users} />

                    <div style={{ textAlign: 'center', padding: '0 50px' }}>

                        <Button className='cookie-main-img' style={{ border: "solid 1px transparent" }} size="lg" variant="" onClick={clickCookie}>
                            <img className='spinning-cookie' src={cookieImg} alt="add item" width="300" />
                        </Button>

                        <div className="cookie-count text-center">
                            <br />
                            <h2 id='cookies-label'>Cookies</h2>
                            <h1 style={{}}>{cookies.toLocaleString()}</h1>
                        </div>
                    </div>


                    <Upgrades currUser={currentUser} localCookies={cookies} setLocalCookies={setCookies} setLocalAchievements={setAchievements} />
                </div>




            </Container>

            <Container className='justify-content-center'>
                <h2 className='title-achievements'style={{ textAlign: 'center' }}>
                    ACHIEVEMENTS
                </h2>
                <Achievements achievementList={achievements}></Achievements>

                <br/>
                <br/>
                <br/>
            </Container>




        </>
    )
}