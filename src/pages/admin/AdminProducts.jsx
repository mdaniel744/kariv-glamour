import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslation } from 'react-i18next';
import { formatPrice, BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES, WATCH_SHAPES } from '@/lib/constants';
import { Plus, Pencil, Trash2, X, Save, Upload, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BilingualField from '@/components/admin/BilingualField';
import ProductCategorySidebar from '@/components/admin/ProductCategorySidebar';

export default function AdminProducts() {
  const { t } = useTranslation('admin');
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Products.list('-created_date', 200);
      setProducts(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadProducts(); }, []);

  const openNew = () => {
    setForm({ brand: '', collection: '', model: '', referenceNumber: '', price: '', condition: 'Excellent', gender: 'Men', caseDiameter: '', caseMaterial: '', dialColor: '', braceletMaterial: '', movementType: '', yearOfProduction: '', availability: 'In Stock', featured: false, isNewArrival: false, isCertifiedPreOwned: false, isVintage: false, authenticationStatus: 'Pending', boxIncluded: false, papersIncluded: false, productTitle_de: '', productTitle_en: '', shortDescription_de: '', shortDescription_en: '', productDescription_de: '', productDescription_en: '' });
    setEditing('new');
  };

  const openEdit = (product) => {
    setForm({ ...product });
    setEditing(product.id);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        yearOfProduction: Number(form.yearOfProduction) || undefined,
        productTitle: form.productTitle_de || form.productTitle_en || form.productTitle || '',
        shortDescription: form.shortDescription_de || form.shortDescription_en || form.shortDescription || '',
        productDescription: form.productDescription_de || form.productDescription_en || form.productDescription || '',
        slug: (form.productTitle_de || form.productTitle || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
      if (editing === 'new') {
        await base44.entities.Products.create(payload);
        toast({ title: t('productCreated') });
      } else {
        await base44.entities.Products.update(editing, payload);
        toast({ title: t('productUpdated') });
      }
      setEditing(null);
      loadProducts();
    } catch (e) {
      toast({ title: t('error'), description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('deleteConfirmProduct'))) return;
    try {
      await base44.entities.Products.delete(id);
      toast({ title: t('productDeleted') });
      loadProducts();
    } catch (e) {
      toast({ title: t('error'), description: e.message, variant: "destructive" });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(prev => ({ ...prev, featuredImage: file_url, productImages: [...(prev.productImages || []), file_url] }));
    } catch (e) {
      toast({ title: t('uploadFailed'), variant: "destructive" });
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
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{editing === 'new' ? t('addProduct') : t('editProduct')}</h1>
          <button onClick={() => setEditing(null)} className="text-[#8E8E93] hover:text-[#E5E5E5]"><X size={18} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Field label={t('fields.brand')} name="brand" type="select" options={BRAND_DATA.map(b => b.name)} />
          <Field label={t('fields.collection')} name="collection" />
          <Field label={t('fields.model')} name="model" />
          <Field label={t('fields.referenceNumber')} name="referenceNumber" />
          <Field label={t('fields.price')} name="price" type="number" />
          <Field label={t('fields.condition')} name="condition" type="select" options={CONDITIONS} />
          <Field label={t('fields.gender')} name="gender" type="select" options={GENDERS} />
          <Field label={t('fields.year')} name="yearOfProduction" type="number" />
          <Field label={t('fields.caseDiameter')} name="caseDiameter" placeholder="e.g. 41mm" />
          <Field label={t('fields.caseMaterial')} name="caseMaterial" type="select" options={CASE_MATERIALS} />
          <Field label={t('fields.dialColor')} name="dialColor" type="select" options={DIAL_COLORS} />
          <Field label={t('fields.braceletMaterial')} name="braceletMaterial" />
          <Field label={t('fields.movementType')} name="movementType" type="select" options={MOVEMENT_TYPES} />
          <Field label={t('fields.watchShape')} name="watchShape" type="select" options={WATCH_SHAPES} />
          <Field label={t('fields.availability')} name="availability" type="select" options={['In Stock', 'Sold', 'Reserved', 'Coming Soon']} />
          <Field label={t('fields.authentication')} name="authenticationStatus" type="select" options={['Authenticated', 'Pending', 'Not Verified']} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <BilingualField label={t('fields.productTitle')} name="productTitle" form={form} setForm={setForm} />
          <BilingualField label={t('fields.shortDescription')} name="shortDescription" form={form} setForm={setForm} type="textarea" />
          <div className="md:col-span-2">
            <BilingualField label={t('fields.fullDescription')} name="productDescription" form={form} setForm={setForm} type="textarea" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mb-6">
          <Field label={t('fields.featured')} name="featured" type="checkbox" />
          <Field label={t('fields.newArrival')} name="isNewArrival" type="checkbox" />
          <Field label={t('fields.certifiedPreOwned')} name="isCertifiedPreOwned" type="checkbox" />
          <Field label={t('fields.vintage')} name="isVintage" type="checkbox" />
          <Field label={t('fields.boxIncluded')} name="boxIncluded" type="checkbox" />
          <Field label={t('fields.papersIncluded')} name="papersIncluded" type="checkbox" />
        </div>
        <div className="mb-6">
          <label className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] block mb-2">{t('fields.productImage')}</label>
          <div className="flex items-center gap-4">
            {form.featuredImage && (
              <img src={form.featuredImage} alt="" className="w-20 h-20 object-cover border border-white/10" />
            )}
            <label className="cursor-pointer flex items-center gap-2 border border-white/10 px-4 py-2 text-xs text-[#8E8E93] hover:border-[#C5A367] hover:text-[#C5A367] transition-colors">
              <Upload size={14} /> {t('uploadImage')}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-6 py-3 hover:bg-[#B8944F] transition-colors">
          <Save size={14} /> {t('saveProduct')}
        </button>
      </div>
    );
  }

  const filtered = products.filter(p => {
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (selectedCollection && (p.collection || '— Unclassified') !== selectedCollection) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (p.productTitle_de || p.productTitle || '').toLowerCase().includes(q) ||
             (p.referenceNumber || '').toLowerCase().includes(q) ||
             (p.model || '').toLowerCase().includes(q);
    }
    return true;
  });

  const handleSelectBrand = (brand) => { setSelectedBrand(brand); setSelectedCollection(null); };
  const handleSelectCollection = (brand, col) => { setSelectedBrand(brand); setSelectedCollection(col); };
  const handleSelectAll = () => { setSelectedBrand(null); setSelectedCollection(null); };

  const headerLabel = selectedCollection || selectedBrand || 'All Products';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{t('products')}</h1>
          {filtered.length !== products.length && (
            <p className="text-[10px] text-[#8E8E93] mt-0.5">{filtered.length} of {products.length} · {headerLabel}</p>
          )}
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2.5 hover:bg-[#B8944F] transition-colors">
          <Plus size={14} /> {t('addProduct')}
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-[#111] animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border border-white/5">
          <p className="text-[#8E8E93] text-sm mb-4">{t('noProducts')}</p>
          <button onClick={openNew} className="text-[#C5A367] text-xs">{t('addFirst')}</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <ProductCategorySidebar
            products={products}
            selectedBrand={selectedBrand}
            selectedCollection={selectedCollection}
            onSelectBrand={handleSelectBrand}
            onSelectCollection={handleSelectCollection}
            onSelectAll={handleSelectAll}
          />
          <div className="flex-1 min-w-0">
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, reference, or model..."
                className="w-full bg-[#111] border border-white/5 text-xs text-[#E5E5E5] pl-9 pr-3 py-2.5 outline-none focus:border-[#C5A367]"
              />
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-12 border border-white/5">
                <p className="text-[#8E8E93] text-sm">No products match this filter.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-[#111] border border-white/5 p-3">
                    <div className="w-12 h-12 bg-[#1A1A1A] flex-shrink-0 overflow-hidden">
                      {p.featuredImage && <img src={p.featuredImage} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#E5E5E5] truncate">{p.productTitle_de || p.productTitle}</p>
                      <p className="text-[10px] text-[#8E8E93]">{p.brand}{p.collection ? ` · ${p.collection}` : ''} · {p.condition} · {p.availability}</p>
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
        </div>
      )}
    </div>
  );
}