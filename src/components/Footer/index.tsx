import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: '#F0F0F0',
            color: '#000',
            textAlign: 'center',
            padding: '10px'
        }}>
            <p>© {currentYear} RMOS Yazılım. All rights reserved.</p>
        </footer>
    );
};

export default Footer;