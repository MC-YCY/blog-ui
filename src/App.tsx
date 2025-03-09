import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@/views/auth/login/index.tsx'
import Layout from '@/views/layout/index.tsx'
import Home from '@/views/home';
import ThemeProvider from '@/provider/ThemeProvider.tsx'
import useThemeStore from '@/sotres/themeStore.ts'

function App() {
    // 初始缓存
    useThemeStore.persist.rehydrate();
    return (<>
        <ThemeProvider></ThemeProvider>
        <Router>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </Router>
    </>)
}

export default App;