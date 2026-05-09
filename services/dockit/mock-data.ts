import type {
  ActivityItem,
  Developer,
  DockitDocument,
  FlowchartDiagram,
  Project,
} from "@/types/dockit";

export const dockitDeveloper: Developer = {
  name: "Rizky Pratama",
  email: "rizky@example.com",
  initials: "RP",
};

const prd = {
  overview:
    "Redesign of existing e-commerce platform with modern UI, improved checkout flow, and mobile-first approach.",
  goals: [
    "Meningkatkan konversi checkout dari pengunjung mobile.",
    "Merapikan katalog produk agar mudah dikelola tim admin.",
  ],
  scope:
    "Termasuk katalog produk, shopping cart, pembayaran Midtrans, admin dashboard, dan order tracking. Integrasi logistik lanjutan tidak termasuk fase pertama.",
  features: [
    "Product catalog - kategori, pencarian, filter harga, dan detail produk.",
    "Shopping cart - keranjang persisten dengan ringkasan biaya.",
    "Midtrans payment - pembayaran QRIS, VA, dan kartu.",
    "Admin dashboard - pengelolaan produk, pesanan, dan laporan sederhana.",
    "Order tracking - status pesanan untuk pelanggan dan admin.",
  ],
  stack: {
    frontend: "Next.js",
    backend: "Node.js",
    database: "PostgreSQL",
    styling: "Tailwind CSS",
  },
  timeline: "8 weeks",
  budget: "Rp 15.000.000",
  acceptanceCriteria: [
    "Pelanggan dapat menyelesaikan checkout sampai pembayaran berhasil.",
    "Admin dapat membuat, mengubah, dan menonaktifkan produk.",
    "Status pesanan dapat dilihat pelanggan tanpa menghubungi admin.",
  ],
};

const flowDefinition = `flowchart LR
  A[Client Meeting] --> B[PRD Approved]
  B --> C[UI/UX Design]
  C --> D[Frontend Dev]
  C --> E[Backend Dev]
  D --> F[Integration]
  E --> F
  F --> G[Testing]
  G --> H[Deployment]
  H --> I[BAST Signed]`;

const baseDocuments: DockitDocument[] = [
  {
    id: "doc-bast",
    name: "BAST E-Commerce Redesign",
    type: "BAST",
    description: "Berita Acara Serah Terima hasil pekerjaan proyek.",
    status: "Ready",
    generatedAt: "7 Mei 2026",
    lastModifiedAt: "8 Mei 2026",
    fileSize: "~42 KB",
    previewLines: [
      "Pihak developer menyerahkan hasil pekerjaan redesign platform e-commerce.",
      "Pekerjaan mencakup katalog produk, checkout, dan dashboard admin.",
      "Dokumen berlaku setelah ditandatangani kedua belah pihak.",
    ],
  },
  {
    id: "doc-contract",
    name: "Kontrak Kerja E-Commerce Redesign",
    type: "Kontrak Kerja",
    description: "Perjanjian kerja antara developer dan klien.",
    status: "Pending Signature",
    generatedAt: "7 Mei 2026",
    lastModifiedAt: "8 Mei 2026",
    fileSize: "~58 KB",
    previewLines: [
      "Ruang lingkup pekerjaan mengikuti PRD yang telah disetujui.",
      "Nilai proyek sebesar Rp 15.000.000 dengan termin pembayaran.",
      "Perubahan scope wajib disetujui tertulis oleh kedua pihak.",
    ],
  },
  {
    id: "doc-sow",
    name: "SOW E-Commerce Redesign",
    type: "SOW",
    description: "Statement of Work berisi scope dan milestone detail.",
    status: "Ready",
    generatedAt: "7 Mei 2026",
    lastModifiedAt: "8 Mei 2026",
    fileSize: "~36 KB",
    previewLines: [
      "Milestone pertama mencakup desain UI mobile-first.",
      "Milestone kedua mencakup implementasi frontend dan backend.",
      "Milestone akhir mencakup testing, deployment, dan serah terima.",
    ],
  },
  {
    id: "doc-nda",
    name: "NDA Startup Nusantara",
    type: "NDA",
    description: "Perjanjian kerahasiaan informasi proyek.",
    status: "Signed",
    generatedAt: "3 Mei 2026",
    lastModifiedAt: "4 Mei 2026",
    signedBy: "Ayu Larasati",
    signedAt: "4 Mei 2026",
    fileSize: "~28 KB",
    previewLines: [
      "Informasi bisnis dan teknis wajib dijaga kerahasiaannya.",
      "Kewajiban berlaku selama proyek dan dua tahun setelahnya.",
      "Pelanggaran akan diselesaikan sesuai hukum yang berlaku.",
    ],
  },
  {
    id: "doc-invoice",
    name: "Invoice Termin 1",
    type: "Invoice",
    description: "Tagihan pembayaran termin pertama.",
    status: "Draft",
    generatedAt: "6 Mei 2026",
    lastModifiedAt: "6 Mei 2026",
    fileSize: "~18 KB",
    previewLines: [
      "Invoice termin pertama sebesar 40% dari nilai proyek.",
      "Pembayaran dilakukan melalui transfer bank.",
      "Jatuh tempo pembayaran tujuh hari setelah invoice diterima.",
    ],
  },
  {
    id: "doc-sla",
    name: "SLA Maintenance",
    type: "SLA",
    description: "Service Level Agreement untuk masa dukungan.",
    status: "Ready",
    generatedAt: "8 Mei 2026",
    lastModifiedAt: "8 Mei 2026",
    fileSize: "~31 KB",
    previewLines: [
      "Waktu respon untuk isu kritikal maksimal empat jam kerja.",
      "Maintenance mencakup bug fixing dan monitoring dasar.",
      "Perubahan fitur baru dihitung sebagai pekerjaan terpisah.",
    ],
  },
];

