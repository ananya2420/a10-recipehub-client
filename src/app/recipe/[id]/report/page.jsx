"use client";
import React, { use, useState } from 'react';
import Link from 'next/link';

export default function ReportPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  // State to track if the report was successful
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if a radio button is selected (HTML5 required attribute handles this)
    const formData = new FormData(e.target);
    const reason = formData.get('reason');

    if (!reason) {
      alert("Please select a reason before submitting.");
      return;
    }

    // Success flow
    setStatus('success');
    alert("Report submitted successfully!");
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
          <p className="mb-6">Thank you for helping us keep our community safe.</p>
          <Link href={`/recipe/${id}`} className="px-6 py-2 bg-black text-white rounded-lg">
            Back to Recipe
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <Link href={`/recipe/${id}`} className="text-gray-500 hover:text-black mb-6 block text-sm">
          ← Back to Recipe
        </Link>
        
        <h1 className="text-2xl font-bold text-black mb-1">Report Recipe</h1>
        <p className="text-gray-500 text-sm mb-8">Reporting: <span className="font-semibold text-black">Recipe #{id}</span></p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-bold text-black mb-3">Reason *</legend>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="reason" value="spam" className="w-5 h-5 accent-green-600 cursor-pointer" required />
              <span className="text-gray-700">Spam</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="reason" value="offensive" className="w-5 h-5 accent-green-600 cursor-pointer" />
              <span className="text-gray-700">Offensive Content</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="reason" value="copyright" className="w-5 h-5 accent-green-600 cursor-pointer" />
              <span className="text-gray-700">Copyright Issue</span>
            </label>
          </fieldset>

          <div>
            <label className="text-sm font-bold text-black block mb-2">Additional Details (optional)</label>
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" 
              rows={3} 
              placeholder="Provide more context..."
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </main>
  );
}