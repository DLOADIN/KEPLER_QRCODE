import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Scan, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock student database
const allowedStudents = [
  { id: 'STU001', name: 'John Doe', status: 'active' },
  { id: 'STU002', name: 'Jane Smith', status: 'active' },
];

export default function QRScanner() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<{ student?: typeof allowedStudents[0]; allowed: boolean } | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      const studentId = data;
      const student = allowedStudents.find(s => s.id === studentId);
      const allowed = student?.status === 'active';

      setResult({ student, allowed });
      setScanning(false);

      toast(allowed ? 'Student verified successfully!' : 'Student verification failed!', {
        icon: allowed ? '✅' : '❌',
      });
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    toast.error('Error accessing camera');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Scan className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Student QR Verification</h2>
          
          {scanning ? (
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <QrReader
                  onResult={(result) => result && handleScan(result.getText())}
                  onError={handleError}
                  constraints={{ facingMode: 'environment' }}
                  className="w-full"
                />
              </div>
              <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none"></div>
            </div>
          ) : (
            <div className="text-center">
              {result && (
                <div className="space-y-4">
                  {result.allowed ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  )}
                  <div className="text-lg font-semibold">
                    {result.allowed ? 'Access Granted' : 'Access Denied'}
                  </div>
                  {result.student && (
                    <div className="text-gray-600">
                      Student ID: {result.student.id}<br />
                      Name: {result.student.name}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setScanning(true);
                      setResult(null);
                    }}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Scan Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}