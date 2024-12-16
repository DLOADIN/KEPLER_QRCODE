import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { ScanResult } from '../../types/student';
import Button from '../ui/Button';

interface ScannerResultProps {
  result: ScanResult;
  onScanAgain: () => void;
}

export default function ScannerResult({ result, onScanAgain }: ScannerResultProps) {
  return (
    <div className="text-center space-y-4">
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
      <Button onClick={onScanAgain} variant="primary">
        Scan Again
      </Button>
    </div>
  );
}