const express = require('express');
const router = express.Router();
const { Job, Company } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_change_me';

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid authorization header' });
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Create a job (only for companies)
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'company') return res.status(403).json({ error: 'Only companies can create jobs' });

    const { titulo, descricao, escala, modelo, requisitos, regime } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo required' });

    const company = await Company.findByPk(req.user.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const job = await Job.create({
      titulo,
      descricao,
      escala,
      modelo,
      requisitos,
      regime,
      companyId: company.id,
    });

    return res.json({ job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// List jobs (optionally filter by company)
router.get('/', async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const where = {};
    if (companyId) where.companyId = companyId;
    const jobs = await Job.findAll({ where, include: [{ model: Company, attributes: ['id', 'nome', 'descricao', 'logo'] }], order: [['createdAt', 'DESC']] });
    return res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a job by id (only company owner)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (req.user.role !== 'company') return res.status(403).json({ error: 'Only companies can delete jobs' });
    if (job.companyId !== req.user.id) return res.status(403).json({ error: 'Not allowed to delete this job' });

    await job.destroy();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
