import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  ShieldCheck,
  Calendar,
  DollarSign,
  Maximize2,
  X,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';

interface Photo {
  _id?: string;
  url: string;
  type: 'before' | 'after';
  caption?: string;
  uploadedAt?: string;
}

interface ReplacedPart {
  _id?: string;
  name: string;
  cost: number;
}

export interface RepairRecordData {
  _id: string;
  deviceIdentifier: string;
  deviceModel: string;
  deviceType?: string;
  serialNumber?: string;
  reportedIssues: string[];
  servicesPerformed: string[];
  replacedParts: ReplacedPart[];
  totalCost: number;
  warranty?: {
    periodMonths?: number;
    expiryDate?: string;
    policy?: string;
  };
  status: 'in_progress' | 'completed' | 'verified';
  photos: Photo[];
  notes?: string;
  createdAt: string;
  technician?: {
    name?: string;
    email?: string;
  };
}

interface Props {
  record: RepairRecordData;
}

export default function RepairHistoryCard({ record }: Props) {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const beforePhoto = record.photos?.find((p) => p.type === 'before');
  const afterPhoto = record.photos?.find((p) => p.type === 'after');

  const formattedDate = new Date(record.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const warrantyExpiryFormatted = record.warranty?.expiryDate
    ? new Date(record.warranty.expiryDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="rounded-2xl border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.18_0.006_260/0.7)] backdrop-blur-xl p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-[oklch(0.65_0.19_35/0.4)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[oklch(0.28_0.008_260/0.4)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[oklch(0.65_0.19_35/0.15)] text-[oklch(0.78_0.16_75)] font-bold border border-[oklch(0.65_0.19_35/0.3)]">
              {record.deviceType || 'Device'}
            </span>
            <span className="font-mono text-xs text-[oklch(0.65_0.01_260)]">
              ID: {record.deviceIdentifier}
            </span>
          </div>
          <h3 className="font-display font-extrabold text-xl text-[oklch(0.96_0.005_260)] tracking-tight">
            {record.deviceModel}
          </h3>
          {record.serialNumber && (
            <p className="font-mono text-[11px] text-[oklch(0.65_0.01_260)]">
              S/N: {record.serialNumber}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end font-mono text-xs text-[oklch(0.65_0.01_260)]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                  record.status === 'completed' || record.status === 'verified'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {record.status === 'completed' || record.status === 'verified' ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
                {record.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BEFORE AND AFTER PHOTOS (Side-by-Side on Desktop, Stacked on Mobile) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[oklch(0.78_0.16_75)]" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-[oklch(0.96_0.005_260)] font-bold">
              Visual Proof: Before & After Repair
            </h4>
          </div>
          <span className="font-mono text-[10px] text-[oklch(0.65_0.01_260)]">
            Side-by-side inspection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before Photo Box */}
          <div className="group relative rounded-xl overflow-hidden border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.14_0.005_260)] aspect-[4/3] flex flex-col items-center justify-center">
            {beforePhoto ? (
              <>
                <img
                  src={beforePhoto.url}
                  alt="Before Repair"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-md text-white font-mono text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg border border-red-400/40">
                  Before Repair
                </div>
                {beforePhoto.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-md p-2 text-[11px] text-slate-200 truncate">
                    {beforePhoto.caption}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setActivePhotoModal(beforePhoto.url)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  aria-label="Enlarge before photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mx-auto text-[oklch(0.65_0.01_260)]">
                  <Camera className="w-5 h-5" />
                </div>
                <p className="font-mono text-xs text-[oklch(0.65_0.01_260)] font-semibold">
                  No Before Photo
                </p>
                <p className="text-[10px] text-[oklch(0.65_0.01_260/0.7)]">
                  Technician has not uploaded an initial condition photo
                </p>
              </div>
            )}
          </div>

          {/* After Photo Box */}
          <div className="group relative rounded-xl overflow-hidden border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.14_0.005_260)] aspect-[4/3] flex flex-col items-center justify-center">
            {afterPhoto ? (
              <>
                <img
                  src={afterPhoto.url}
                  alt="After Repair"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-emerald-500/80 backdrop-blur-md text-white font-mono text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-lg border border-emerald-400/40">
                  After Repair
                </div>
                {afterPhoto.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-md p-2 text-[11px] text-slate-200 truncate">
                    {afterPhoto.caption}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setActivePhotoModal(afterPhoto.url)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  aria-label="Enlarge after photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mx-auto text-[oklch(0.65_0.01_260)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="font-mono text-xs text-[oklch(0.65_0.01_260)] font-semibold">
                  No After Photo Yet
                </p>
                <p className="text-[10px] text-[oklch(0.65_0.01_260/0.7)]">
                  Uploaded upon repair completion
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid: Issues, Services, Parts, Costs, Warranty */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
        {/* Reported Issues & Services */}
        <div className="space-y-3 rounded-xl bg-[oklch(0.14_0.005_260/0.6)] p-4 border border-[oklch(0.28_0.008_260/0.4)]">
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] font-bold mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[oklch(0.65_0.19_35)]" />
              Reported Issues
            </h5>
            {record.reportedIssues && record.reportedIssues.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {record.reportedIssues.map((issue, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-md bg-[oklch(0.22_0.006_260)] text-[oklch(0.96_0.005_260)] border border-[oklch(0.28_0.008_260/0.6)]"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[oklch(0.65_0.01_260)]">Standard diagnostic service</p>
            )}
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] font-bold mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              Services Performed
            </h5>
            {record.servicesPerformed && record.servicesPerformed.length > 0 ? (
              <ul className="space-y-1">
                {record.servicesPerformed.map((srv, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[oklch(0.96_0.005_260)] flex items-start gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[oklch(0.65_0.01_260)]">General service and maintenance</p>
            )}
          </div>
        </div>

        {/* Replaced Parts */}
        <div className="rounded-xl bg-[oklch(0.14_0.005_260/0.6)] p-4 border border-[oklch(0.28_0.008_260/0.4)] flex flex-col justify-between">
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] font-bold mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Replaced Parts ({record.replacedParts?.length || 0})
            </h5>
            {record.replacedParts && record.replacedParts.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {record.replacedParts.map((part, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-[oklch(0.28_0.008_260/0.3)] last:border-b-0"
                  >
                    <span className="text-[oklch(0.96_0.005_260)] font-medium truncate">
                      {part.name}
                    </span>
                    <span className="font-mono text-[oklch(0.78_0.16_75)] font-bold ml-2">
                      ${Number(part.cost).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[oklch(0.65_0.01_260)]">
                No parts replaced. Service/labor only.
              </p>
            )}
          </div>

          {record.technician?.name && (
            <div className="mt-3 pt-2 border-t border-[oklch(0.28_0.008_260/0.3)] text-[11px] text-[oklch(0.65_0.01_260)]">
              Certified Technician: <span className="text-white font-bold">{record.technician.name}</span>
            </div>
          )}
        </div>

        {/* Total Cost & Warranty */}
        <div className="rounded-xl bg-gradient-to-br from-[oklch(0.18_0.006_260)] to-[oklch(0.14_0.005_260)] p-4 border border-[oklch(0.28_0.008_260/0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] font-bold">
                Total Repair Cost
              </span>
              <DollarSign className="w-4 h-4 text-[oklch(0.65_0.19_35)]" />
            </div>
            <div className="font-display font-black text-3xl text-[oklch(0.96_0.005_260)] mb-3">
              ${Number(record.totalCost || 0).toFixed(2)}
            </div>
          </div>

          <div className="rounded-lg bg-[oklch(0.65_0.19_35/0.1)] border border-[oklch(0.65_0.19_35/0.25)] p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[oklch(0.78_0.16_75)]">
              <ShieldCheck className="w-4 h-4 text-[oklch(0.65_0.19_35)]" />
              <span>
                {record.warranty?.periodMonths
                  ? `${record.warranty.periodMonths}-Month Warranty`
                  : 'Warranty Protected'}
              </span>
            </div>
            {warrantyExpiryFormatted && (
              <p className="font-mono text-[10px] text-[oklch(0.65_0.01_260)]">
                Expires on: {warrantyExpiryFormatted}
              </p>
            )}
            {record.warranty?.policy && (
              <p className="text-[10px] text-[oklch(0.65_0.01_260/0.8)] truncate">
                {record.warranty.policy}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for inspection */}
      <AnimatePresence>
        {activePhotoModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activePhotoModal}
                alt="Enlarged visual inspection"
                className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl border border-white/10"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
