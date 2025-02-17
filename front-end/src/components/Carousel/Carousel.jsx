import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: "500px",
        width: "100%",
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: currentIndex === index ? "block" : "none",
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Background Image */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: -1,
            }}
          ></Box>

          {/* Content */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              left: "45%",
              transform: "translateY(-50%)",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {item.subtitle}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              {item.buttonText}
            </Button>
          </Box>
        </Box>
      ))}

      {/* Navigation */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Carousel;
