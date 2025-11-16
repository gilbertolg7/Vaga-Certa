const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Company } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_change_me';

router.post('/register-user', async (req, res) => {
  try {
    const { email, password, nome, cpf, idade, estado, cidade, endereco } = req.body;
    if (!email || !password || !nome) return res.status(400).json({ error: 'email, password and nome required' });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, nome, cpf, idade: idade ? Number(idade) : null, estado, cidade, endereco, role: 'candidate' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({ user: { id: user.id, email: user.email, nome: user.nome, role: user.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register-company', async (req, res) => {
  try {
    const { email, password, nome, cnpj, state, city, endereco } = req.body;
    if (!email || !password || !nome) return res.status(400).json({ error: 'email, password and nome required' });

    const existing = await Company.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const company = await Company.create({ email, passwordHash, nome, cnpj, state, city, endereco, role: 'company' });

    const token = jwt.sign({ id: company.id, role: company.role }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({ company: { id: company.id, email: company.email, nome: company.nome, role: company.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    // First try company
    let account = await Company.findOne({ where: { email } });
    let kind = 'company';
    if (!account) {
      account = await User.findOne({ where: { email } });
      kind = 'user';
    }
    if (!account) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, account.passwordHash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: account.id, role: account.role || (kind === 'company' ? 'company' : 'candidate') }, JWT_SECRET, { expiresIn: '7d' });

    const profile = kind === 'company' ? { id: account.id, email: account.email, nome: account.nome, role: 'company' } : { id: account.id, email: account.email, nome: account.nome, role: 'candidate' };

    return res.json({ profile, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

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

// Update current authenticated user's profile (company or user)
router.put('/me', authenticate, async (req, res) => {
  try {
    const { nome, idade, endereco, areaAtuante, experiencia, nome: companyNome, endereco: companyEndereco, area, descricao, avatar, logo } = req.body;
    if (req.user.role === 'company') {
      const company = await Company.findByPk(req.user.id);
      if (!company) return res.status(404).json({ error: 'Company not found' });
      if (companyNome !== undefined) company.nome = companyNome;
      if (companyEndereco !== undefined) company.endereco = companyEndereco;
      if (area !== undefined) company.area = area;
      if (descricao !== undefined) company.descricao = descricao;
      if (logo !== undefined) company.logo = logo;
      await company.save();
      const profile = { id: company.id, email: company.email, nome: company.nome, role: 'company', logo: company.logo, descricao: company.descricao };
      return res.json({ profile });
    } else {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (nome !== undefined) user.nome = nome;
      if (idade !== undefined) user.idade = idade ? Number(idade) : null;
      if (endereco !== undefined) user.endereco = endereco;
      if (areaAtuante !== undefined) user.areaAtuante = areaAtuante;
      if (experiencia !== undefined) user.experiencia = experiencia;
      if (avatar !== undefined) user.avatar = avatar;
      await user.save();
      const profile = { id: user.id, email: user.email, nome: user.nome, role: 'candidate', avatar: user.avatar };
      return res.json({ profile });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// Get current authenticated user's profile
router.get('/me', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'company') {
      const company = await Company.findByPk(req.user.id);
      if (!company) return res.status(404).json({ error: 'Company not found' });
      const profile = {
        id: company.id,
        email: company.email,
        nome: company.nome,
        endereco: company.endereco,
        area: company.area,
        descricao: company.descricao,
        logo: company.logo,
        role: 'company',
      };
      return res.json({ profile });
    } else {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const profile = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        idade: user.idade,
        endereco: user.endereco,
        areaAtuante: user.areaAtuante,
        experiencia: user.experiencia,
        avatar: user.avatar,
        role: user.role || 'candidate',
      };
      return res.json({ profile });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
