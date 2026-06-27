import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { formatPrice, BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES, WATCH_SHAPES } from '@/lib/constants';
import { Plus, Pencil, Trash2, X, Save, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Products.list('-created_date', 50);
      setProducts(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadProducts(); }, []);

  const openNew = () => {
    setForm({ productTitle: '', brand: '', collection: '', model: '', referenceNumber: '', price: '', condition: 'Excellent', gender: 'Men', caseDiameter: '', caseMaterial: '', dialColor: '', braceletMaterial: '', movementType: '', yearOfProduction: '', availability: 'In Stock', featured: false, isNewArrival: false, isCertifiedPreOwned: false, isVintage: false, productDescription: '', shortDescription: '', authenticationStatus: 'Pending', boxIncluded: false, papersIncluded: false });
    setEditing('new');
  };

  const openEdit = (product) => {
    setForm({ ...product });
    setEditing(product.id);
  };

  const handleSave = async () => {
    try {
      const payload = { ...form, price: Number(form.price) || 0, yearOfProduction: Number(form.yearOfProduction) || undefined, slug: (form.productTitle || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') };
      if (editing === 'new') {
        await base44.entities.Products.create(payload);
        toast({ title: "Product created" });
      } else {
        await base44.entities.Products.update(editing, payload);
        toast({ title: "Product updated" });
      }
      setEditing(null);
      loadProducts();
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await base44.entities.Products.delete(id);
      toast({ title: "Product deleted" });
      loadProducts();
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, featuredImage: file_url, productImages: [...(prev.productImages || []), file_url] }));
    } catch (e) {
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const Field = ({ label, name, type = 'text', options, ...props }) => (
    <div>
      <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-1">{label}</label>
      {type === 'select' ? (
        <select value={form[name] || ''} onChange={e => setForm({...form, [name]: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]">
          <option value="">—</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'checkbox' ? (
        <input type="checkbox" checked={!!form[name]} onChange={e => setForm({...form, [name]: e.target.checked})} className="accent-[#C5A367]" />
      ) : type === 'textarea' ? (
        <textarea value={form[name] || ''} onChange={e => setForm({...form, [name]: e.target.value})} rows={3} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367] resize-none" {...props} />
      ) : (
        <input type={type} value={form[name] || ''} onChange={e => setForm({...form, [name]: e.target.value})} className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]" {...props} />
      )}
    </div>
  );

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? 'Add Product' : 'Edit Product'}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93] hover:text-[#E5E5E5]"><X size={18} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Field label="Product Title" name="productTitle" required />
          <Field label="Brand" name="brand" type="select" options={BRAND_DATA.map(b => b.name)} />
          <Field label="Collection" name="collection" />
          <Field label="Model" name="model" />
          <Field label="Reference Number" name="referenceNumber" />
          <Field label="Price (EUR)" name="price" type="number" />
          <Field label="Condition" name="condition" type="select" options={CONDITIONS} />
          <Field label="Gender" name="gender" type="select" options={GENDERS} />
          <Field label="Year" name="yearOfProduction" type="number" />
          <Field label="Case Diameter" name="caseDiameter" placeholder="e.g. 41mm" />
          <Field label="Case Material" name="caseMaterial" type="select" options={CASE_MATERIALS} />
          <Field label="Dial Color" name="dialColor" type="select" options={DIAL_COLORS} />
          <Field label="Bracelet Material" name="braceletMaterial" />
          <Field label="Movement Type" name="movementType" type="select" options={MOVEMENT_TYPES} />
          <Field label="Watch Shape" name="watchShape" type="select" options={WATCH_SHAPES} />
          <Field label="Availability" name="availability" type="select" options={['In Stock', 'Sold', 'Reserved', 'Coming Soon']} />
          <Field label="Authentication" name="authenticationStatus" type="select" options={['Authenticated', 'Pending', 'Not Verified']} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Field label="Short Description" name="shortDescription" type="textarea" />
          <Field label="Full Description" name="productDescription" type="textarea" />
        </div>
        <div className="flex flex-wrap gap-6 mb-6">
          <Field label="Featured" name="featured" type="checkbox" />
          <Field label="New Arrival" name="isNewArrival" type="checkbox" />
          <Field label="Certified Pre-Owned" name="isCertifiedPreOwned" type="checkbox" />
          <Field label="Vintage" name="isVintage" type="checkbox" />
          <Field label="Box Included" name="boxIncluded" type="checkbox" />
          <Field label="Papers Included" name="papersIncluded" type="checkbox" />
        </div>
        {/* Image upload */}
        <div className="mb-6">
          <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-2">Product Image</label>
          <div className="flex items-center gap-4">
            {form.featuredImage && (
              <img src={form.featuredImage} alt="" className="w-20 h-20 object-cover border border-white/10" />
            )}
            <label className="cursor-pointer flex items-center gap-2 border border-white/10 px-4 py-2 text-xs text-[#8E8E93] hover:border-[#C5A367] hover:text-[#C5A367] transition-colors">
              <Upload size={14} /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3 hover:bg-[#B8944F] transition-colors">
          <Save size={14} /> Save Product
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">Products</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5 hover:bg-[#B8944F] transition-colors">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-[#111] animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border border-white/5">
          <p className="text-[#8E8E93] text-sm mb-4">No products yet.</p>
          <button onClick={openNew} className="text-[#C5A367] text-xs">Add your first product</button>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-4 bg-[#111] border border-white/5 p-3">
              <div className="w-12 h-12 bg-[#1A1A1A] flex-shrink-0 overflow-hidden">
                {p.featuredImage && <img src={p.featuredImage} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#E5E5E5] truncate">{p.productTitle}</p>
                <p className="text-[10px] text-[#8E8E93]">{p.brand} · {p.condition} · {p.availability}</p>
              </div>
              <span className="text-xs text-[#C5A367] font-medium">{formatPrice(p.price)}</span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="text-[#8E8E93] hover:text-[#C5A367]"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(p.id)} className="text-[#8E8E93] hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}