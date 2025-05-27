import { Outlet, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import UserMenu from "../components/UserMenu.jsx";

const MainLayout = () => {
    // Check if the user is logged in and decode the token to get user info
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    const location = useLocation();
    const currentPath =
        location.pathname === "/" ? "/products" : location.pathname;

    const pages = [
        { name: "Products", path: "/products" },
        { name: "Cart", path: "/cart" },
        { name: "Login", path: "/login" },
        { name: "Admin", path: "/admin/products" },
    ];

    // const visiblePages = pages.filter((page) => {
    //     if (page.path === '/') return location.pathname !== '/';
    //     return location.pathname !== page.path;
    // });
    const visiblePages = pages.filter((page) => currentPath !== page.path);

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ px: 3, py: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        {/* <img src="/logo.png" alt="Logo" style={{ height: 40 }} /> */}
                        <Typography variant="h4" sx={{ flexGrow: 1 }}>
                            E-Commerce
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {visiblePages

                                .filter((page) => {
                                    // Show 'Admin' link only if the user is an admin
                                    if (page.name === "Admin") {
                                        return user && user.role === "admin";
                                    }
                                    //Show 'Login' link only if the user is not logged in
                                    if (page.name === 'Login') {
                                        return !user;
                                    }
                                    // Show all other links for all users
                                    return true;
                                })

                                .map((page) => (
                                    <Button
                                        key={page.path}
                                        color="inherit"
                                        component={Link}
                                        to={page.path}
                                    >
                                        {page.name}
                                    </Button>
                                ))
                            }
                            {/* show user profile */}
                            {user && <UserMenu user={user} />}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{ padding: 2 }}>
                    <Outlet />
                </Box>
            </main>
        </>
    );
};

export default MainLayout;
