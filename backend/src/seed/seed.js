import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  Admin, Settings, Hero, Service, ServiceChecklist, Project, ProjectCategory,
  Testimonial, Stat, Faq, ProcessStep, ClientLogo, AdvantageTile,
  TransformationTab, AboutContent, CostCalculatorConfig, PageHeader,
  CtaBanner, FooterConfig
} from '../models/index.js';

dotenv.config();

export async function runSeed() {
console.log('Seeding database...');

// Clear all
await Promise.all([
  Admin, Settings, Hero, Service, ServiceChecklist, Project, ProjectCategory,
  Testimonial, Stat, Faq, ProcessStep, ClientLogo, AdvantageTile,
  TransformationTab, AboutContent, CostCalculatorConfig, PageHeader,
  CtaBanner, FooterConfig
].map(m => m.deleteMany({})));

// Admin
const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
await Admin.create({ email: process.env.ADMIN_EMAIL || 'admin', password: hashed });

// Settings
await Settings.create({
  brandName: 'Alpha Office Interior',
  phone: '+91 8178782919',
  email: 'info@alphaofficeinterior.com',
  address: 'B-115, Sector-2, Noida, Uttar Pradesh – 201301, India',
  whatsappNumber: '918178782919',
  whatsappMessage: "Hello Alpha Office, I'd like to discuss my office interior project.",
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0768!2d77.3116!3d28.5869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4!2sNoida!5e0!3m2!1sen!2sin!4v1234567890',
  socialLinks: { facebook: '#', instagram: '#', linkedin: '#', pinterest: '#' },
  seo: { title: 'Alpha Office Interior — Design That Touch Your Heart', description: 'Premium office interior design, turnkey fit-outs, and modular furniture in Noida & Delhi NCR.' },
  brandColors: { navy: '#0B1B36', gold: '#D9A441', goldDark: '#B07C1F' }
});

// Hero
await Hero.create({
  headline: 'DESIGN THAT TOUCH YOUR HEART',
  subheadline: 'Premium Office Interiors. Turnkey Fit-Outs. Modular Furniture.',
  image: '/assets/hero1.png',
  chips: [
    { label: '150+ Turnkey Projects' },
    { label: '4.9/5 Rating' },
    { label: '5+ Years Excellence' }
  ],
  ctaButtons: [
    { label: 'Get Free Quote', link: 'quote', style: 'gold' },
    { label: 'View Our Work', link: 'projects', style: 'outline' }
  ]
});

// Services
const services = [
  { title: 'Corporate Office Interior', description: 'Full-service office design from concept to completion. We handle layout zoning, executive cabins, open workstations, and cafeteria fit-outs tailored to corporate brand guidelines.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', icon: 'Building', highlights: ['3D Visualizations & Walkthroughs', 'Branded Color Themes', 'Executive & Workstation Fit-outs'], order: 0, isActive: true },
  { title: 'Space Planning', description: 'Strategic layouts maximizing efficiency, employee circulation flow, acoustic isolation, and natural day-light distribution across all square footage.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', icon: 'Layers', highlights: ['Ergonomic Traffic Circulation', 'Departmental Layout Zoning', 'Scalable Floor Layouts'], order: 1, isActive: true },
  { title: 'Modular Furniture', description: 'Custom furniture solutions tailored to your space: linear workstations, cluster desks, height-adjustable standing desks, executive tables, and acoustic pods.', image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80', icon: 'Award', highlights: ['Custom Modular Workstations', 'Ergonomic Task Chairs', 'Integrated Wire Trays & Power Sockets'], order: 2, isActive: true },
  { title: 'Modular School Furniture', description: 'Custom school furniture solutions tailored to educational spaces: dual student desks, teacher lecterns, laboratory workbenches, and library shelving.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', icon: 'Users', highlights: ['Child-Safe Rounded Corner Frames', 'Durable Scratch-Proof Tops', 'Library Racks & Activity Tables'], order: 3, isActive: true },
  { title: 'False Ceiling & Wall Design', description: 'Aesthetic ceiling and wall treatments for a polished look. Gypsum false ceiling grid designs, acoustic wall panels, wooden louvers, and ambient cove LED lighting.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', icon: 'Zap', highlights: ['Gypsum Board Ceiling Systems', 'Acoustic Wall Panelling', 'Energy-Efficient LED Lighting'], order: 4, isActive: true },
  { title: 'Turnkey Interior Solutions', description: 'End-to-end project management where we handle everything: civil masonry, electrical wiring, plumbing, HVAC ducting, fire safety, paint finish, and final handover.', image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', icon: 'Wrench', highlights: ['Single Point Responsibility', 'Fixed Cost & Timeline', 'Post-Handover Warranty & Support'], order: 5, isActive: true }
];
await Service.insertMany(services);

// Service Checklist
const checklist = [
  { name: 'Office Furniture', description: 'Ergonomic workstations, executive desks, conference tables & storage units.', category: 'Furniture', order: 0 },
  { name: 'School Furniture', description: 'Dual student desks, teacher lecterns, library racks & activity tables.', category: 'Furniture', order: 1 },
  { name: 'Workstation', description: 'Linear & cluster workstations with integrated cable management.', category: 'Furniture', order: 2 },
  { name: 'Office Chairs', description: 'Ergonomic task chairs, executive high-back chairs & visitor seating.', category: 'Furniture', order: 3 },
  { name: 'Wide Range Of Tables', description: 'Conference, cafeteria, training & height-adjustable tables.', category: 'Furniture', order: 4 },
  { name: 'Gypsum Partitions', description: 'Lightweight drywall partitions with acoustic insulation.', category: 'Partitions', order: 5 },
  { name: 'Glass Partitions', description: 'Toughened acoustic glass partitions with aluminium frames.', category: 'Partitions', order: 6 },
  { name: 'Wall Panel', description: 'Designer wall panelling — wooden louvers, fabric acoustic panels.', category: 'Partitions', order: 7 },
  { name: 'False Ceiling Services', description: 'Gypsum, grid & designer ceilings with cove LED lighting.', category: 'Partitions', order: 8 },
  { name: 'Flooring', description: 'Vinyl planks, carpet tiles, wooden laminate & Italian marble flooring.', category: 'Partitions', order: 9 },
  { name: 'Paint Work', description: 'Premium emulsion, texture & enamel finishes with corporate color themes.', category: 'Partitions', order: 10 },
  { name: 'Electrical Fittings', description: 'Complete office wiring, modular switches & smart lighting.', category: 'Civil', order: 11 },
  { name: 'Plumbing Work', description: 'Pantry & washroom plumbing, premium CP fittings & drainage.', category: 'Civil', order: 12 },
  { name: 'Fire Safety Work', description: 'Fire alarm panels, sprinkler layouts & emergency exit signage.', category: 'Civil', order: 13 },
  { name: 'Interior Decoration', description: 'Branding walls, indoor plants, artwork & signage.', category: 'Civil', order: 14 },
  { name: 'Metal (SS/Chrome) Work', description: 'Stainless steel railings, partitions & chrome-finish metalwork.', category: 'Civil', order: 15 },
  { name: 'Aluminum Work', description: 'Aluminium windows, doors, structural glazing & partition framing.', category: 'Civil', order: 16 }
];
await ServiceChecklist.insertMany(checklist);

// Projects
const projects = [
  { title: 'Modern Workspaces', category: 'Modern Workspaces', image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80', description: 'Ergonomic and efficient workspaces designed to enhance productivity.', features: ['Ergonomic Task Seating', 'Under-Desk Power Raceway', 'Sound Absorbing Fabric Panels'], order: 0, isActive: true, isFeatured: true },
  { title: 'Glass Partition Solutions', category: 'Glass Partition Solutions', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', description: 'Premium toughened glass partitions with acoustic insulation.', features: ['Toughened Safety Glass', 'Acoustic Seals', 'Frosted Branding Strips'], order: 1, isActive: true, isFeatured: true },
  { title: 'Executive Director Cabin', category: 'Director Cabin', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', description: 'Luxurious director cabins with premium veneer and ambient lighting.', features: ['Premium Veneer Desk', 'Ambient Cove LED', 'Ergonomic Executive Chair'], order: 2, isActive: true, isFeatured: true },
  { title: 'Reception Area', category: 'Reception Area', image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80', description: 'Stunning reception areas that create lasting first impressions.', features: ['Custom Reception Desk', 'Brand Wall Graphics', 'Designer Seating'], order: 3, isActive: true, isFeatured: true },
  { title: 'Conference Room', category: 'Conference Room', image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', description: 'State-of-the-art conference rooms with AV integration.', features: ['Acoustic Wall Panels', 'Integrated AV Systems', 'Motorized Projection Screen'], order: 4, isActive: true, isFeatured: true },
  { title: 'School Furniture', category: 'School Furniture', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', description: 'Durable school furniture with child-safe designs.', features: ['Dual Student Desks', 'Teacher Lecterns', 'Library Racks'], order: 5, isActive: true, isFeatured: true },
  { title: 'Seminar Hall', category: 'Seminar Hall', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80', description: 'Spacious seminar halls with tiered seating and AV systems.', features: ['Tiered Seating', 'Stage Lighting', 'Sound System'], order: 6, isActive: true, isFeatured: true },
  { title: 'Office Cafeteria', category: 'Office Cafeteria', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', description: 'Vibrant cafeterias for employees to unwind and recharge.', features: ['Industrial Ceiling Grid', 'Easy-Clean Laminates', 'Pendant Lighting'], order: 7, isActive: true, isFeatured: true }
];
await Project.insertMany(projects);

// Project Categories
const cats = ['All', 'Modern Workspaces', 'Glass Partition Solutions', 'Director Cabin', 'Reception Area', 'Conference Room', 'School Furniture', 'Seminar Hall', 'Office Cafeteria'];
await ProjectCategory.insertMany(cats.map((name, i) => ({ name, order: i })));

// Testimonials
await Testimonial.insertMany([
  { name: 'Vikas Malhotra', role: 'Operations Head', company: 'Pinaakee Digital Solutions', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'Alpha Office Interior transformed our 8,000 sq. ft. office space in Sector-62 Noida within the promised 45 days timeline. Their glass partitions, modular workstations, and false ceiling design created a modern high-tech vibe that our employees love!', stars: 5, order: 0, isActive: true },
  { name: 'Ananya Sharma', role: 'Facility Manager', company: 'Enterprise Corporate Client', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'The turnkey fit-out execution was flawless. From civil & electrical work to executive director cabins and acoustically panelled conference rooms, Alpha Office delivered premium quality with zero stress for our team.', stars: 5, order: 1, isActive: true },
  { name: 'Rajesh Verma', role: 'Director of Infrastructure', company: 'Apex Knowledge Academy', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', quote: 'We commissioned Alpha Office Interior for modular school furniture and seminar hall seating. The durability, ergonomic design, and color themes exceeded all expectations. Exceptional craftsmanship!', stars: 5, order: 2, isActive: true }
]);

// Stats
await Stat.insertMany([
  { target: 150, suffix: '+', label: 'Projects Completed', description: 'Across Delhi NCR & Pan-India', icon: 'CheckCircle2', color: '#F59E0B', order: 0 },
  { target: 100, suffix: '+', label: 'Happy Clients', description: 'Corporate & educational institutes', icon: 'Users', color: '#F59E0B', order: 1 },
  { target: 5, suffix: '+', label: 'Years Experience', description: 'In commercial interior design', icon: 'Award', color: '#F59E0B', order: 2 },
  { target: 25, suffix: '+', label: 'Expert Professionals', description: 'Architects, designers & engineers', icon: 'Lightbulb', color: '#F59E0B', order: 3 },
  { target: 98, suffix: '%', label: 'On-Time Delivery', description: 'Committed milestone adherence', icon: 'Clock', color: '#F59E0B', order: 4 },
  { target: 100, suffix: '%', label: 'Client Satisfaction', description: 'Post-handover warranty support', icon: 'HeartHandshake', color: '#F59E0B', order: 5 }
]);

// FAQs
await Faq.insertMany([
  { question: 'What services are included under Alpha Office Turnkey Interior Solutions?', answer: 'Our turnkey interior solutions cover everything from initial 3D space planning and architectural design to civil masonry, gypsum & glass partitions, modular office furniture, false ceiling, flooring, electrical fittings, plumbing, fire safety, and final keys handover.', order: 0, isActive: true },
  { question: 'How long does a typical office interior fit-out project take?', answer: 'Project timelines depend on carpet area. Typically, a 3,000 to 5,000 sq. ft. office fit-out is completed within 35 to 45 business days with guaranteed milestone progress updates.', order: 1, isActive: true },
  { question: 'Do you provide customized modular furniture for schools and offices?', answer: 'Yes! We manufacture and supply custom modular furniture including ergonomic workstations, executive director desks, school dual seating benches, library racks, and acoustic pods tailored to your floor dimensions.', order: 2, isActive: true },
  { question: 'Where are Alpha Office Interior services available?', answer: 'We operate primarily across Noida, Greater Noida, Delhi NCR, Gurgaon, Ghaziabad, and execute pan-India commercial fit-out contracts for major corporate enterprises.', order: 3, isActive: true },
  { question: 'How do I get a free space layout design & project quote?', answer: 'You can click on "Get a Free Quote" anywhere on our website, fill in your approximate carpet area and location, or call us directly at +91 8178782919 to schedule a free site evaluation.', order: 4, isActive: true }
]);

// Process Steps
await ProcessStep.insertMany([
  { number: '01', title: 'Discovery & Site Audit', description: 'Free floor measurement, carpet area evaluation, and acoustic/flow requirement assessment.', icon: 'Search', order: 0 },
  { number: '02', title: '3D Space Renders', description: 'Photorealistic 3D layout visualization with lighting, custom veneers, and glass partitions.', icon: 'Compass', order: 1 },
  { number: '03', title: 'Itemized Proposal', description: 'Transparent material breakdown, fixed milestone timeline, and itemized budget lock-in.', icon: 'Palette', order: 2 },
  { number: '04', title: 'Turnkey Execution', description: 'Dedicated project manager executing civil, MEP, false ceiling, and modular furniture assembly.', icon: 'Wrench', order: 3 },
  { number: '05', title: 'Handover & Warranty', description: 'Zero-defect quality audit before final keys handover and 5-year post-handover warranty.', icon: 'ShieldCheck', order: 4 }
]);

// Client Logos
await ClientLogo.insertMany([
  'Wipro Technologies', 'Pinaakee Digital', 'TechVision Global', 'Nexus Business Park',
  'Apex Knowledge Academy', 'Innova Logistics', 'Skyline Infra Tech', 'Zenith Corporate Solutions'
].map((name, i) => ({ name, order: i, isActive: true })));

// Advantage Tiles
await AdvantageTile.insertMany([
  // home-what-we-do
  { group: 'home-what-we-do', title: 'Innovative Designs', description: 'Creative & modern interior concepts', icon: 'Lightbulb', order: 0 },
  { group: 'home-what-we-do', title: 'Quality Craftsmanship', description: 'Premium materials & expert execution', icon: 'Award', order: 1 },
  { group: 'home-what-we-do', title: 'Timely Delivery', description: 'On-schedule project completion', icon: 'Clock', order: 2 },
  { group: 'home-what-we-do', title: 'Customer Focus', description: 'Your vision, our mission', icon: 'HeartHandshake', order: 3 },
  // home-why-choose
  { group: 'home-why-choose', title: 'Complete Solutions', description: 'Single-point turnkey responsibility', icon: 'Building', order: 0 },
  { group: 'home-why-choose', title: 'Expert Team', description: '25+ architects & MEP engineers', icon: 'Users', order: 1 },
  { group: 'home-why-choose', title: 'Premium Quality', description: 'High grade commercial materials', icon: 'Award', order: 2 },
  { group: 'home-why-choose', title: 'On-Time Delivery', description: '100% committed handover deadline', icon: 'Clock', order: 3 },
  { group: 'home-why-choose', title: 'Client-First Culture', description: 'Transparent post-handover warranty', icon: 'ShieldCheck', order: 4 },
  // services-advantage
  { group: 'services-advantage', title: 'Complete Solutions', description: 'Single-point turnkey responsibility', icon: 'Building', order: 0 },
  { group: 'services-advantage', title: 'Expert Team', description: '25+ architects & MEP engineers', icon: 'Users', order: 1 },
  { group: 'services-advantage', title: 'Premium Quality', description: 'High grade commercial materials', icon: 'Award', order: 2 },
  { group: 'services-advantage', title: 'Timely Delivery', description: '100% committed handover deadline', icon: 'Clock', order: 3 },
  { group: 'services-advantage', title: 'Customer Focus', description: 'Transparent post-handover warranty', icon: 'ShieldCheck', order: 4 },
  // projects-commitment
  { group: 'projects-commitment', title: 'Quality Assured', description: 'Zero-defect handover guarantee', icon: 'ShieldCheck', order: 0 },
  { group: 'projects-commitment', title: 'On-Time Delivery', description: 'Committed milestone adherence', icon: 'Clock', order: 1 },
  { group: 'projects-commitment', title: 'Premium Materials', description: 'High-grade commercial finishes', icon: 'Award', order: 2 },
  { group: 'projects-commitment', title: 'Expert Team', description: '25+ architects & engineers', icon: 'Users', order: 3 },
  { group: 'projects-commitment', title: 'Client First', description: 'Your vision, our mission', icon: 'HeartHandshake', order: 4 }
]);

// Transformation Tabs
await TransformationTab.insertMany([
  { id: 'raw', label: '01. Raw Space & Layout', title: 'Raw Space Assessment & Layout Planning', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', description: 'We begin with a comprehensive site audit — measuring carpet area, analyzing natural light, and understanding your team workflow to create the optimal layout plan.', bullets: ['Free floor measurement & carpet area evaluation', 'Workflow analysis & department zoning', 'Structural assessment & MEP mapping'], order: 0 },
  { id: 'design', label: '02. 3D Concept Design', title: 'Photorealistic 3D Design & Visualization', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', description: 'Our design team creates photorealistic 3D renders showing lighting, materials, furniture, and color themes — so you see your office before we build it.', bullets: ['Photorealistic 3D renders & walkthroughs', 'Material & color theme selection', 'Furniture layout & specification'], order: 1 },
  { id: 'fitout', label: '03. Turnkey Fit-Out', title: 'Complete Turnkey Execution & Handover', image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', description: 'From civil work to final furniture installation — our project manager handles everything with fixed timeline and milestone tracking until keys handover.', bullets: ['Civil, MEP, false ceiling & partitions', 'Modular furniture installation', 'Quality audit & keys handover'], order: 2 }
]);

// About Content
await AboutContent.create({
  tabs: [
    { id: 'overview', label: 'Company Overview', content: 'Alpha Office Interior is a premier commercial interior design firm based in Noida, specializing in turnkey office fit-outs, modular furniture, and institutional furniture solutions.' },
    { id: 'values', label: '4 Core Values', content: 'Innovation, Quality, Timeliness, Client-First approach.' },
    { id: 'why-us', label: 'Why Choose Us', content: '25+ expert professionals, 150+ projects delivered, 98% on-time rate.' },
    { id: 'team', label: '25+ Expert Team', content: 'Architects, interior designers, MEP engineers, and project managers.' }
  ],
  coreValues: [
    { title: 'Innovation', desc: 'Creative & modern interior concepts', icon: 'Lightbulb' },
    { title: 'Quality', desc: 'Premium materials & expert execution', icon: 'Award' },
    { title: 'Timeliness', desc: 'On-schedule project completion', icon: 'Clock' },
    { title: 'Client-First', desc: 'Your vision, our mission', icon: 'HeartHandshake' }
  ],
  whyItems: [
    { title: '25+ Expert Professionals', desc: 'Architects, designers & engineers', icon: 'Users' },
    { title: '150+ Projects Delivered', desc: 'Across Delhi NCR & Pan-India', icon: 'CheckCircle2' },
    { title: '98% On-Time Delivery', desc: 'Committed milestone adherence', icon: 'Clock' },
    { title: '5-Year Warranty', desc: 'Post-handover support', icon: 'ShieldCheck' },
    { title: 'Premium Materials', desc: 'High-grade commercial finishes', icon: 'Award' },
    { title: 'Transparent Pricing', desc: 'Itemized budget lock-in', icon: 'FileText' },
    { title: '3D Visualization', desc: 'See your office before we build', icon: 'Compass' },
    { title: 'Single Point Contact', desc: 'Dedicated project manager', icon: 'Briefcase' },
    { title: 'Pan-India Service', desc: 'Noida, Delhi NCR & beyond', icon: 'Building' },
    { title: 'Acoustic Solutions', desc: 'Sound-treated meeting rooms', icon: 'Zap' },
    { title: 'Brand Integration', desc: 'Corporate color themes', icon: 'Sparkles' },
    { title: 'Zero-Defect Handover', desc: 'Quality audit before keys', icon: 'CheckCircle2' }
  ],
  teamStats: [
    { value: '25+', label: 'Expert Professionals' },
    { value: '150+', label: 'Projects Delivered' },
    { value: '5+', label: 'Years Experience' }
  ],
  pullQuote: { text: "We don't just design offices — we create productive, inspiring workspaces that help businesses grow.", author: 'Alpha Office Interior' }
});

// Cost Calculator Config
await CostCalculatorConfig.create({
  spaceTypes: [
    { id: 'corporate', label: 'Corporate Office' },
    { id: 'executive', label: 'Executive Suite' },
    { id: 'school', label: 'School / Institute' },
    { id: 'retail', label: 'Commercial Retail' }
  ],
  packages: [
    { id: 'essential', label: 'Essential', ratePerSqft: 950, timelinePer1000sqft: 8 },
    { id: 'premium', label: 'Premium', ratePerSqft: 1450, timelinePer1000sqft: 10 },
    { id: 'ultra', label: 'Ultra Executive', ratePerSqft: 2100, timelinePer1000sqft: 12 }
  ],
  areaRange: { min: 500, max: 15000, step: 100 }
});

// Page Headers
await PageHeader.insertMany([
  { page: 'about', subtitle: 'About Alpha Office Interior', title: 'About Alpha Office Interior', description: 'Designing Inspiring Workspaces with Innovation & Excellence' },
  { page: 'services', subtitle: 'Alpha Interior Services', title: 'Smart Designs. Functional Spaces. Lasting Impact.', description: 'Comprehensive interior fit-out solutions engineered for corporate offices, commercial suites, and educational institutes.' },
  { page: 'projects', subtitle: 'Alpha Project Portfolio', title: 'Excellence In Space Execution', description: 'Explore our finished corporate office fit-outs, executive cabins, glass partitions, and institutional seating.' },
  { page: 'contact', subtitle: 'Get In Touch', title: 'Contact Alpha Office Interior', description: 'Reach out to our senior interior consultants for space evaluations, turnkey quotes, or site visits in Noida & Delhi NCR.' }
]);

// CTA Banners
await CtaBanner.insertMany([
  { location: 'home-final', title: 'Ready to Transform Your Workspace?', description: 'Get a free consultation and 3D design preview for your office interior project today.', buttons: [{ label: 'Get Free Quote', action: 'quote', style: 'gold' }, { label: 'Call +91 8178782919', action: 'tel', style: 'outline' }] },
  { location: 'about-final', title: "Let's Build Your Dream Office Together", description: 'Schedule a free site visit and get a customized interior proposal.', buttons: [{ label: 'Get Free Quote', action: 'quote', style: 'gold' }, { label: 'View Projects', action: 'projects', style: 'outline' }] },
  { location: 'services', title: 'Start Your Interior Journey Today', description: 'From concept to handover — we manage every detail.', buttons: [{ label: 'Get Free Quote', action: 'quote', style: 'gold' }] },
  { location: 'projects', title: 'Your Project Could Be Next', description: 'Get in touch for a free consultation and 3D design preview.', buttons: [{ label: 'Get Free Quote', action: 'quote', style: 'gold' }] },
  { location: 'footer-top', title: 'Ready to Transform Your Workspace?', description: 'Get in touch today for space planning, 3D interior design, and complete turnkey execution.', buttons: [{ label: 'Get Free Consultation', action: 'quote', style: 'gold' }, { label: 'Call +91 8178782919', action: 'tel', style: 'outline' }] }
]);

// Footer Config
await FooterConfig.create({
  ctaTitle: 'Ready to Transform Your Workspace?',
  ctaDescription: 'Get in touch today for space planning, 3D interior design, and complete turnkey execution.',
  quickLinks: [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Company' },
    { id: 'services', label: 'Our Services' },
    { id: 'projects', label: 'Project Portfolio' },
    { id: 'contact', label: 'Contact Us' }
  ],
  serviceLinks: [
    'Corporate Office Interior', 'Space Planning & Layout', 'Modular Office Furniture',
    'Modular School Furniture', 'False Ceiling & Wall Design', 'Turnkey Interior Solutions'
  ],
  copyrightText: '© 2025 Alpha Office Interior. All Rights Reserved.',
  designedByText: 'Designed for Modern Inspiring Workspaces'
});

console.log('Seed complete!');
}

// If run directly as a script, connect to DB and run seed
import connectDB from '../config/db.js';
const isDirectRun = process.argv[1] && process.argv[1].endsWith('seed.js');
if (isDirectRun) {
  await connectDB();
  await runSeed();
  process.exit(0);
}
