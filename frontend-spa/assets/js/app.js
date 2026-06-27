const API_URL = 'http://localhost:8080/api';

// Axios interceptor - otomatis sisipkan token
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Axios interceptor - tangkap error 401
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert('Sesi habis! Silakan login kembali.');
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

const routes = [
    { path: '/', component: LandingPageComponent },
    { path: '/login', component: LoginComponent },
    {
        path: '/dashboard',
        component: DashboardComponent,
        meta: { requiresAuth: true }
    },
    {
        path: '/kategori',
        component: KategoriComponent,
        meta: { requiresAuth: true }
    },
    {
        path: '/barang',
        component: BarangComponent,
        meta: { requiresAuth: true }
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

const app = Vue.createApp({
    template: `<router-view></router-view>`
});

app.use(router);
app.mount('#app');