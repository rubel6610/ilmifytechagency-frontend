"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [manualId, setManualId] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);

  useEffect(() => {
    if (!isScanning) return;

    const codeReader = new BrowserMultiFormatReader();
    let controls: any;

    const startScanning = async () => {
      try {
        // Attempt to request camera permissions explicitly first if needed, 
        // though zxing handles this.
        const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
        
        if (videoInputDevices.length === 0) {
          setError('No camera found on this device.');
          setIsScanning(false);
          return;
        }

        // Use the first available device (usually back camera on mobile if lucky, or just first)
        // ideally we'd let user pick or prefer 'environment' facing
        const selectedDeviceId = videoInputDevices[0].deviceId;

        controls = await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              const text = result.getText();
              console.log("Scanned:", text);
              
              // Extract ID if it's a URL
              // Format: .../scan/iLM-C-63
              try {
                // If it's a full URL, split by /
                const parts = text.split('/');
                const potentialId = parts[parts.length - 1];
                
                if (potentialId.startsWith('iLM-C-')) {
                   controls.stop();
                   router.push(`/scan/${potentialId}`);
                } else if (text.startsWith('iLM-C-')) {
                   controls.stop();
                   router.push(`/scan/${text}`);
                }
              } catch (e) {
                console.error("Parse error", e);
              }
            }
          }
        );
      } catch (err) {
        console.error(err);
        setError('Failed to access camera. Please ensure permissions are granted.');
        setIsScanning(false);
      }
    };

    startScanning();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [router, isScanning]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId.trim()) {
      router.push(`/scan/${manualId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Scan QR Code</h1>
          <p className="text-slate-400">Point your camera at an employee ID card</p>
        </div>

        {isScanning ? (
          <div className="relative aspect-square bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 mb-6">
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 border-[40px] border-black/50 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-[#0ddaa0] rounded-lg relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#0ddaa0] -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#0ddaa0] -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#0ddaa0] -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#0ddaa0] -mb-1 -mr-1"></div>
              </div>
            </div>
            {/* Scanning line animation */}
             <motion.div 
               animate={{ y: [0, 200, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-[#0ddaa0] shadow-[0_0_10px_#0ddaa0]"
             />
          </div>
        ) : (
          <div className="aspect-square bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border-4 border-slate-700">
             <div className="text-center p-6">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <p className="text-red-400 font-semibold mb-2">{error || "Camera disabled"}</p>
                <button 
                  onClick={() => setIsScanning(true)} 
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600"
                >
                  Retry Camera
                </button>
             </div>
          </div>
        )}

        {/* Manual Fallback */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-white font-semibold mb-3 text-center">Or enter Employee ID manually</p>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input 
              type="text" 
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder="e.g., iLM-C-63" 
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#0ddaa0]"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#0ddaa0] text-slate-900 font-bold rounded-xl hover:bg-[#0ddaa0]/90 transition-colors"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
