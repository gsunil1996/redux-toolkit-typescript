"use client"

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Navbar
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: "center" }}>
          <Box sx={{ cursor: 'pointer', background: pathname === "/" ? "green" : null, padding: pathname === "/" ? "0.6rem" : null, borderRadius: pathname === "/" ? "10px" : null }} onClick={() => router.push("/")}>Counter</Box>

          <Box sx={{ cursor: 'pointer', background: pathname === "/todo" ? "green" : null, padding: pathname === "/todo" ? "0.6rem" : null, borderRadius: pathname === "/todo" ? "10px" : null }} onClick={() => router.push("/todo")}>Todo</Box>

          <Box sx={{ cursor: 'pointer', background: pathname === "/weather-api" ? "green" : null, padding: pathname === "/weather-api" ? "0.6rem" : null, borderRadius: pathname === "/weather-api" ? "10px" : null }} onClick={() => router.push("/weather-api")}>Weather Api</Box>

          <Box sx={{ cursor: 'pointer', background: pathname === "/pets-api" ? "green" : null, padding: pathname === "/pets-api" ? "0.6rem" : null, borderRadius: pathname === "/pets-api" ? "10px" : null }} onClick={() => router.push("/pets-api")}>Pets Api</Box>

          <Box sx={{ cursor: 'pointer', background: pathname === "/mern-curd-table" ? "green" : null, padding: pathname === "/mern-curd-table" ? "0.6rem" : null, borderRadius: pathname === "/mern-curd-table" ? "10px" : null }} onClick={() => router.push("/mern-curd-table")}>Mern Crud Table</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
