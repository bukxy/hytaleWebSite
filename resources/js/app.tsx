import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ComponentType, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import AppDashboardLayout from "@/layouts/app/dashboard/app-dashboard-layout";
import AppFrontLayout from "@/layouts/app-front-layout";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type InertiaPage = ComponentType & {
    layout?: (page: ReactNode) => ReactNode;
};

type PageModule = {
    default: InertiaPage;
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    // resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),

    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        )) as PageModule;

        const isDashboard = name.toLowerCase().startsWith('dashboard/');

        page.default.layout ??= (pageEl: ReactNode) => {
            const Layout = isDashboard ? AppDashboardLayout : AppFrontLayout;
            return <Layout>{pageEl}</Layout>;
        };

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
