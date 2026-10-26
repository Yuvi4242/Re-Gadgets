import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  DollarSign,
  Layers,
  Wrench,
  Tag,
  Info,
} from 'lucide-react';
import {
  createOrUpdateRepairRecord,
  uploadRepairPhoto,
  getRepairRecordByBooking,
} from '../../services/repairRecordService';

interface Props {
  bookingId: string;
  deviceModel: string;
  deviceType?: string;
  initialIssue?: string;
  onSaved?: (record: any) => void;
}

export default function RepairRecordForm({
  bookingId,
  deviceModel,
  deviceType = 'Gadget',
  initialIssue = '',
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  // Form State
  const [recordId, setRecordId] = useState<string | null>(null);
  const [reportedIssues, setReportedIssues] = useState<string[]>(
    initialIssue ? [initialIssue] : []
  );
  const [newIssueInput, setNewIssueInput] = useState('');
  const [servicesPerformed, setServicesPerformed] = useState<string[]>([]);
  const [newServiceInput, setNewServiceInput] = useState('');
  const [replacedParts, setReplacedParts] = useState<{ name: string; cost: number }[]>([]);
  const [newPartName, setNewPartName] = useState('');
  const [newPartCost, setNewPartCost] = useState('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [manualCostOverride, setManualCostOverride] = useState(false);
  const [warrantyMonths, setWarrantyMonths] = useState(3);
  const [warrantyPolicy, setWarrantyPolicy] = useState(
    '90-day coverage on replacement parts and labor'
  );
  const [status, setStatus] = useState<'in_progress' | 'completed' | 'verified'>('in_progress');
  const [notes, setNotes] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  // Photos
  const [beforePhoto, setBeforePhoto] = useState<any>(null);
  const [afterPhoto, setAfterPhoto] = useState<any>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);

  // Load existing record for this booking if exists
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getRepairRecordByBooking(bookingId)
      .then((record) => {
        if (!isMounted || !record) return;
        setRecordId(record._id);
        if (record.reportedIssues?.length) setReportedIssues(record.reportedIssues);
        if (record.servicesPerformed?.length) setServicesPerformed(record.servicesPerformed);
        if (record.replacedParts?.length) setReplacedParts(record.replacedParts);
        if (typeof record.totalCost === 'number') {
          setTotalCost(record.totalCost);
          setManualCostOverride(true);
        }
        if (record.warranty?.periodMonths) setWarrantyMonths(record.warranty.periodMonths);
        if (record.warranty?.policy) setWarrantyPolicy(record.warranty.policy);
        if (record.status) setStatus(record.status);
        if (record.notes) setNotes(record.notes);
        if (record.serialNumber) setSerialNumber(record.serialNumber);

        const bPhoto = record.photos?.find((p: any) => p.type === 'before');
        const aPhoto = record.photos?.find((p: any) => p.type === 'after');
        if (bPhoto) {
          setBeforePhoto(bPhoto);
          setBeforePreview(bPhoto.url);
        }
        if (aPhoto) {
          setAfterPhoto(aPhoto);
          setAfterPreview(aPhoto.url);
        }
      })
      .catch(() => {
        // No existing record yet, starting fresh
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  // Recalculate total cost when parts change unless manually overridden
  useEffect(() => {
    if (!manualCostOverride) {
      const partsSum = replacedParts.reduce((sum, p) => sum + Number(p.cost || 0), 0);
      setTotalCost(partsSum);
    }
  }, [replacedParts, manualCostOverride]);

  const handleAddIssue = () => {
    if (!newIssueInput.trim()) return;
    setReportedIssues([...reportedIssues, newIssueInput.trim()]);
    setNewIssueInput('');
  };

  const handleRemoveIssue = (idx: number) => {
    setReportedIssues(reportedIssues.filter((_, i) => i !== idx));
  };

  const handleAddService = () => {
    if (!newServiceInput.trim()) return;
    setServicesPerformed([...servicesPerformed, newServiceInput.trim()]);
    setNewServiceInput('');
  };

  const handleRemoveService = (idx: number) => {
    setServicesPerformed(servicesPerformed.filter((_, i) => i !== idx));
  };

  const handleAddPart = () => {
    const cost = parseFloat(newPartCost);
    if (!newPartName.trim() || isNaN(cost) || cost < 0) return;
    setReplacedParts([...replacedParts, { name: newPartName.trim(), cost }]);
    setNewPartName('');
    setNewPartCost('');
  };

  const handleRemovePart = (idx: number) => {
    setReplacedParts(replacedParts.filter((_, i) => i !== idx));
  };

  const handleSaveRecord = async () => {
    setSaving(true);
    setFeedback(null);

    try {
      const payload = {
        bookingId,
        deviceModel,
        deviceType,
        serialNumber,
        reportedIssues,
        servicesPerformed,
        replacedParts,
        totalCost,
        warranty: {
          periodMonths: warrantyMonths,
          policy: warrantyPolicy,
        },
        status,
        notes,
      };

      const res = await createOrUpdateRepairRecord(payload);
      if (res.record?._id) {
        setRecordId(res.record._id);
      }
      setFeedback({ type: 'success', message: 'Repair record saved successfully!' });
      if (onSaved) onSaved(res.record);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || err.message || 'Failed to save repair record',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPhoto = async (type: 'before' | 'after', file: File) => {
    setFeedback(null);

    // Validation guard: If type is after and no before photo exists yet
    if (type === 'after' && !beforePhoto) {
      setFeedback({
        type: 'error',
        message: 'A "Before Photo" must be uploaded first before an "After Photo" can be added.',
      });
      return;
    }

    if (type === 'before') setUploadingBefore(true);
    else setUploadingAfter(true);

    try {
      // First ensure the record exists in database
      let currentRecordId = recordId;
      if (!currentRecordId) {
        const payload = {
          bookingId,
          deviceModel,
          deviceType,
          serialNumber,
          reportedIssues,
          servicesPerformed,
          replacedParts,
          totalCost,
          warranty: { periodMonths: warrantyMonths, policy: warrantyPolicy },
          status,
          notes,
        };
        const res = await createOrUpdateRepairRecord(payload);
        currentRecordId = res.record._id;
        setRecordId(currentRecordId);
      }

      const uploadRes = await uploadRepairPhoto(currentRecordId, {
        file,
        type,
        caption: `${type === 'before' ? 'Initial' : 'Completed'} device condition`,
      });

      if (type === 'before') {
        setBeforePhoto(uploadRes.photo);
        setBeforePreview(uploadRes.photo.url);
      } else {
        setAfterPhoto(uploadRes.photo);
        setAfterPreview(uploadRes.photo.url);
        setStatus('completed');
      }

      setFeedback({
        type: 'success',
        message: `${type === 'before' ? 'Before' : 'After'} photo uploaded successfully!`,
      });
      if (onSaved) onSaved(uploadRes.record);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || err.message || 'Failed to upload photo',
      });
    } finally {
      if (type === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="font-mono text-xs text-slate-400 uppercase">Loading repair record...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* BEFORE AND AFTER PHOTO UPLOADERS */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-sm text-white">Before & After Photo Documentation</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Accepts JPG, PNG, WebP (Max 5MB)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before Photo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Step 1: Before Repair Photo</span>
              {beforePhoto && (
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                </span>
              )}
            </label>

            <div className="relative rounded-xl border-2 border-dashed border-white/10 hover:border-cyan-500/50 transition-colors bg-white/5 aspect-[4/3] flex flex-col items-center justify-center overflow-hidden">
              {beforePreview ? (
                <>
                  <img
                    src={beforePreview}
                    alt="Before Repair Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500/80 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    Before
                  </div>
                  <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Replace
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadPhoto('before', file);
                      }}
                      disabled={uploadingBefore}
                    />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full h-full text-center">
                  {uploadingBefore ? (
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-white">Upload Before Photo</span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Capture device condition prior to disassembly
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadPhoto('before', file);
                    }}
                    disabled={uploadingBefore}
                  />
                </label>
              )}
            </div>
          </div>

          {/* After Photo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Step 2: After Repair Photo</span>
              {afterPhoto && (
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                </span>
              )}
            </label>

            <div
              className={`relative rounded-xl border-2 border-dashed transition-colors aspect-[4/3] flex flex-col items-center justify-center overflow-hidden ${
                !beforePhoto
                  ? 'border-white/5 bg-white/[0.02] opacity-60 cursor-not-allowed'
                  : 'border-white/10 hover:border-emerald-500/50 bg-white/5'
              }`}
            >
              {!beforePhoto ? (
                <div className="text-center p-6 space-y-2">
                  <Info className="w-8 h-8 text-amber-400/80 mx-auto" />
                  <p className="text-xs font-bold text-slate-300">Requires Before Photo</p>
                  <p className="text-[10px] text-slate-400 max-w-[200px]">
                    Upload a "Before Photo" first to unlock after repair photo upload.
                  </p>
                </div>
              ) : afterPreview ? (
                <>
                  <img
                    src={afterPreview}
                    alt="After Repair Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-500/80 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    After
                  </div>
                  <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Replace
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadPhoto('after', file);
                      }}
                      disabled={uploadingAfter}
                    />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full h-full text-center">
                  {uploadingAfter ? (
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="text-xs font-bold text-white">Upload After Photo</span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Capture repaired device in working condition
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadPhoto('after', file);
                    }}
                    disabled={uploadingAfter}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REPORTED ISSUES & SERVICES PERFORMED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reported Issues */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            Reported Issues
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Cracked screen, battery drain"
              value={newIssueInput}
              onChange={(e) => setNewIssueInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddIssue();
                }
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAddIssue}
              className="px-3 py-2 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl text-xs hover:bg-cyan-500/30 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {reportedIssues.map((issue, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
              >
                <span>{issue}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIssue(idx)}
                  className="text-slate-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Services Performed */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            Services Performed
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Screen replacement, thermal paste renewal"
              value={newServiceInput}
              onChange={(e) => setNewServiceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddService();
                }
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAddService}
              className="px-3 py-2 bg-cyan-500/20 text-cyan-400 font-bold rounded-xl text-xs hover:bg-cyan-500/30 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {servicesPerformed.map((srv, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
              >
                <span>{srv}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(idx)}
                  className="text-slate-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* REPLACED PARTS (Name, Cost) */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
        <label className="text-xs font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Replaced Parts & Component Costs
          </span>
          <span className="text-[11px] font-mono text-cyan-400">
            Parts Total: $
            {replacedParts.reduce((acc, p) => acc + Number(p.cost || 0), 0).toFixed(2)}
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            placeholder="Part description (e.g. OLED Display Assembly)"
            value={newPartName}
            onChange={(e) => setNewPartName(e.target.value)}
            className="sm:col-span-7 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Cost ($)"
            value={newPartCost}
            onChange={(e) => setNewPartCost(e.target.value)}
            className="sm:col-span-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 font-mono"
          />
          <button
            type="button"
            onClick={handleAddPart}
            className="sm:col-span-2 px-3 py-2 bg-amber-500/20 text-amber-400 font-bold rounded-xl text-xs hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Part
          </button>
        </div>

        {replacedParts.length > 0 && (
          <div className="divide-y divide-white/5 max-h-36 overflow-y-auto pt-1">
            {replacedParts.map((part, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 text-xs">
                <span className="text-slate-200">{part.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-400 font-bold">
                    ${Number(part.cost).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePart(idx)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COSTS, WARRANTY, STATUS & NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Cost */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
          <label className="text-xs font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Total Repair Cost
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={totalCost}
              onChange={(e) => {
                setManualCostOverride(true);
                setTotalCost(parseFloat(e.target.value) || 0);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-7 pr-3 py-2 text-sm text-white font-mono font-bold focus:border-cyan-500 outline-none"
            />
          </div>
          <p className="text-[10px] text-slate-500">Includes labor, diagnostics & parts</p>
        </div>

        {/* Warranty Duration */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
          <label className="text-xs font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Warranty Period
          </label>
          <select
            value={warrantyMonths}
            onChange={(e) => setWarrantyMonths(parseInt(e.target.value, 10))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
          >
            <option value={1} className="bg-slate-900">30 Days (1 Month)</option>
            <option value={3} className="bg-slate-900">90 Days (3 Months)</option>
            <option value={6} className="bg-slate-900">180 Days (6 Months)</option>
            <option value={12} className="bg-slate-900">365 Days (1 Year)</option>
          </select>
          <input
            type="text"
            value={warrantyPolicy}
            onChange={(e) => setWarrantyPolicy(e.target.value)}
            placeholder="Warranty policy note"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-slate-300 outline-none"
          />
        </div>

        {/* Status & Serial */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
          <label className="text-xs font-bold text-white">Repair Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
          >
            <option value="in_progress" className="bg-slate-900">In Progress</option>
            <option value="completed" className="bg-slate-900">Completed</option>
            <option value="verified" className="bg-slate-900">Quality Verified</option>
          </select>
          <input
            type="text"
            placeholder="Device S/N / IMEI (Optional)"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-slate-300 outline-none font-mono"
          />
        </div>
      </div>

      {/* Technician Notes */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
        <label className="text-xs font-bold text-white">Technician Internal Notes & Findings</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Detailed diagnostic results, disassembly findings, or customer recommendations..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSaveRecord}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Record...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Repair Service Record
            </>
          )}
        </button>
      </div>
    </div>
  );
}
