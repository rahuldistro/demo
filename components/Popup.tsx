"use client";
import { useEffect, useState } from 'react';

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 75 && !isOpen) {
        setIsOpen(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      data-elementor-type="popup"
      data-elementor-id="23"
      className="elementor elementor-23 elementor-location-popup"
    >
      <div className="elementor-container e-con e-parent">
        <h2 className="elementor-heading-title">Special Offer</h2>
        <div className="elementor-icon-box-wrapper">
          <h3 className="elementor-icon-box-title">20% off</h3>
          <p className="elementor-icon-box-description">on your first order</p>
        </div>
        <form className="elementor-form" method="post" name="Popup Newsletter Form">
          <div className="elementor-form-fields-wrapper">
            <div className="elementor-field-type-email elementor-field-group elementor-col-60">
              <input
                type="email"
                name="form_fields[email]"
                className="elementor-field elementor-size-md"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="elementor-field-type-submit elementor-field-group elementor-col-40">
              <button className="elementor-button elementor-size-md" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}