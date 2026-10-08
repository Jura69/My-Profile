import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import ThemeProvider from '../providers/theme'
import SceneProvider from '../components/scene/scene-provider'
import { useScene } from '../components/scene/use-scene'
import MainLayout from '../components/layout/main'
import NotFound from '../components/layout/not-found'
import RouteErrorBoundary from '../components/layout/route-error-boundary'

// HomePage stays eager — it is the LCP-critical landing route. Every other
// page is its own chunk; router navigations run in startTransition, so the
// previous page stays visible while a chunk streams in.
import HomePage from './pages/index'
const WorksPage = lazy(() => import('./pages/works'))
const FoodLoverPage = lazy(() => import('./pages/works/foodlover'))
const TicketAppPage = lazy(() => import('./pages/works/ticketapp'))
const EcommercePage = lazy(() => import('./pages/works/ecommerce'))
const TensorflowPage = lazy(() => import('./pages/works/tensorflow'))
const AssetManagementPage = lazy(() => import('./pages/works/asset-management'))
const BatLoyaltyPage = lazy(() => import('./pages/works/bat-loyalty'))
const BatPsaPage = lazy(() => import('./pages/works/bat-psa'))
const CastrolFleetPage = lazy(() => import('./pages/works/castrol-fleet'))
const VendingAiAgentPage = lazy(() => import('./pages/works/vending-ai-agent'))
const WarehouseManagementPage = lazy(() => import('./pages/works/warehouse-management'))
const CreasiaErpPage = lazy(() => import('./pages/works/creasia-erp'))
const AiCenterPage = lazy(() => import('./pages/works/ai-center'))
const PlanogramPage = lazy(() => import('./pages/works/planogram'))
const OcrCccdPage = lazy(() => import('./pages/works/ocr-cccd'))
const AdvanceSystemPage = lazy(() => import('./pages/works/advance-system'))
const MondelezDisplayPage = lazy(() => import('./pages/works/mondelez-display'))
const ActivitiesPage = lazy(() => import('./pages/activities'))
const YtcPage = lazy(() => import('./pages/activities/ytc'))
const AudiophilePage = lazy(() => import('./pages/audiophile'))
const Ea1000Page = lazy(() => import('./pages/audiophile/ea1000'))
const MoondropPage = lazy(() => import('./pages/audiophile/moondrop-ssp'))
const OnixPage = lazy(() => import('./pages/audiophile/onix'))
const FiiokA11Page = lazy(() => import('./pages/audiophile/fiioka11'))

// Restore scroll position on navigation
if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}

/**
 * True only while the first-rendered (landing) path is still shown. The landing page
 * arrives as prerendered HTML that is already on screen, so fading it in again would
 * blank it for a frame; only client-side navigations get the entrance fade.
 */
function useIsLandingPath(pathname: string) {
    const landing = useRef<string | null>(pathname)
    if (landing.current !== null && landing.current !== pathname) landing.current = null
    return landing.current !== null
}

function AnimatedRoutes() {
    const location = useLocation()
    const { reducedMotion } = useScene()
    const isLanding = useIsLandingPath(location.pathname)

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
            <Route path="/works/ai-center" element={<AiCenterPage />} />
            <Route path="/works/planogram" element={<PlanogramPage />} />
            <Route path="/works/ocr-cccd" element={<OcrCccdPage />} />
            <Route path="/works/advance-system" element={<AdvanceSystemPage />} />
            <Route path="/works/mondelez-display" element={<MondelezDisplayPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/ytc" element={<YtcPage />} />
            <Route path="/audiophile" element={<AudiophilePage />} />
            <Route path="/audiophile/ea1000" element={<Ea1000Page />} />
            <Route path="/audiophile/moondrop-ssp" element={<MoondropPage />} />
            {/* Legacy camelCase URL lives on in old shares/indexes — permanent client redirect */}
            <Route path="/audiophile/moondropSSP" element={<Navigate to="/audiophile/moondrop-ssp" replace />} />
            <Route path="/audiophile/onix" element={<OnixPage />} />
            <Route path="/audiophile/fiioka11" element={<FiiokA11Page />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

    // Suspense sits ABOVE the keyed transition wrapper: the boundary stays
    // mounted across navigations, so in-transition chunk loads keep the old
    // page on screen instead of flashing the null fallback. During hydration a
    // lazy route that has not loaded yet keeps its prerendered HTML in place.
    //
    // Entrance-only page transition: a keyed motion element remounts per route and
    // fades in. Deliberately NOT AnimatePresence exit/mode="wait" — the exit never
    // reliably completed with this Router + motion@12 setup and left the old page
    // stuck (same failure mode as framer-motion 11), so we keep the enter only.
    // Opacity-only (no transform): a transformed ancestor would become the
    // containing block for any position:fixed descendant (e.g. a ScrollTrigger pin)
    // and misalign it. SceneProvider handles scroll reset + ScrollTrigger refresh.
    // The wrapper is always rendered (same tree on server, hydration and later
    // renders); reduced motion and the landing page simply skip the fade.
    return (
        <Suspense fallback={null}>
            <motion.div
                key={location.pathname}
                initial={reducedMotion || isLanding ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
                {routes}
            </motion.div>
        </Suspense>
    )
}

/** Everything inside the router. Shared by the browser entry and the build-time prerender
 *  (src/entry-server.tsx): both must render the exact same tree — useId values depend on
 *  sibling positions — so the analytics components (null output) live here too. */
export function AppShell() {
    return (
        <>
            <ThemeProvider>
                <SceneProvider>
                    <MainLayout>
                        <RouteErrorBoundary>
                            <AnimatedRoutes />
                        </RouteErrorBoundary>
                    </MainLayout>
                </SceneProvider>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    )
}
