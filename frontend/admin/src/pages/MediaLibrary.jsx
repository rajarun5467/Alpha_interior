import { useEffect, useState, useRef } from 'react';
import API from '../api/client.js';
import { useToast, Toast } from '../components/CrudComponents.jsx';
import { Trash2, RefreshCw, Upload, Copy, Check, Image as ImageIcon, Cloud, HardDrive } from 'lucide-react';

export default function MediaLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState('');
  const { toast, showToast } = useToast();
  const fileRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/media');
      setImages(res.data.images || []);
    } catch (e) {
      showToast('Failed to load media', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const del = async (url) => {
    if (!confirm('Delete this image permanently? Items using it will show a broken image.')) return;
    try {
      await API.delete('/admin/media', { data: { url } });
      setImages((prev) => prev.filter((i) => i.url !== url));
      showToast('Image deleted');
    } catch (e) {
      showToast(e.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 1500);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      await API.post('/admin/upload', formData);
      showToast('Uploaded successfully');
      await load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Upload failed', 'error');
    }
    setUploading(false);
    e.target.value = '';
  };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-navy text-gold p-2.5 rounded-lg"><ImageIcon size={22} /></div>
          <div>
            <h1 className="text-2xl font-bold text-navy">Media Library</h1>
            <p className="text-sm text-slate-500">{images.length} images — view, copy URL, upload or delete.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-light disabled:opacity-50">
            <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button onClick={load} className="flex items-center gap-2 bg-white text-slate-600 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 mt-20">Loading...</div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-slate-400">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet. Upload one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.url} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative h-40 bg-slate-100">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="52%" font-size="11" text-anchor="middle" fill="%2394a3b8">Broken</text></svg>'; }} />
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${img.source === 'cloudinary' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white'}`}>
                    {img.source === 'cloudinary' ? <Cloud size={10} /> : <HardDrive size={10} />}
                    {img.source === 'cloudinary' ? 'Cloud' : 'Local'}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-500 truncate mb-1" title={img.name}>{img.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{formatSize(img.size)}</span>
                  <div className="flex gap-1">
                    <button onClick={() => copyUrl(img.url)} title="Copy URL"
                      className="p-1.5 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors">
                      {copied === img.url ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <button onClick={() => del(img.url)} title="Delete"
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Toast toast={toast} />
    </div>
  );
}
