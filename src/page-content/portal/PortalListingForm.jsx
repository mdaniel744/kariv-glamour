import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Plus, Save, Trash2, X } from 'lucide-react';
import { createDealerListing, getDealerListingFormOptions, getMyDealerListing, updateDealerListing } from '@/actions/products';
import { useLanguage } from '@/lib/languageContext';
import { useToast } from '@/components/ui/use-toast';
import { BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES, WATCH_SHAPES } from '@/lib/constants';
import { dealerListingFromProduct, dealerListingPayload, emptyDealerListing, saveDealerListingBatch, validateDealerListing, WATCH_ATTRIBUTE_FIELDS } from '@/lib/dealerListingDraft';
import ImageUploader from '@/components/shared/ImageUploader';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';
import { getBrandCollectionsByName } from '@/lib/brandCollectionRegistry';

const MAX_BATCH = 12;
const EMPTY_OPTIONS = { brands: [], collections: [], categories: [], attributeDefs: [], attributePresets: [] };
const inputClass = 'min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60';
const labelClass = 'mb-1.5 block text-xs font-medium text-foreground';
const sectionClass = 'rounded-xl border border-border bg-card p-4 sm:p-6';

function Field({ label, children, className = '' }) {
  return <label className={'block min-w-0 ' + className}><span className={labelClass}>{label}</span>{children}</label>;
}

function SelectField({ label, value, options, onChange, placeholder = 'Select an option', disabled = false }) {
  return (
    <Field label={label}>
      <select value={value || ''} onChange={(event) => onChange(event.target.value)} disabled={disabled} className={inputClass}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const item = typeof option === 'string' ? { value: option, label: option } : option;
          return <option key={item.value} value={item.value}>{item.label}</option>;
        })}
      </select>
    </Field>
  );
}

