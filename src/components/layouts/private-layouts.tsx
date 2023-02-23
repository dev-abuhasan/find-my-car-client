import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router-dom';
import * as slug from '../../routes/slug';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { home_v1 } from '../../services/utils/svg';

const drawerWidth = 240;
interface Props {
    window?: () => Window;
}

const PrivateLayout = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { pathname } = useLocation();
    const menu = [
        {
            path: slug.DASHBOARD,
            name: 'Dashboard',
            icon: <FiberManualRecordIcon />,
        },
        {
            path: slug.BOOKMARKS,
            name: 'Bookmarks',
            icon: <FiberManualRecordIcon />,
        },
    ]
    const drawer = (
        <div>
            <Link to={'/'} className={`py-3 ps-3 bg-primary text-light d-flex align-items-center w-100 mb-2 text-decoration-none`}>
                {home_v1}
                <span className='opacity-1 pt-2 d-block ps-2'>Home</span>
            </Link>
            <Divider />
            <div className='d-flex flex-column'>
                {
                    menu.map((d: any, i: number) =>
                        <Link key={i} to={d.path} className={`py-3 ps-3 d-flex align-items-center w-100 mb-2 text-decoration-none ${pathname === d.path ? 'bg-primary text-light' : 'bg-light text-dark'}`}>
                            {d.icon}
                            {d.name}
                        </Link>
                    )
                }
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },
                    boxShadow: 'none'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
export default PrivateLayout;