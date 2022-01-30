import React from "react";
import './App.scss';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';

import OrtoPage from "./pages/ortoPage";
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import ObjectManager from "./core/object_manager";

function App() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );


    // return
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AppLayout/>}>
                        <Route index element={<Blank/>}/>
                        <Route path='/orto' element={<OrtoPage/>}/>
                        <Route path='/calendar' element={<Blank/>}/>
                        <Route path='/user' element={<Blank/>}/>
                        <Route path='/order' element={<Blank/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //     <Sketch setup={setup1} draw={draw1} mouseWheel={mouseWheel} preload={preload}
    //             mouseDragged={mouseDragged}
    //             mousePressed={mousePressed}
    //     />
    //     <Sketch setup={setup2} draw={draw2} />
    //   </div>
    // );
}

export default App;
