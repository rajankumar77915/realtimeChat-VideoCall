import { useState, useEffect } from "react";
import { BrowserRouter, Link, useLocation, useNavigate } from "react-router-dom";

const App1 = () => {
    const location = useLocation();
    const [id, setId] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    // useEffect(() => {
    //     const searchParams =localStorage.getItem('user');
    //     setId(JSON.parse(localStorage.getItem('user')));
    // }, [location]);
    
    useEffect(() => {
        if (id === null) {
            navigate(`/`);
        }
        else{
            navigate('/app')
        }
    }, [id, navigate]);
    
    const items = JSON.parse(localStorage.getItem('user'));
    // console.log(items);
    // console.log("iteam");
    
    return (
        <>
   
            <h2>{id}p{items}</h2>
            <h1>010{id ? <h1>kkk</h1> : null}</h1>
        </>
    );
};

export default App1;




















//if id not share via url link then redirect 
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const App1 = () => {
//     const location = useLocation();
//     const [id, setId] = useState(new URLSearchParams(location.search).get("id"));
//     const navigate = useNavigate();

//     useEffect(() => {
//         const searchParams = new URLSearchParams(location.search);
//         setId(searchParams.get("id"));
//     }, [location]);
    
//     useEffect(() => {
//         if (id === null) {
//             navigate(`/app`);
//         }
//     }, [id, navigate]);
    
//     const items = JSON.parse(localStorage.getItem('user'));
//     // console.log(items);
//     // console.log("iteam");
    
//     return (
//         <>
//             <h2>{id}p{items}</h2>
//             <h1>010{id ? <h1>kkk</h1> : null}</h1>
//         </>
//     );
// };

// export default App1;
