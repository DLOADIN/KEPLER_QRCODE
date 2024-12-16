import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Scan } from 'lucide-react';
import toast from 'react-hot-toast';
import { ScanResult } from '../../types/student';
import { verifyStudent } from '../../utils/studentVerification';
import Logo from '../ui/Logo';
import ScannerResult from './ScannerResult';

export default function QRScanner() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<ScanResult | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      },
      false
    );

    scannerRef.current.render(handleScan, handleError);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [scanning]);

  const handleScan = (decodedText: string) => {
    const verificationResult = verifyStudent(decodedText);
    setResult(verificationResult);
    setScanning(false);

    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
    }

    toast(verificationResult.allowed ? 'Student verified successfully!' : 'Student verification failed!', {
      icon: verificationResult.allowed ? '✅' : '❌',
    });
  };

  const handleError = (err: Error) => {
    console.error(err);
    toast.error('Error accessing camera');
  };

  const handleScanAgain = () => {
    setScanning(true);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-center mb-6">
            <Logo size="sm" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Student QR Verification
          </h2>
          
          {scanning ? (
            <div className="relative">
              <div id="reader" className="overflow-hidden rounded-lg" />
            </div>
          ) : (
            result && (
              <ScannerResult
                result={result}
                onScanAgain={handleScanAgain}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}