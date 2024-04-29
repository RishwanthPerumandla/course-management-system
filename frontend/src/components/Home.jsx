import React from 'react';
import backgroundImage from '../assets/image.png'; // Replace with the path to your image

const Home = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      // minHeight: '100vh',
      // height:'100vh',
      // width: '100vw',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '24px',
    },
    nav: {
      '& a': {
        textDecoration: 'none',
        color: '#0056b3',
        margin: ' 10px',
      },
    },
    main: {
      textAlign: 'center',
      flex: '1', // Take remaining vertical space
      paddingTop: '100px', // Adjust as needed
    },
    title: {
      fontSize: '48px',
      color: '#0056b3',
    },
    subtitle: {
      fontSize: '20px',
      margin: '20px 0',
    },
    button: {
      padding: '10px 20px',
      fontSize: '18px',
      backgroundColor: '#8e44ad',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    sections: {
      display: 'flex',
      justifyContent: 'center',
      margin: '40px 0',
    },
    section: {
      margin: '0 15px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      //width: '300px', // Adjust as needed
    },
    footer: {
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent white
      marginTop: 'auto', // Push the footer to the bottom
    },
    registerButton: {
        marginLeft: '20px', // Adjust the margin as necessary
      },
      navLink: {
        textDecoration: 'none',
        color: '#0056b3',
        margin: '0 10px',
        padding: '5px 10px',
        display: 'inline-block', // To allow margin to take effect
      },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Course Management System</div>
        <nav style={styles.nav}>
          <a href="/login" style={styles.navLink}>LOGIN</a>
          <a href="/login" style={{ ...styles.navLink, ...styles.registerButton }}>REGISTER</a>
        </nav>
      </header>
      
      <main style={styles.main}>
        <h1 style={styles.title}>Connecting Talent with Opportunity</h1>
        <br />
        <br />
        <button style={styles.button}>GET STARTED</button>
        <div style={styles.sections}>
          <div style={styles.section}>
            <h2>Our Mission</h2>
            <p>The Course Management System aims to create opportunities...</p>
          </div>
          <div style={styles.section}>
            <h2>How It Works</h2>
            <p>Instructors post courses, students enroll, and the best match is made...</p>
          </div>
          <div style={styles.section}>
            <h2>Join Us</h2>
            <p>Become a part of our growing community of professionals...</p>
          </div>
        </div>
      </main>
      
      <footer style={styles.footer}>
        Â© 2024 Course Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;