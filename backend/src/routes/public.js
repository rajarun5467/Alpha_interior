import express from 'express';
import {
  Settings, Hero, Service, ServiceChecklist, Project, ProjectCategory,
  Testimonial, Stat, Faq, ProcessStep, ClientLogo, AdvantageTile,
  TransformationTab, AboutContent, CostCalculatorConfig, PageHeader,
  CtaBanner, FooterConfig
} from '../models/index.js';

const router = express.Router();

const single = (Model, filter = {}) => async (req, res) => {
  try { res.json(await Model.findOne(filter) || {}); } catch (e) { res.status(500).json({ message: e.message }); }
};

const list = (Model, filter = {}) => async (req, res) => {
  try { res.json(await Model.find(filter).sort({ order: 1 })); } catch (e) { res.status(500).json({ message: e.message }); }
};

router.get('/settings', single(Settings));
router.get('/hero', single(Hero));
router.get('/services', list(Service, { isActive: true }));
router.get('/service-checklist', list(ServiceChecklist));
router.get('/projects', list(Project, { isActive: true }));
router.get('/project-categories', list(ProjectCategory));
router.get('/testimonials', list(Testimonial, { isActive: true }));
router.get('/stats', list(Stat));
router.get('/faqs', list(Faq, { isActive: true }));
router.get('/process-steps', list(ProcessStep));
router.get('/client-logos', list(ClientLogo, { isActive: true }));
router.get('/advantage-tiles', async (req, res) => {
  try { res.json(await AdvantageTile.find(req.query.group ? { group: req.query.group } : {}).sort({ order: 1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
router.get('/transformation-tabs', list(TransformationTab));
router.get('/about-content', single(AboutContent));
router.get('/cost-calculator-config', single(CostCalculatorConfig));
router.get('/page-headers', async (req, res) => {
  try { res.json(await PageHeader.find().sort({ page: 1 })); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.get('/cta-banners', async (req, res) => {
  try { res.json(await CtaBanner.find().sort({ location: 1 })); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.get('/footer-config', single(FooterConfig));

export default router;
