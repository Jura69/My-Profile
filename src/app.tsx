import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Chakra from '../providers/chakra'
import MainLayout from '../components/layouts/main'

// Pages — lazy-loaded in Phase 4; use direct imports for now
import HomePage from './pages/index'
import WorksPage from './pages/works'
import FoodLoverPage from './pages/works/foodlover'
import TicketAppPage from './pages/works/ticketapp'
import EcommerceBEPage from './pages/works/ecommerceBE'
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
    return (
        <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo({ top: 0 })}
        >
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/works" element={<WorksPage />} />
                <Route path="/works/foodlover" element={<FoodLoverPage />} />
                <Route path="/works/ticketapp" element={<TicketAppPage />} />
                <Route path="/works/ecommerceBE" element={<EcommerceBEPage />} />
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
                <Route path="*" element={<div style={{ padding: '2rem' }}>404 — Page not found</div>} />
            </Routes>
        </AnimatePresence>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Chakra>
                <MainLayout>
                    <AnimatedRoutes />
                </MainLayout>
            </Chakra>
            <Analytics />
            <SpeedInsights />
        </BrowserRouter>
    )
}
