import React from "react";
import { cn } from "../lib/utils";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";

interface FooterProps {
  companyName?: string;
  logoUrl?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  navigationLinks?: {
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }[];
}

const Footer = ({
  companyName = "AutoMarket",
  logoUrl = "/logo.svg",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  contactInfo = {
    email: "info@automarket.com",
    phone: "+1 (555) 123-4567",
    address: "123 Car Street, Auto City, AC 12345",
  },
  navigationLinks = [
    {
      title: "Browse Cars",
      links: [
        { label: "New Cars", href: "/cars/new" },
        { label: "Used Cars", href: "/cars/used" },
        { label: "Electric Vehicles", href: "/cars/electric" },
        { label: "SUVs", href: "/cars/suvs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Car Comparisons", href: "/comparisons" },
        { label: "Buying Guide", href: "/guides/buying" },
        { label: "Financing Options", href: "/financing" },
        { label: "Car Reviews", href: "/reviews" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
}: FooterProps) => {
  return (
    <footer className="w-full bg-slate-900 text-white py-8 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={logoUrl}
                alt={companyName}
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  e.currentTarget.src =
                    "https://api.dicebear.com/7.x/initials/svg?seed=AM";
                }}
              />
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-slate-300 text-sm">
              Your trusted destination for finding the perfect vehicle.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.email && (
                <li className="flex items-center text-sm text-slate-300">
                  <Mail size={16} className="mr-2" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-center text-sm text-slate-300">
                  <Phone size={16} className="mr-2" />
                  <a
                    href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start text-sm text-slate-300">
                  <MapPin size={16} className="mr-2 mt-0.5" />
                  <span>{contactInfo.address}</span>
                </li>
              )}
            </ul>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-white border-white hover:bg-white hover:text-slate-900"
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
