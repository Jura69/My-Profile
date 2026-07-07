import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import ThemeProvider from '../providers/theme'
import SceneProvider, { useScene } from '../components/scene/scene-provider'
import MainLayout from '../components/layouts/main'
import NotFound from '../components/layout/not-found'

// Pages — lazy-loaded in Phase 4; use direct imports for now
import HomePage from './pages/index'
import WorksPage from './pages/works'
import FoodLoverPage from './pages/works/foodlover'
import TicketAppPage from './pages/works/ticketapp'
import EcommercePage from './pages/works/ecommerce'
import TensorflowPage from './pages/works/tensorflow'
import AssetManagementPage from './pages/works/asset-management'
import BatLoyaltyPage from './pages/works/bat-loyalty'
import BatPsaPage from './pages/works/bat-psa'
import CastrolFleetPage from './pages/works/castrol-fleet'
import VendingAiAgentPage from './pages/works/vending-ai-agent'
import WarehouseManagementPage from './pages/works/warehouse-management'
import CreasiaErpPage from './pages/works/creasia-erp'
import ActivitiesPage from './pages/activities'
import YtcPage from './pages/activities/ytc'
import AudiophilePage from './pages/audiophile'
import Ea1000Page from './pages/audiophile/ea1000'
import MoondropPage from './pages/audiophile/moondropSSP'
import OnixPage from './pages/audiophile/onix'
import FiiokA11Page from './pages/audiophile/fiioka11'

// Restore scroll position on navigation
if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}

function AnimatedRoutes() {
    const location = useLocation()
    const { reducedMotion } = useScene()

    const routes = (
        <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/foodlover" element={<FoodLoverPage />} />
            <Route path="/works/ticketapp" element={<TicketAppPage />} />
            <Route path="/works/ecommerce" element={<EcommercePage />} />
            <Route path="/works/tensorflow" element={<TensorflowPage />} />
            <Route path="/works/asset-management" element={<AssetManagementPage />} />
            <Route path="/works/bat-loyalty" element={<BatLoyaltyPage />} />
            <Route path="/works/bat-psa" element={<BatPsaPage />} />
            <Route path="/works/castrol-fleet" element={<CastrolFleetPage />} />
            <Route path="/works/vending-ai-agent" element={<VendingAiAgentPage />} />
            <Route path="/works/warehouse-management" element={<WarehouseManagementPage />} />
            <Route path="/works/creasia-erp" element={<CreasiaErpPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/ytc" element={<YtcPage />} />
            <Route path="/audiophile" element={<AudiophilePage />} />
            <Route path="/audiophile/ea1000" element={<Ea1000Page />} />
            <Route path="/audiophile/moondropSSP" element={<MoondropPage />} />
            <Route path="/audiophile/onix" element={<OnixPage />} />
            <Route path="/audiophile/fiioka11" element={<FiiokA11Page />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

    // Reduced-motion users get instant, always-visible page swaps — no transition.
    if (reducedMotion) return routes

    // Entrance-only page transition: a keyed motion element remounts per route and
    // fades in. Deliberately NOT AnimatePresence exit/mode="wait" — the exit never
    // reliably completed with this Router + motion@12 setup and left the old page
    // stuck (same failure mode as framer-motion 11), so we keep the enter only.
    // Opacity-only (no transform): a transformed ancestor would become the
    // containing block for the homepage's position:fixed GSAP pin (ExperienceDusk)
    // and misalign it. SceneProvider handles scroll reset + ScrollTrigger refresh.
    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
            {routes}
        </motion.div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <SceneProvider>
                    <MainLayout>
                        <AnimatedRoutes />
                    </MainLayout>
                </SceneProvider>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
        </BrowserRouter>
    )
}
