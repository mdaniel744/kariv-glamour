import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyDealerListing, createDealerListing, updateDealerListing } from '@/actions/products';
import { useLanguage } from '@/lib/languageContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, X } from 'lucide-react';
import { BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES } from '@/lib/constants';
import ImageUploader from '@/components/shared/ImageUploader';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';
import { getBrandCollectionsByName } from '@/lib/brandCollectionRegistry';

export default function PortalListingForm({ id: providedId }) {
  const id = providedId || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).at(-1) : null);
  const router = useRouter();
  const { locale, localePath } = useLanguage();
  const { toast } = useToast();
  const isEdit = id && id !== 'new';

  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    productTitle: '', brand: '', collection: '', model: '', referenceNumber: '', condition: 'Excellent',
    yearOfProduction: '', gender: 'Men', caseDiameter: '', caseMaterial: 'Stainless Steel',
    braceletMaterial: '', dialColor: 'Black', watchShape: 'Round', movementType: 'Automatic',
    functions: '', waterResistance: '', crystalType: '', powerReserve: '',
    boxIncluded: false, papersIncluded: false, warrantyType: '', warrantyDuration: '',
    productDescription: '', shortDescription: '',
    price: '', salePrice: '', currency: 'EUR', availability: 'In Stock',
    sku: '', productImages: [], featuredImage: '',
    shippingInfo: 'Insured worldwide shipping included', returnEligibility: true,
    authenticationStatus: 'Pending'
  });
  const collectionOptions = getBrandCollectionsByName(product.brand);

  useEffect(() => {
    if (isEdit) {
      getMyDealerListing(id).then((p) => {
        if (p) setProduct({
          ...p,
          productTitle: p.productTitle_en || p.productTitle,
          shortDescription: p.shortDescription_en || p.shortDescription,
          productDescription: p.productDescription_en || p.productDescription,
        });
      }).catch(console.error);
    }
  }, [id]);

  const handleImageUploaded = (url) => {
    if (!url) return;
    setProduct(prev => ({
      ...prev,
      productImages: [...prev.productImages, url],
      featuredImage: prev.featuredImage || url,
    }));
  };

  const removeImage = (idx) => {
    setProduct(prev => {
      const images = prev.productImages.filter((_, i) => i !== idx);
      return { ...prev, productImages: images, featuredImage: images[0] || '' };
    });
  };

  const handleSave = async () => {
    if (!product.productTitle || !product.brand || !product.collection || !product.price) {
      toast({ title: 'Please fill in title, brand, collection, and price', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const { authenticationStatus: _authenticationStatus, ...rest } = product;
      const payload = {
        ...rest,
        sourceLocale: 'en',
        productTitle_en: product.productTitle,
        shortDescription_en: product.shortDescription,
        productDescription_en: product.productDescription,
        price: Number(product.price),
        salePrice: product.salePrice ? Number(product.salePrice) : undefined,
        yearOfProduction: product.yearOfProduction ? Number(product.yearOfProduction) : undefined,
      };
      const result = isEdit
        ? await updateDealerListing(id, payload)
        : await createDealerListing(payload);
      toast({
        title: isEdit ? 'Listing updated!' : 'Listing created!',
        description: result.translationWarning,
      });
      router.push(localePath('/portal/listings'));
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const inputClass = "w-full bg-card border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";
  const labelClass = "text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block";
  const handleBrandChange = (brand) => {
    const validCollections = getBrandCollectionsByName(brand);
    setProduct((current) => ({
      ...current,
      brand,
      collection: validCollections.some((collection) => collection.name === current.collection)
        ? current.collection
        : '',
    }));
  };

  return (
    <div className="max-w-2xl">
      <button onClick={() => router.push(localePath('/portal/listings'))} className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={10} /> Back to Listings
      </button>
      <h1 className="text-xl font-display text-foreground font-light mb-6">{isEdit ? 'Edit Listing' : 'List a New Watch'}</h1>

      {/* Images */}
      <div className="mb-6">
        <label className={labelClass}>Photos</label>
        <div className="flex flex-wrap gap-3">
          {product.productImages.map((img, i) => (
            <div key={i} className="relative w-24 h-24 group">
              <MediaImage src={getMediaVariant(img, 'thumb')} alt={`Product photo ${i + 1}`} fill sizes="96px" quality={76} className="object-cover" />
              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center"><X size={12} /></button>
            </div>
          ))}
          <ImageUploader
            purpose="product"
            value=""
            onChange={handleImageUploaded}
            label="Add photo"
            previewClassName="w-24 h-24 object-cover"
            dropzoneClassName="w-24 h-24 !py-0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div><label className={labelClass}>Watch Title *</label><input value={product.productTitle} onChange={e => setProduct({...product, productTitle: e.target.value})} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Brand *</label>
            <select value={product.brand} onChange={(e) => handleBrandChange(e.target.value)} className={inputClass}>
              <option value="">Select brand</option>
              {BRAND_DATA.map(b => <option key={b.slug} value={b.name}>{b.name}</option>)}
            </select>
          </div>
          <div><label className={labelClass}>Model</label><input value={product.model} onChange={e => setProduct({...product, model: e.target.value})} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>Collection *</label>
          <select value={product.collection || ''} onChange={(e) => setProduct({...product, collection: e.target.value})} disabled={!product.brand} className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}>
            <option value="">{product.brand ? 'Select collection' : 'Select a brand first'}</option>
            {collectionOptions.map((collection) => <option key={collection.slug || collection.name} value={collection.name}>{collection.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Reference Number</label><input value={product.referenceNumber} onChange={e => setProduct({...product, referenceNumber: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>Year of Production</label><input type="number" value={product.yearOfProduction} onChange={e => setProduct({...product, yearOfProduction: e.target.value})} className={inputClass} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Condition</label>
            <select value={product.condition} onChange={e => setProduct({...product, condition: e.target.value})} className={inputClass}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass}>Gender</label>
            <select value={product.gender} onChange={e => setProduct({...product, gender: e.target.value})} className={inputClass}>
              {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Case Diameter</label><input value={product.caseDiameter} onChange={e => setProduct({...product, caseDiameter: e.target.value})} placeholder="e.g. 40mm" className={inputClass} /></div>
          <div><label className={labelClass}>Case Material</label>
            <select value={product.caseMaterial} onChange={e => setProduct({...product, caseMaterial: e.target.value})} className={inputClass}>
              {CASE_MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Dial Color</label>
            <select value={product.dialColor} onChange={e => setProduct({...product, dialColor: e.target.value})} className={inputClass}>
              {DIAL_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass}>Movement Type</label>
            <select value={product.movementType} onChange={e => setProduct({...product, movementType: e.target.value})} className={inputClass}>
              {MOVEMENT_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelClass}>Price (EUR) *</label><input type="number" value={product.price} onChange={e => setProduct({...product, price: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>Sale Price (optional)</label><input type="number" value={product.salePrice} onChange={e => setProduct({...product, salePrice: e.target.value})} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>Short Description</label><input value={product.shortDescription} onChange={e => setProduct({...product, shortDescription: e.target.value})} className={inputClass} /></div>
        <div><label className={labelClass}>Full Description</label><textarea value={product.productDescription} onChange={e => setProduct({...product, productDescription: e.target.value})} rows={4} className={inputClass} /></div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs text-foreground"><input type="checkbox" checked={product.boxIncluded} onChange={e => setProduct({...product, boxIncluded: e.target.checked})} /> Box Included</label>
          <label className="flex items-center gap-2 text-xs text-foreground"><input type="checkbox" checked={product.papersIncluded} onChange={e => setProduct({...product, papersIncluded: e.target.checked})} /> Papers Included</label>
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-50">
          <Save size={14} /> {saving ? 'Saving...' : isEdit ? 'Update Listing' : 'Create Listing'}
        </button>
      </div>
    </div>
  );
}
