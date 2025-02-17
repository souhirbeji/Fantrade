import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../api/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getUserByToken();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    handleNavigation("/login");
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        padding: "0 16px",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#E53935",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/")}
        >
          FAN<span style={{ color: "#1976D2" }}>TRADE</span>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
          <Typography
            variant="button"
            sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
            onClick={() => handleNavigation("/")}
          >
            Accueil
          </Typography>
          <Typography
            variant="button"
            sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
            onClick={() => handleNavigation("/products")}
          >
            Produits
          </Typography>
          {user && (
            <Typography
              variant="button"
              sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
              onClick={() => handleNavigation("/dashboard")}
            >
              Dashboard
            </Typography>
          )}
        </Box>

        {/* Login/Signup Button or User Menu */}
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "rgb(25, 118, 210)",
                color: "white",
              }}
            >
              <PersonIcon sx={{ color: "white" }} />
              {user.name}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigation("/profile")}>
                Profil
              </MenuItem>
              <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleNavigation("/login")}
          >
            Connexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
