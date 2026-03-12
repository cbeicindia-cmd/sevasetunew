import { prisma } from '../config/db.js';

export async function listSchemes(req, res) {
  const { state, category, income, gender, age, department, q } = req.query;
  const schemes = await prisma.scheme.findMany({
    where: {
      state: state || undefined,
      category: category || undefined,
      department: department || undefined,
      incomeLimit: income || undefined,
      gender: gender || undefined,
      AND: age ? [{ ageMin: { lte: Number(age) } }, { ageMax: { gte: Number(age) } }] : undefined,
      OR: q
        ? [
            { schemeName: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } }
          ]
        : undefined
    },
    take: 100
  });
  res.json(schemes);
}

export async function createScheme(req, res) {
  const scheme = await prisma.scheme.create({ data: req.body });
  res.status(201).json(scheme);
}

export async function updateScheme(req, res) {
  const scheme = await prisma.scheme.update({ where: { id: req.params.id }, data: req.body });
  res.json(scheme);
}
