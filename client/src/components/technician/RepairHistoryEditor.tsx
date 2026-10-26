import React, { useEffect, useState } from 'react';
import { Camera, ImagePlus, Save, Trash2, Loader2 } from 'lucide-react';
import { saveRepairHistory } from '../../services/orderService';

type Photo = { name: string; url: string; file: File };

export default function RepairHistoryEditor({ job, onSave }: { job: any; onSave: (record: any) => void }) {
  const [before, setBefore] = useState<Photo[]>([]);
  const [after, setAfter] = useState<Photo[]>([]);
  const [issue, setIssue] = useState(job.issue || '');
  const [services, setServices] = useState('');
  const [parts, setParts] = useState('');
  const [cost, setCost] = useState('');
  const [warranty, setWarranty] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => () => {
    [...before, ...after].forEach(photo => URL.revokeObjectURL(photo.url));
  }, [before, after]);

  const addPhotos = (files: FileList | null, type: 'before' | 'after') => {
    if (!files) return;
    const photos = Array.from(files).filter(file => file.type.startsWith('image/')).map(file => ({
      name: file.name, file, url: URL.createObjectURL(file)
    }));
    (type === 'before' ? setBefore : setAfter)(current => [...current, ...photos]);
    setMessage('');
  };

  const removePhoto = (type: 'before' | 'after', index: number) => {
    const setter = type === 'before' ? setBefore : setAfter;
    setter(current => {
      const photo = current[index];
      if (photo) URL.revokeObjectURL(photo.url);
      return current.filter((_, i) => i !== index);
    });
  };

  const compressPhoto = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read selected image'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Selected file is not a valid image'));
      img.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Image compression is not supported in this browser'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });

  const handleSave = async () => {
    if (saving) return;
    if (!before.length || !after.length) {
      setMessage('Add at least one before photo and one after photo.');
      return;
    }
    if (before.length > 6 || after.length > 6) {
      setMessage('Please add no more than 6 photos for each stage.');
      return;
    }
    const orderId = job?._id || job?.id || job?.orderId;
    if (!orderId) {
      setMessage('Could not identify the repair booking. Reopen this job and try again.');
      return;
    }
    try {
      setSaving(true);
      setMessage('');
      const [beforePhotos, afterPhotos] = await Promise.all([
        Promise.all(before.map(p => compressPhoto(p.file))),
        Promise.all(after.map(p => compressPhoto(p.file))),
      ]);
      await saveRepairHistory(orderId, {
        issue, servicesPerformed: services, replacedParts: parts,
        repairCost: cost === '' ? null : Number(cost), warranty, beforePhotos, afterPhotos
      });
      setMessage('Repair record saved successfully.');
      onSave({ issue, servicesPerformed: services, replacedParts: parts, repairCost: cost === '' ? null : Number(cost), warranty, beforePhotos, afterPhotos });
    } catch (error: any) {
      setMessage(error?.response?.data?.message || error?.message || 'Unable to save repair history.');
    } finally {
      setSaving(false);
    }
  };

  const photoGroup = (type: 'before' | 'after', title: string, photos: Photo[]) => (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-slate-200">{title}</span>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20">
          <ImagePlus className="h-4 w-4" /> Add photos
          <input type="file" accept="image/*" multiple capture="environment" className="hidden" onChange={event => { addPhotos(event.target.files, type); event.currentTarget.value = ''; }} />
        </label>
      </div>
      {!photos.length ? <div className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-dashed border-white/15 text-slate-500"><Camera className="mb-2 h-6 w-6" /><span className="text-xs">No photos added</span></div> :
        <div className="grid grid-cols-2 gap-2">{photos.map((photo, index) => <div key={photo.url} className="relative aspect-square overflow-hidden rounded-lg border border-white/10"><img src={photo.url} alt={photo.name} className="h-full w-full object-cover" /><button type="button" aria-label="Remove photo" onClick={() => removePhoto(type, index)} className="absolute right-1 top-1 rounded-md bg-black/75 p-1.5 text-white hover:bg-red-600"><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div>}
    </div>
  );

  const fieldClass = 'w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white outline-none focus:border-cyan-500';
  const labelClass = 'mb-1.5 block text-xs font-bold text-slate-400';

  return <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
    <div><h3 className="flex items-center gap-2 font-bold text-white"><Camera className="h-4 w-4 text-cyan-400" /> Repair history & condition photos</h3><p className="mt-1 text-xs text-slate-400">Capture the device before work starts and after the repair is complete.</p></div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{photoGroup('before', 'Before repair', before)}{photoGroup('after', 'After repair', after)}</div>
    <div><label className={labelClass}>Reported issue</label><textarea value={issue} onChange={e => setIssue(e.target.value)} className={fieldClass} rows={2} placeholder="Describe the reported problem" /></div>
    <div><label className={labelClass}>Services performed</label><textarea value={services} onChange={e => setServices(e.target.value)} className={fieldClass} rows={2} placeholder="Diagnostics, repair work, final testing..." /></div>
    <div><label className={labelClass}>Replaced parts</label><textarea value={parts} onChange={e => setParts(e.target.value)} className={fieldClass} rows={2} placeholder="Part name and quantity" /></div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div><label className={labelClass}>Total repair cost (₹)</label><input type="number" min="0" value={cost} onChange={e => setCost(e.target.value)} className={fieldClass} placeholder="0.00" /></div><div><label className={labelClass}>Warranty</label><input value={warranty} onChange={e => setWarranty(e.target.value)} className={fieldClass} placeholder="e.g. 90 days" /></div></div>
    <button type="button" disabled={saving} onClick={handleSave} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-bold text-black hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? 'Saving repair record…' : 'Save repair record'}</button>
    {message && <p className="text-xs leading-relaxed text-emerald-300">{message}</p>}
  </section>;
}
