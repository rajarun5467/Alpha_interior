import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = { type: Number, default: 0 };
const activeSchema = { type: Boolean, default: true };

export const Admin = model('Admin', new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

export const Settings = model('Settings', new Schema({
  brandName: String, phone: String, email: String, address: String,
  whatsappNumber: String, whatsappMessage: String, mapEmbedUrl: String,
  socialLinks: { facebook: String, instagram: String, linkedin: String, pinterest: String },
  seo: { title: String, description: String },
  brandColors: { navy: String, gold: String, goldDark: String }
}));

export const Hero = model('Hero', new Schema({
  headline: String, subheadline: String, image: String,
  chips: [{ label: String }],
  ctaButtons: [{ label: String, link: String, style: String }]
}));

export const Service = model('Service', new Schema({
  title: String, description: String, image: String, icon: String,
  highlights: [String], order: orderSchema, isActive: activeSchema
}));

export const ServiceChecklist = model('ServiceChecklist', new Schema({
  name: String, description: String, category: String, order: orderSchema
}));

export const Project = model('Project', new Schema({
  title: String, category: String, image: String, description: String,
  features: [String], order: orderSchema, isActive: activeSchema, isFeatured: { type: Boolean, default: false }
}));

export const ProjectCategory = model('ProjectCategory', new Schema({
  name: String, order: orderSchema
}));

export const Testimonial = model('Testimonial', new Schema({
  name: String, role: String, company: String, avatar: String,
  quote: String, stars: { type: Number, default: 5 }, order: orderSchema, isActive: activeSchema
}));

export const Stat = model('Stat', new Schema({
  target: Number, suffix: String, label: String, description: String,
  icon: String, color: String, order: orderSchema
}));

export const Faq = model('Faq', new Schema({
  question: String, answer: String, order: orderSchema, isActive: activeSchema
}));

export const ProcessStep = model('ProcessStep', new Schema({
  number: String, title: String, description: String, icon: String, order: orderSchema
}));

export const ClientLogo = model('ClientLogo', new Schema({
  name: String, order: orderSchema, isActive: activeSchema
}));

export const AdvantageTile = model('AdvantageTile', new Schema({
  group: String, title: String, description: String, icon: String, order: orderSchema
}));

export const TransformationTab = model('TransformationTab', new Schema({
  id: String, label: String, title: String, image: String,
  description: String, bullets: [String], order: orderSchema
}));

export const AboutContent = model('AboutContent', new Schema({
  tabs: [{ id: String, label: String, content: String }],
  coreValues: [{ title: String, desc: String, icon: String }],
  whyItems: [{ title: String, desc: String, icon: String }],
  teamStats: [{ value: String, label: String }],
  pullQuote: { text: String, author: String }
}));

export const CostCalculatorConfig = model('CostCalculatorConfig', new Schema({
  spaceTypes: [{ id: String, label: String }],
  packages: [{ id: String, label: String, ratePerSqft: Number, timelinePer1000sqft: Number }],
  areaRange: { min: Number, max: Number, step: Number }
}));

export const PageHeader = model('PageHeader', new Schema({
  page: String, subtitle: String, title: String, description: String
}));

export const CtaBanner = model('CtaBanner', new Schema({
  location: String, title: String, description: String,
  buttons: [{ label: String, action: String, style: String }]
}));

export const FooterConfig = model('FooterConfig', new Schema({
  ctaTitle: String, ctaDescription: String,
  quickLinks: [{ id: String, label: String }],
  serviceLinks: [String],
  copyrightText: String, designedByText: String
}));

export const QuoteSubmission = model('QuoteSubmission', new Schema({
  name: String, phone: String, email: String, city: String,
  service: String, message: String, submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'new' }
}));

export const ContactSubmission = model('ContactSubmission', new Schema({
  name: String, email: String, phone: String, service: String,
  message: String, submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'new' }
}));
