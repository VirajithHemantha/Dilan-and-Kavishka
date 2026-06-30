import React, { useState } from 'react';

export const Admin = () => {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const generateLink = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name.");
      return;
    }

    const baseUrl = window.location.origin;
    const url = new URL(baseUrl);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', guestName.trim());

    const link = url.toString();
    setGeneratedLink(link);

    const message = `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Dilan & Kavishka`;

    setGeneratedMessage(message);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-lg border border-brand-beige/30">
        <h1 className="text-4xl font-display text-stone-800 mb-6 text-center">Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">Prefix</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-stone-50 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-beige focus:outline-none"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. Sanjaya"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-stone-50 px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-beige focus:outline-none"
            />
          </div>

          <button
            onClick={generateLink}
            className="w-full bg-brand-beige-deep text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 space-y-6">
              <div className="p-4 bg-brand-champagne/30 rounded-xl border border-brand-beige/40">
                <p className="text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">Generated Link</p>
                <div className="flex gap-4 items-center">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink} 
                    className="w-full bg-white px-3 py-2 rounded-lg border border-stone-200 text-sm"
                  />
                  <button 
                    onClick={() => copyToClipboard(generatedLink)}
                    className="shrink-0 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-700"
                  >
                    Copy Link Only
                  </button>
                </div>
              </div>

              <div className="p-4 bg-brand-champagne/30 rounded-xl border border-brand-beige/40">
                <p className="text-sm font-bold text-stone-600 mb-2 uppercase tracking-wider">Message Template</p>
                <textarea 
                  readOnly 
                  value={generatedMessage}
                  rows={12}
                  className="w-full bg-white px-3 py-2 rounded-lg border border-stone-200 text-sm font-serif resize-none"
                />
                <button 
                  onClick={() => copyToClipboard(generatedMessage)}
                  className="w-full mt-4 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-700 uppercase tracking-widest font-bold"
                >
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
