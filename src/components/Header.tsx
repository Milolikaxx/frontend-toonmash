import { AppBar, Toolbar, Typography, Button } from "@mui/material";


function Header() {
    return (
        <AppBar position="sticky" sx={{backgroundColor:"#2B2730", py:0.5}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{flexGrow: 1 }}>
            Baby Looney Tunes
          </Typography>
          <Button variant="contained" color="primary" sx={{fontWeight:600}}>Home</Button>
          <Button variant="contained" color="primary" sx={{fontWeight:600}}>Leaderboard</Button>
        </Toolbar>
      </AppBar>
    );
}

export default Header