import { prisma } from '../config/db.js';

export async function submitApplication(req, res) {
  const application = await prisma.application.create({ data: req.body });
  res.status(201).json(application);
}

export async function listApplications(req, res) {
  const where = {};
  if (req.user.role === 'AGENT') where.agentId = req.user.id;
  if (req.user.role === 'CITIZEN') where.citizenId = req.user.id;

  const rows = await prisma.application.findMany({
    where,
    include: { scheme: true, citizen: true, agent: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(rows);
}
