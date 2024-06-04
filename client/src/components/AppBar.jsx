import { AppBar, Typography, Toolbar, Button ,Container} from "@mui/material"
import { Link } from "react-router-dom";

const AppBar2 = () => {
    return (
    <AppBar position="absolute"
        sx={{
            display:"flex",
            justifyContent:"center",
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
        }} >
             <Container maxWidth="lg">
        <Toolbar
            variant="regular"
            sx={() => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
                bgcolor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 40,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
            })}
        >
            <Typography variant="h6"  sx={{ flexGrow: 1, textDecoration:"none" ,color:"white"}}>
                <Link to="/" className="textColor">
                    MyExpensePilot
                </Link>
            </Typography>
            <Link to="/login" className="textColor">
                <Button color="inherit">LOGIN</Button>
            </Link>
            <Link to="/register" className="textColor">
                <Button color="inherit">SIGNUP</Button>
            </Link>
        </Toolbar>
        </Container>
    </AppBar>
    )
}

export default AppBar2;