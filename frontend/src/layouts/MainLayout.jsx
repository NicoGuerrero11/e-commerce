import { Outlet, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

const MainLayout = () => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                    E-Commerce
                </Typography>
                <Button color="inherit" component={Link} to={"/"}>Home</Button>
                <Button color="inherit" component={Link} to={"/Products"}>Products</Button>
                <Button color="inherit" component={Link} to={"/Login"}>Login</Button>
            </Toolbar>
            <Outlet />
        </AppBar>
    </>
);

export default MainLayout;