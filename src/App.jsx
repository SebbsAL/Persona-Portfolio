import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import menuVideo from './assets/Mainn.mp4'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'

const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))
const AboutMe = lazy(() => import('./AboutMe'))
import './App.css'


function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><MenuScreen /></PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition variant="about"><AboutMe /></PageTransition>
          } />
          <Route path="/resume" element={
            <PageTransition><ResumePage /></PageTransition>
          } />
          <Route path="/socials" element={
            <PageTransition variant="socials"><Socials /></PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}