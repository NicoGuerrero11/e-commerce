import { Outlet, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const MainLayout = () => {

    const location = useLocation();

    const pages = [
        { name: 'Products', path: '/products' },
        { name: 'Cart', path: '/cart' },
        { name: 'Login', path: '/login' }
    ];

    const visiblePages = pages.filter((page) => {
        if (page.path === '/') return location.pathname !== '/';
        return location.pathname !== page.path;
    });

    return(

        <>
            <AppBar position="static">
                <Toolbar sx={{px: 3, py:2}}>
                        {/* <img src="/logo.png" alt="Logo" style={{ height: 40 }} /> */}
                        <Typography variant="h4"  sx={{ flexGrow: 1 }}>
                            E-Commerce
                        </Typography>
                        {visiblePages.map((page) => (
                            <Button
                                key={page.path}
                                color="inherit"
                                component={Link}
                                to={page.path}
                            >
                                {page.name}
                            </Button>
                        ))}

                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{ padding: 2 }}>
                    <Outlet />
                </Box>
                
            </main>
        </>
    )

};

export default MainLayout;