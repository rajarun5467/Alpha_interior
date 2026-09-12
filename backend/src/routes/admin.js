import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  Settings, Hero, Service, ServiceChecklist, Project, ProjectCategory,
  Testimonial, Stat, Faq, ProcessStep, ClientLogo, AdvantageTile,
  TransformationTab, AboutContent, CostCalculatorConfig, PageHeader,
  CtaBanner, FooterConfig, QuoteSubmission, ContactSubmission
} from '../models/index.js';

const router = express.Router();
router.use(protect);

// === SINGLETON PUT routes ===
const singlePut = (Model, filter = {}) => async (req, res) => {
  try {
    const doc = await Model.findOneAndUpdate(filter, req.body, { upsert: true, new: true });
    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

router.put('/settings', singlePut(Settings));
router.put('/hero', singlePut(Hero));
router.put('/about-content', singlePut(AboutContent));
router.put('/cost-calculator-config', singlePut(CostCalculatorConfig));
router.put('/page-headers/:page', async (req, res) => {
  try {
    const doc = await PageHeader.findOneAndUpdate({ page: req.params.page }, req.body, { upsert: true, new: true });
    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put('/cta-banners/:location', async (req, res) => {
  try {
    const doc = await CtaBanner.findOneAndUpdate({ location: req.params.location }, req.body, { upsert: true, new: true });
    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put('/footer-config', singlePut(FooterConfig));

// === Generic CRUD factory ===
function crudRoutes(Model, name) {
  router.get(`/${name}`, async (req, res) => {
    try { res.json(await Model.find(req.query.group ? { group: req.query.group } : {}).sort({ order: 1 })); }
    catch (e) { res.status(500).json({ message: e.message }); }
  });
  router.post(`/${name}`, async (req, res) => {
    try { const doc = await Model.create(req.body); res.status(201).json(doc); }
    catch (e) { res.status(400).json({ message: e.message }); }
  });
  router.put(`/${name}/reorder`, async (req, res) => {
    try {
      const { ids } = req.body;
      await Promise.all(ids.map((id, i) => Model.findByIdAndUpdate(id, { order: i })));
      res.json({ success: true });
    } catch (e) { res.status(400).json({ message: e.message }); }
  });
  router.put(`/${name}/:id`, async (req, res) => {
    try { const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); }
    catch (e) { res.status(400).json({ message: e.message }); }
  });
  router.delete(`/${name}/:id`, async (req, res) => {
    try { await Model.findByIdAndDelete(req.params.id); res.json({ success: true }); }
    catch (e) { res.status(400).json({ message: e.message }); }
  });
}

crudRoutes(Service, 'services');
crudRoutes(ServiceChecklist, 'service-checklist');
crudRoutes(Project, 'projects');
crudRoutes(ProjectCategory, 'project-categories');
crudRoutes(Testimonial, 'testimonials');
crudRoutes(Stat, 'stats');
crudRoutes(Faq, 'faqs');
crudRoutes(ProcessStep, 'process-steps');
crudRoutes(ClientLogo, 'client-logos');
crudRoutes(AdvantageTile, 'advantage-tiles');
crudRoutes(TransformationTab, 'transformation-tabs');

// === Leads ===
router.get('/leads/quotes', async (req, res) => {
  try { res.json(await QuoteSubmission.find().sort({ submittedAt: -1 }).limit(100)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
router.get('/leads/quotes/:id', async (req, res) => {
  try { res.json(await QuoteSubmission.findById(req.params.id)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/leads/quotes/:id', async (req, res) => {
  try { res.json(await QuoteSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete('/leads/quotes/:id', async (req, res) => {
  try { await QuoteSubmission.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.get('/leads/contacts', async (req, res) => {
  try { res.json(await ContactSubmission.find().sort({ submittedAt: -1 }).limit(100)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
router.get('/leads/contacts/:id', async (req, res) => {
  try { res.json(await ContactSubmission.findById(req.params.id)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/leads/contacts/:id', async (req, res) => {
  try { res.json(await ContactSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete('/leads/contacts/:id', async (req, res) => {
  try { await ContactSubmission.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

export default router;
