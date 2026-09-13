import { CrudPage, SinglePage, Field, ImageInput, useApi, Toast } from '../components/CrudComponents.jsx';
import { useEffect, useState } from 'react';
import API from '../api/client.js';

export function Settings() {
  return <SinglePage title="Site Settings" endpoint="settings" fields={[
    { key: 'brandName', label: 'Brand Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address', type: 'textarea' },
    { key: 'whatsappNumber', label: 'WhatsApp Number' },
    { key: 'whatsappMessage', label: 'WhatsApp Message', type: 'textarea' },
    { key: 'mapEmbedUrl', label: 'Google Maps Embed URL', type: 'textarea' },
    { type: 'object', key: 'socialLinks', label: 'Social Links', subFields: [
      { key: 'facebook', label: 'Facebook URL' },
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'pinterest', label: 'Pinterest URL' }
    ]},
    { type: 'object', key: 'seo', label: 'SEO', subFields: [
      { key: 'title', label: 'Page Title' },
      { key: 'description', label: 'Meta Description', type: 'textarea' }
    ]},
    { type: 'object', key: 'brandColors', label: 'Brand Colors', subFields: [
      { key: 'navy', label: 'Navy Color' },
      { key: 'gold', label: 'Gold Color' },
      { key: 'goldDark', label: 'Gold Dark Color' }
    ]}
  ]} />;
}

export function HeroManager() {
  return <SinglePage title="Hero Manager" endpoint="hero" fields={[
    { key: 'headline', label: 'Headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'image', label: 'Hero Image', type: 'image' },
    { key: 'chips', label: 'Floating Chips', type: 'list' },
    { key: 'ctaButtons', label: 'CTA Buttons (label, link, style)', type: 'list' }
  ]} />;
}

export function ServicesManager() {
  return <CrudPage title="Services Manager" endpoint="services" fields={[
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'icon', label: 'Icon (lucide name)' },
    { key: 'highlights', label: 'Highlights', type: 'list' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ title: '', description: '', image: '', icon: 'Building', highlights: [], isActive: true }} />;
}

export function ProjectsManager() {
  return <CrudPage title="Projects Manager" endpoint="projects" fields={[
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'features', label: 'Features', type: 'list' },
    { key: 'isFeatured', label: 'Featured', type: 'select', options: ['true', 'false'] },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ title: '', category: '', image: '', description: '', features: [], isFeatured: false, isActive: true }} />;
}

export function TestimonialsManager() {
  return <CrudPage title="Testimonials Manager" endpoint="testimonials" fields={[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'company', label: 'Company' },
    { key: 'avatar', label: 'Avatar', type: 'image' },
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'stars', label: 'Stars', type: 'number' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ name: '', role: '', company: '', avatar: '', quote: '', stars: 5, isActive: true }} />;
}

export function TransformationTabsManager() {
  return <CrudPage title="Transformation Tabs Manager" endpoint="transformation-tabs" fields={[
    { key: 'id', label: 'ID' },
    { key: 'label', label: 'Label' },
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'bullets', label: 'Bullets', type: 'list' }
  ]} newItemTemplate={{ id: '', label: '', title: '', image: '', description: '', bullets: [] }} />;
}

export function AboutContentManager() {
  return <SinglePage title="About Content Manager" endpoint="about-content" fields={[
    { key: 'pullQuote', label: 'Pull Quote (text)', type: 'textarea' }
  ]} />;
}

export function CostCalculatorConfigManager() {
  return <SinglePage title="Cost Calculator Config" endpoint="cost-calculator-config" fields={[]} />;
}
