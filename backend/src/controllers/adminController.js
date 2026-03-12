import { UserStatus } from '@prisma/client';
import { prisma } from '../config/db.js';
import { runAiSchemeSync } from '../services/aiSyncService.js';

export async function dashboardStats(req, res) {
  const [schemes, agents, citizens, applications] = await Promise.all([
    prisma.scheme.count(),
    prisma.user.count({ where: { role: 'AGENT' } }),
    prisma.user.count({ where: { role: 'CITIZEN' } }),
    prisma.application.count()
  ]);
  res.json({ schemes, agents, citizens, applications });
}

export async function listAgentApplications(req, res) {
  const agents = await prisma.user.findMany({ where: { role: 'AGENT' }, orderBy: { createdAt: 'desc' } });
  res.json(agents);
}

export async function reviewAgent(req, res) {
  const { status, remarks } = req.body;
  if (![UserStatus.APPROVED, UserStatus.REJECTED].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const agent = await prisma.user.update({ where: { id: req.params.id }, data: { status, remarks } });
  res.json(agent);
}

export async function triggerAiSync(req, res) {
  await runAiSchemeSync(req.user.id);
  res.json({ message: 'AI scheme sync initiated' });
}

export async function listAiLogs(req, res) {
  const logs = await prisma.aISyncLog.findMany({ orderBy: { runAt: 'desc' }, take: 100 });
  res.json(logs);
}