export default function PortalListingForm({ id: providedId }) {
  const id = providedId || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).at(-1) : null);
  const isEdit = Boolean(id && id !== 'new');
  const router = useRouter();
  const { localePath } = useLanguage();
  const { toast } = useToast();
  const [drafts, setDrafts] = useState(() => [emptyDealerListing()]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [options, setOptions] = useState(EMPTY_OPTIONS);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [progress, setProgress] = useState('');
  const product = drafts[activeIndex] || drafts[0];

  useEffect(() => {
    let cancelled = false;
    getDealerListingFormOptions().then((result) => {
      if (!cancelled) setOptions(result);
    }).catch(() => {
      if (!cancelled) toast({ title: 'Attribute suggestions are unavailable', description: 'You can still enter details manually.', variant: 'destructive' });
    });
    if (isEdit) {
      getMyDealerListing(id).then((listing) => {
        if (!cancelled && listing) setDrafts([dealerListingFromProduct(listing)]);
      }).catch((error) => {
        if (!cancelled) toast({ title: 'Could not load listing', description: error.message, variant: 'destructive' });
      });
    }
    return () => { cancelled = true; };
  }, [id, isEdit]);

  const setProduct = (change) => setDrafts((current) => current.map((draft, index) => {
    if (index !== activeIndex) return draft;
    return typeof change === 'function' ? change(draft) : { ...draft, ...change };
  }));
  const setField = (key, value) => setProduct({ [key]: value });
  const brandOptions = [...new Set([...options.brands.map((brand) => brand.name), ...BRAND_DATA.map((brand) => brand.name)])];
  const selectedBrandId = options.brands.find((brand) => brand.name === product.brand)?.id;
  const liveCollections = options.collections.filter((collection) => collection.brand_id === selectedBrandId);
  const collectionOptions = liveCollections.length
    ? liveCollections.map((collection) => collection.name)
    : getBrandCollectionsByName(product.brand).map((collection) => collection.name);

  const changeBrand = (brand) => setProduct((current) => ({
    ...current, brand, collection: brand === current.brand ? current.collection : '',
  }));
  const addDraft = () => {
    if (drafts.length >= MAX_BATCH) return;
    setDrafts((current) => [...current, emptyDealerListing()]);
    setActiveIndex(drafts.length);
  };
  const duplicateDetails = () => {
    if (drafts.length >= MAX_BATCH) return;
    const copy = {
      ...emptyDealerListing(), brand: product.brand, collection: product.collection,
      condition: product.condition, merchantCondition: product.merchantCondition,
      gender: product.gender, caseMaterial: product.caseMaterial,
      braceletMaterial: product.braceletMaterial, movementType: product.movementType,
      boxIncluded: product.boxIncluded, papersIncluded: product.papersIncluded,
      customAttributes: product.customAttributes.map((attribute) => ({ ...attribute })),
    };
    setDrafts((current) => [...current, copy]);
    setActiveIndex(drafts.length);
  };
  const removeDraft = (index) => {
    if (drafts.length === 1) return;
    setDrafts((current) => current.filter((_, position) => position !== index));
    setActiveIndex((current) => current > index ? current - 1 : Math.min(current, drafts.length - 2));
  };
  const addImage = (url, targetIndex) => {
    if (!url) return;
    setDrafts((current) => current.map((draft, index) => index !== targetIndex || draft.productImages.length >= 20
      ? draft : { ...draft, productImages: [...draft.productImages, url] }));
  };
  const removeImage = (index) => setProduct((current) => ({
    ...current,
    productImages: current.productImages.filter((_, position) => position !== index),
    imageTitles: current.imageTitles.filter((_, position) => position !== index),
    imageAlts: current.imageAlts.filter((_, position) => position !== index),
    imageDescriptions: current.imageDescriptions.filter((_, position) => position !== index),
  }));
  const setCoverImage = (index) => setProduct((current) => {
    const move = (items) => {
      const next = [...items];
      const [chosen] = next.splice(index, 1);
      next.unshift(chosen || '');
      return next;
    };
    return {
      ...current, productImages: move(current.productImages),
      imageTitles: move(current.imageTitles), imageAlts: move(current.imageAlts),
      imageDescriptions: move(current.imageDescriptions),
    };
  });
  const setImageDetail = (field, index, value) => setProduct((current) => {
    const values = [...current[field]];
    values[index] = value;
    return { ...current, [field]: values };
  });
  const setCustomAttribute = (index, field, value) => setProduct((current) => ({
    ...current,
    customAttributes: current.customAttributes.map((attribute, position) => position === index ? { ...attribute, [field]: value } : attribute),
  }));
  const applyPreset = (presetId) => {
    const preset = options.attributePresets.find((item) => item.id === presetId);
    if (!preset) return;
    setProduct((current) => {
      const next = { ...current };
      const custom = new Map(current.customAttributes.map((item) => [item.key.toLowerCase(), item]));
      for (const [key, value] of Object.entries(preset.attributes || {})) {
        const normalized = key.toLowerCase();
        const shortcut = WATCH_ATTRIBUTE_FIELDS.find(([, name]) => name.toLowerCase() === normalized);
        if (shortcut) next[shortcut[0]] = String(value);
        else if (normalized === 'collection') next.collection = String(value);
        else if (normalized === 'box included') next.boxIncluded = value === true || String(value).toLowerCase() === 'yes';
        else if (normalized === 'papers included') next.papersIncluded = value === true || String(value).toLowerCase() === 'yes';
        else if (normalized === 'isnewarrival') next.isNewArrival = value === true || String(value).toLowerCase() === 'true';
        else if (normalized === 'iscertifiedpreowned') next.isCertifiedPreOwned = value === true || String(value).toLowerCase() === 'true';
        else if (normalized === 'isvintage') next.isVintage = value === true || String(value).toLowerCase() === 'true';
        else if (normalized !== 'authentication') custom.set(normalized, { key, value: String(value) });
      }
      next.customAttributes = [...custom.values()];
      return next;
    });
    toast({ title: preset.name + ' attributes applied' });
  };

  const handleSave = async () => {
    if (uploadingImages) {
      toast({ title: 'Wait for photos to finish uploading', variant: 'destructive' });
      return;
    }
    const invalidIndex = drafts.findIndex((draft) => validateDealerListing(draft));
    if (invalidIndex >= 0) {
      setActiveIndex(invalidIndex);
      toast({ title: 'Watch ' + (invalidIndex + 1) + ' needs attention', description: validateDealerListing(drafts[invalidIndex]), variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        const result = await updateDealerListing(id, dealerListingPayload(product));
        toast({ title: 'Listing updated', description: result.translationWarning });
        router.push(localePath('/portal/listings'));
        return;
      }
      const { created, failures, warnings } = await saveDealerListingBatch(
        drafts,
        createDealerListing,
        (index, total) => setProgress('Saving watch ' + index + ' of ' + total + '…'),
      );
      if (failures.length) {
        setDrafts(failures.map((item) => item.draft));
        setActiveIndex(0);
        toast({ title: created + ' saved, ' + failures.length + ' need retry', description: failures[0].error, variant: 'destructive' });
      } else {
        toast({ title: created + (created === 1 ? ' watch listing' : ' watch listings') + ' created as drafts', description: warnings[0] });
        router.push(localePath('/portal/listings'));
      }
    } catch (error) {
      toast({ title: 'Could not save listing', description: error.message, variant: 'destructive' });
    } finally {
      setProgress('');
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <button type="button" onClick={() => router.push(localePath('/portal/listings'))} className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Back to listings
      </button>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">{isEdit ? 'Edit watch listing' : 'List watches'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Write product details in English. New dealer listings are saved as drafts for review.</p>
        </div>
        <button type="button" onClick={handleSave} disabled={saving || uploadingImages} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50">
          <Save size={16} /> {saving ? progress || 'Saving…' : isEdit ? 'Update listing' : 'Create ' + drafts.length + (drafts.length === 1 ? ' listing' : ' listings')}
        </button>
      </div>

      {!isEdit && (
        <div className="mb-6 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {drafts.map((draft, index) => (
              <div key={index} className={'flex shrink-0 items-center rounded-full border ' + (activeIndex === index ? 'border-primary bg-primary/10 text-primary' : 'border-border text-foreground')}>
                <button type="button" onClick={() => setActiveIndex(index)} disabled={saving || uploadingImages} className="max-w-48 truncate px-4 py-2 text-sm font-medium">
                  {index + 1}. {draft.productTitle || 'New watch'}
                </button>
                {drafts.length > 1 && <button type="button" aria-label={'Remove watch ' + (index + 1)} onClick={() => removeDraft(index)} disabled={saving || uploadingImages} className="min-h-10 pr-3 text-muted-foreground hover:text-destructive"><X size={14} /></button>}
              </div>
            ))}
            <button type="button" onClick={addDraft} disabled={saving || uploadingImages || drafts.length >= MAX_BATCH} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border border-border px-4 text-sm text-foreground disabled:opacity-50"><Plus size={15} /> Add watch</button>
            <button type="button" onClick={duplicateDetails} disabled={saving || uploadingImages || drafts.length >= MAX_BATCH} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border border-border px-4 text-sm text-foreground disabled:opacity-50"><Copy size={15} /> Copy details</button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Prepare up to {MAX_BATCH} watches, then submit them together. If one fails, successfully saved watches will not be submitted again.</p>
        </div>
      )}

      <fieldset disabled={saving} className="space-y-5 disabled:opacity-75">
        <section className={sectionClass}>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Basic data</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Watch title *" className="sm:col-span-2 lg:col-span-3"><input value={product.productTitle} onChange={(event) => setField('productTitle', event.target.value)} maxLength={500} className={inputClass} /></Field>
            <SelectField label="Brand *" value={product.brand} options={brandOptions} onChange={changeBrand} placeholder="Select brand" />
            <SelectField label="Collection *" value={product.collection} options={collectionOptions} onChange={(value) => setField('collection', value)} placeholder={product.brand ? 'Select collection' : 'Select a brand first'} disabled={!product.brand} />
            <Field label="Model"><input value={product.model} onChange={(event) => setField('model', event.target.value)} className={inputClass} /></Field>
            <Field label="Reference number"><input value={product.referenceNumber} onChange={(event) => setField('referenceNumber', event.target.value)} className={inputClass} /></Field>
            <SelectField label="Store category" value={product.categoryId} options={options.categories.map((item) => ({ value: item.id, label: item.name }))} onChange={(value) => setField('categoryId', value)} placeholder="Optional category" />
            <Field label="SKU"><input value={product.sku} onChange={(event) => setField('sku', event.target.value)} className={inputClass} /></Field>
            <Field label="Price (EUR) *"><input type="number" min="0.01" step="0.01" value={product.price} onChange={(event) => setField('price', event.target.value)} className={inputClass} /></Field>
            <Field label="Sale price (EUR)"><input type="number" min="0.01" step="0.01" value={product.salePrice} onChange={(event) => setField('salePrice', event.target.value)} className={inputClass} /></Field>
            <Field label="Stock quantity"><input type="number" min="0" step="1" value={product.stockQuantity} onChange={(event) => setField('stockQuantity', event.target.value)} className={inputClass} /></Field>
            <SelectField label="Merchant condition" value={product.merchantCondition} options={[{ value: 'new', label: 'New' }, { value: 'used', label: 'Used' }, { value: 'refurbished', label: 'Refurbished' }]} onChange={(value) => setField('merchantCondition', value)} />
            <Field label="Badge (optional)"><input value={product.badge} onChange={(event) => setField('badge', event.target.value)} maxLength={100} placeholder="e.g. New Arrival" className={inputClass} /></Field>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-1 text-lg font-semibold text-foreground">Photos</h2>
          <p className="mb-4 text-sm text-muted-foreground">Add up to 20 photos. The first is the cover image; add descriptive alt text for accessibility.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.productImages.map((image, index) => (
              <div key={image + ':' + index} className="rounded-lg border border-border p-3">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <MediaImage src={getMediaVariant(image, 'thumb')} alt={product.imageAlts[index] || 'Watch photo ' + (index + 1)} fill sizes="(max-width: 640px) 100vw, 320px" quality={76} className="object-contain" />
                  <button type="button" aria-label={'Remove photo ' + (index + 1)} onClick={() => removeImage(index)} className="absolute right-2 top-2 rounded-full bg-background/90 p-2 text-foreground"><Trash2 size={15} /></button>
                </div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Photo {index + 1}{index === 0 ? ' · Cover' : ''}</span>
                  {index > 0 && <button type="button" onClick={() => setCoverImage(index)} className="text-xs font-medium text-primary">Make cover</button>}
                </div>
                <Field label="Alt text"><input value={product.imageAlts[index] || ''} onChange={(event) => setImageDetail('imageAlts', index, event.target.value)} maxLength={500} className={inputClass} /></Field>
                <details className="mt-2"><summary className="cursor-pointer text-xs text-primary">More photo details</summary>
                  <div className="mt-2 space-y-2">
                    <Field label="Image title"><input value={product.imageTitles[index] || ''} onChange={(event) => setImageDetail('imageTitles', index, event.target.value)} maxLength={500} className={inputClass} /></Field>
                    <Field label="Image description"><textarea value={product.imageDescriptions[index] || ''} onChange={(event) => setImageDetail('imageDescriptions', index, event.target.value)} rows={2} maxLength={2000} className={inputClass} /></Field>
                  </div>
                </details>
              </div>
            ))}
            {product.productImages.length < 20 && <ImageUploader key={activeIndex} purpose="product" value="" multiple maxFiles={20 - product.productImages.length} onUploadingChange={setUploadingImages} onChange={(url) => addImage(url, activeIndex)} label="Add photos" dropzoneClassName="min-h-44 w-full rounded-lg" />}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Watch details</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField label="Condition grade" value={product.condition} options={CONDITIONS} onChange={(value) => setField('condition', value)} />
            <SelectField label="Gender" value={product.gender} options={GENDERS} onChange={(value) => setField('gender', value)} />
            <Field label="Year of production"><input type="number" min="1800" max="2100" value={product.yearOfProduction} onChange={(event) => setField('yearOfProduction', event.target.value)} className={inputClass} /></Field>
            <Field label="Case diameter"><input value={product.caseDiameter} onChange={(event) => setField('caseDiameter', event.target.value)} placeholder="e.g. 40 mm" className={inputClass} /></Field>
            <SelectField label="Case material" value={product.caseMaterial} options={CASE_MATERIALS} onChange={(value) => setField('caseMaterial', value)} />
            <Field label="Bracelet material"><input value={product.braceletMaterial} onChange={(event) => setField('braceletMaterial', event.target.value)} className={inputClass} /></Field>
            <SelectField label="Dial color" value={product.dialColor} options={DIAL_COLORS} onChange={(value) => setField('dialColor', value)} />
            <SelectField label="Watch shape" value={product.watchShape} options={WATCH_SHAPES} onChange={(value) => setField('watchShape', value)} />
            <SelectField label="Movement type" value={product.movementType} options={MOVEMENT_TYPES} onChange={(value) => setField('movementType', value)} />
            {[
              ['functions', 'Functions'], ['waterResistance', 'Water resistance'], ['crystalType', 'Crystal type'],
              ['powerReserve', 'Power reserve'], ['serviceHistory', 'Service history'], ['polishedStatus', 'Polished status'],
              ['originalPartsStatus', 'Original parts status'], ['warrantyType', 'Warranty type'],
              ['warrantyDuration', 'Warranty duration'], ['scopeOfDelivery', 'Scope of delivery'],
            ].map(([key, label]) => <Field key={key} label={label}><input value={product[key]} onChange={(event) => setField(key, event.target.value)} className={inputClass} /></Field>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              ['boxIncluded', 'Box included'], ['papersIncluded', 'Papers included'],
              ['isNewArrival', 'New arrival'], ['isCertifiedPreOwned', 'Selected pre-owned'], ['isVintage', 'Vintage'],
            ].map(([key, label]) => <label key={key} className="inline-flex min-h-10 items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={!!product[key]} onChange={(event) => setField(key, event.target.checked)} /> {label}</label>)}
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div><h2 className="text-lg font-semibold text-foreground">Store attributes</h2><p className="mt-1 text-sm text-muted-foreground">Use any attribute and saved value available in the Ecom dashboard, or add a new watch-specific one.</p></div>
            {options.attributePresets.length > 0 && <select defaultValue="" onChange={(event) => { applyPreset(event.target.value); event.target.value = ''; }} className={inputClass + ' max-w-xs'} aria-label="Apply attribute preset"><option value="">Apply attribute preset…</option>{options.attributePresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.name}</option>)}</select>}
          </div>
          <datalist id="dealer-attribute-names">{options.attributeDefs.map((item) => <option key={item.name} value={item.name} />)}</datalist>
          <div className="space-y-3">
            {product.customAttributes.map((attribute, index) => {
              const values = options.attributeDefs.find((item) => item.name.toLowerCase() === attribute.key.toLowerCase())?.values || [];
              const valueListId = 'dealer-attribute-values-' + index;
              return <div key={index} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <input aria-label={'Attribute ' + (index + 1) + ' name'} list="dealer-attribute-names" value={attribute.key} onChange={(event) => setCustomAttribute(index, 'key', event.target.value)} placeholder="Attribute name" maxLength={120} className={inputClass} />
                <div><input aria-label={'Attribute ' + (index + 1) + ' value'} list={valueListId} value={attribute.value} onChange={(event) => setCustomAttribute(index, 'value', event.target.value)} placeholder="Value" maxLength={1000} className={inputClass} /><datalist id={valueListId}>{values.map((value) => <option key={value} value={value} />)}</datalist></div>
                <button type="button" aria-label={'Remove attribute ' + (index + 1)} onClick={() => setProduct((current) => ({ ...current, customAttributes: current.customAttributes.filter((_, position) => position !== index) }))} className="min-h-11 rounded-lg border border-border px-3 text-muted-foreground hover:text-destructive"><X size={16} /></button>
              </div>;
            })}
          </div>
          <button type="button" onClick={() => setProduct((current) => ({ ...current, customAttributes: [...current.customAttributes, { key: '', value: '' }] }))} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm text-foreground"><Plus size={15} /> Add attribute</button>
        </section>

        <section className={sectionClass}>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Description</h2>
          <div className="space-y-4">
            <Field label="Short description"><textarea value={product.shortDescription} onChange={(event) => setField('shortDescription', event.target.value)} rows={2} maxLength={500} className={inputClass} /></Field>
            <Field label="Full description"><textarea value={product.productDescription} onChange={(event) => setField('productDescription', event.target.value)} rows={7} maxLength={10000} className={inputClass} /></Field>
          </div>
        </section>

        <details className={sectionClass}>
          <summary className="cursor-pointer text-lg font-semibold text-foreground">Search and Google Merchant details</summary>
          <p className="mt-2 text-sm text-muted-foreground">Optional identifiers and overrides. The watch title, description and price are used by default.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="MPN"><input value={product.mpn} onChange={(event) => setField('mpn', event.target.value)} placeholder="Uses reference number when blank" maxLength={200} className={inputClass} /></Field>
            <Field label="Google product category"><input value={product.googleProductCategory} onChange={(event) => setField('googleProductCategory', event.target.value)} maxLength={500} className={inputClass} /></Field>
            <Field label="Google title override"><input value={product.googleMerchantTitle} onChange={(event) => setField('googleMerchantTitle', event.target.value)} maxLength={150} className={inputClass} /></Field>
            <Field label="SEO meta title"><input value={product.metaTitle} onChange={(event) => setField('metaTitle', event.target.value)} maxLength={200} className={inputClass} /></Field>
            <Field label="Google description override" className="sm:col-span-2"><textarea value={product.googleMerchantDescription} onChange={(event) => setField('googleMerchantDescription', event.target.value)} rows={3} maxLength={5000} className={inputClass} /></Field>
            <Field label="SEO meta description" className="sm:col-span-2"><textarea value={product.metaDescription} onChange={(event) => setField('metaDescription', event.target.value)} rows={3} maxLength={500} className={inputClass} /></Field>
          </div>
        </details>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Dealer listings remain drafts until reviewed. English content uses the existing product translation workflow.</p>
        <button type="button" onClick={handleSave} disabled={saving || uploadingImages} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"><Save size={16} /> {saving ? progress || 'Saving…' : isEdit ? 'Update listing' : 'Create ' + drafts.length + (drafts.length === 1 ? ' listing' : ' listings')}</button>
      </div>
    </div>
  );
}
