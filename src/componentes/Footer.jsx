// src/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';  // Usando react-icons

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Servicios</h3>
          <ul>
            <li>¿Qué hacemos?</li>
            <li>¿Cómo funcionan?</li>
            <li>Preguntas Frecuentes (FAQ)</li>
            <li>Recomendaciones</li>
            <li>Garantía</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>Política de Privacidad</li>
            <li>Términos de servicio</li>
            <li>Política de Cookies</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul>
            <li>📞 +52 1234567890</li>
            <li>📧 NumerIQ@ejemplo.com</li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 NumerIQ - Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;
