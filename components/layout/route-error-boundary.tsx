import { Component, type ReactNode } from 'react'
import { buttonClasses } from '../ui/button-styles'

interface RouteErrorBoundaryProps {
    children: ReactNode
}

interface RouteErrorBoundaryState {
    failed: boolean
}

const RELOAD_FLAG = 'route-chunk-reloaded'

/**
 * Catches render-time failures below the router — most importantly rejected
 * lazy-route imports. After a redeploy, a long-lived tab can request a hashed
 * chunk that no longer exists; the SPA catch-all rewrite answers with
 * index.html, the dynamic import rejects, and without a boundary React 19
 * unmounts the whole tree to a blank page. One automatic reload picks up the
 * new asset manifest; the sessionStorage flag stops a reload loop when the
 * failure is something else, falling back to a manual reload prompt.
 */
export default class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
    state: RouteErrorBoundaryState = { failed: false }

    static getDerivedStateFromError(): RouteErrorBoundaryState {
        return { failed: true }
    }

    componentDidMount() {
        // Reached render without failing — allow future deploys to auto-reload again.
        if (!this.state.failed) sessionStorage.removeItem(RELOAD_FLAG)
    }

    componentDidCatch(error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        const isStaleChunk = /dynamically imported module|module script failed|MIME type/i.test(message)
        if (isStaleChunk && !sessionStorage.getItem(RELOAD_FLAG)) {
            sessionStorage.setItem(RELOAD_FLAG, '1')
            window.location.reload()
        }
    }

    render() {
        if (this.state.failed) {
            return (
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
                    <p className="max-w-[42ch] font-rounded text-ink-muted">
                        This page failed to load — a new version of the site may have just been deployed.
                    </p>
                    <button type="button" onClick={() => window.location.reload()} className={buttonClasses('outline', 'md')}>
                        Reload page
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}
