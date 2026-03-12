import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'superadmin@sevasetu.in' },
    update: {},
    create: {
      fullName: 'Super Admin',
      mobile: '9999999999',
      email: 'superadmin@sevasetu.in',
      passwordHash,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      otpVerified: true
    }
  });

  const records = Array.from({ length: 1000 }).map((_, index) => ({
    schemeId: `SSK-${String(index + 1).padStart(4, '0')}`,
    schemeName: `Government Support Scheme ${index + 1}`,
    description: 'Comprehensive welfare scheme for eligible beneficiaries.',
    benefits: 'Direct financial assistance, training, and subsidies.',
    eligibility: 'Income and demographic-based eligibility as per guidelines.',
    documentsRequired: 'Aadhar, PAN, income certificate, residence proof.',
    applicationProcess: 'Apply online through authorized Seva Setu agents.',
    officialLink: 'https://www.india.gov.in',
    state: ['Maharashtra', 'Gujarat', 'Karnataka', 'Delhi'][index % 4],
    department: ['Rural Development', 'Women & Child', 'Education', 'Employment'][index % 4],
    category: ['Scholarship', 'Subsidy', 'Healthcare', 'Housing'][index % 4],
    incomeLimit: 'Below 8 LPA',
    gender: ['Any', 'Female', 'Any', 'Any'][index % 4],
    ageMin: 18,
    ageMax: 65
  }));

  for (const chunkStart of Array.from({ length: Math.ceil(records.length / 200) }, (_, i) => i * 200)) {
    const chunk = records.slice(chunkStart, chunkStart + 200);
    await prisma.scheme.createMany({ data: chunk, skipDuplicates: true });
  }

  console.log('Seeded users and 1000+ schemes');
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());