const diagrams: FlowchartDiagram[] = [
  {
    id: "diagram-user-flow",
    name: "Checkout User Flow",
    type: "User Flow",
    lastUpdatedAt: "8 Mei 2026",
    nodeCount: 9,
    definition: flowDefinition,
  },
  {
    id: "diagram-architecture",
    name: "Platform Architecture",
    type: "Architecture",
    lastUpdatedAt: "8 Mei 2026",
    nodeCount: 9,
    definition: flowDefinition,
  },
  {
    id: "diagram-erd",
    name: "Commerce ERD",
    type: "ERD",
    lastUpdatedAt: "7 Mei 2026",
    nodeCount: 9,
    definition: flowDefinition,
  },
];

const activity: ActivityItem[] = [
  {
    id: "act-prd",
    tone: "green",
    action: "PRD generated",
    timestamp: "2 days ago",
    detail: "Generated from meeting transcript with PT Maju Jaya.",
  },
  {
    id: "act-flow",
    tone: "blue",
    action: "Flowchart approved",
    timestamp: "2 days ago",
  },
  {
    id: "act-docs",
    tone: "blue",
    action: "Documents generated (3)",
    timestamp: "1 day ago",
  },
  {
    id: "act-share",
    tone: "blue",
    action: "Share link sent to client",
    timestamp: "1 day ago",
    detail: "Sent to project owner at PT Maju Jaya.",
  },
  {
    id: "act-waiting",
    tone: "amber",
    action: "Awaiting client signature",
    timestamp: "Today",
  },
];

export const dockitProjects: Project[] = [
  {
    id: "e-commerce-redesign",
    name: "E-Commerce Redesign",
    client: {
      name: "PT Maju Jaya",
      email: "legal@majujaya.co.id",
      company: "PT Maju Jaya",
    },
    status: "In Progress",
    documentCount: 3,
    createdAt: "1 Mei 2026",
    lastUpdatedAt: "2 days ago",
    prd,
    documents: baseDocuments.slice(0, 3),
    diagrams,
    activity,
    progress: 62,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    client: {
      name: "Startup Nusantara",
      email: "hello@startupnusantara.id",
      company: "Startup Nusantara",
    },
    status: "Pending Signature",
    documentCount: 5,
    createdAt: "28 April 2026",
    lastUpdatedAt: "5 days ago",
    prd,
    documents: baseDocuments.slice(0, 5),
    diagrams,
    activity,
    progress: 84,
  },
  {
    id: "mobile-app-mvp",
    name: "Mobile App MVP",
    client: {
      name: "Budi Santoso",
      email: "budi@example.com",
    },
    status: "Completed",
    documentCount: 6,
    createdAt: "14 April 2026",
    lastUpdatedAt: "1 week ago",
    prd,
    documents: baseDocuments,
    diagrams,
    activity,
    progress: 100,
  },
  {
    id: "dashboard-admin",
    name: "Dashboard Admin",
    client: {
      name: "CV Berkah Tech",
      email: "ops@berkahtech.id",
      company: "CV Berkah Tech",
    },
    status: "Draft",
    documentCount: 1,
    createdAt: "8 April 2026",
    lastUpdatedAt: "2 weeks ago",
    prd,
    documents: baseDocuments.slice(4, 5),
    diagrams,
    activity,
    progress: 18,
  },
];

export const documentGenerationOptions = [
  {
    id: "bast",
    type: "BAST",
    title: "BAST",
    description: "Berita Acara Serah Terima",
    selected: true,
  },
  {
    id: "contract",
    type: "Kontrak Kerja",
    title: "Kontrak Kerja",
    description: "Perjanjian kerja antara developer dan klien",
    selected: true,
  },
  {
    id: "nda",
    type: "NDA",
    title: "NDA",
    description: "Non-Disclosure Agreement",
    selected: false,
  },
  {
    id: "sow",
    type: "SOW",
    title: "SOW",
    description: "Statement of Work - scope detail",
    selected: true,
  },
  {
    id: "sla",
    type: "SLA",
    title: "SLA",
    description: "Service Level Agreement",
    selected: false,
  },
  {
    id: "invoice",
    type: "Invoice",
    title: "Invoice",
    description: "Tagihan pembayaran",
    selected: false,
  },
] as const;
