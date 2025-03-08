import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/views/auth/login/index.tsx'
import Home from '@/views/home/index.tsx'

function App() {
    return (<>
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </Router>
    </>)
}

export default App