// src/components/Home.js

import React from 'react';
import Img from './images/bg4.jpg'; // Ensure this path is correct relative to Home.js

function Home() {
  return (
    <div style={styles.container}>
      {/* Optional Overlay for Better Readability */}
      {/* <div style={styles.overlay}></div> */}
      <div style={styles.content}>
        <h1>This is a home page!</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed', // Ensures the container covers the entire viewport
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100%', // Full width
    backgroundImage: `url(${Img})`, // Correct syntax with backticks
    backgroundSize: 'cover', // Ensures the image covers the entire background
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    padding: '20px', // Adds padding around the content
    boxSizing: 'border-box', // Includes padding in the element's total width and height
    zIndex: -1, // Places the container behind other content
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better text contrast
    zIndex: 1, // Ensures the overlay is above the background image
  },
  content: {
    position: 'relative', // Positions content above the overlay
    zIndex: 2,
    color: 'white', // White text for contrast
    padding: '20px', // Padding around the content
    maxWidth: '80%', // Limits the content width for better readability
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for content
    borderRadius: '8px', // Rounded corners for the content box
  },
};

export default Home;
