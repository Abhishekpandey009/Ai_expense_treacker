import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { createWorker } from 'tesseract.js';
import { Camera, Upload, X } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardBody } from '../ui/Card';
import Loader from '../ui/Loader';

interface ReceiptScannerProps {
  onScanComplete: (data: { 
    amount?: number;
    date?: string;
    title?: string;
  }) => void;
  onClose: () => void;
}

const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onScanComplete, onClose }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const webcamRef = React.useRef<Webcam>(null);

  const processReceipt = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker('eng');
      const result = await worker.recognize(imageData);
      const text = result.data.text;

      // Extract amount (looking for dollar amounts)
      const amountMatch = text.match(/\$?\d+\.\d{2}/);
      const amount = amountMatch ? parseFloat(amountMatch[0].replace('$', '')) : undefined;

      // Extract date (simple date format matching)
      const dateMatch = text.match(/\d{2}[/-]\d{2}[/-]\d{2,4}/);
      const date = dateMatch ? dateMatch[0] : undefined;

      // Extract title (first line or prominent text)
      const lines = text.split('\n');
      const title = lines[0]?.trim();

      await worker.terminate();
      onScanComplete({ amount, date, title });
    } catch (error) {
      console.error('Error processing receipt:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setIsCameraActive(false);
      }
    }
  }, [webcamRef]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setCapturedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (capturedImage) {
      await processReceipt(capturedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Scan Receipt</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </CardHeader>
        <CardBody>
          {isProcessing ? (
            <div className="text-center py-8">
              <Loader size="large" />
              <p className="mt-4 text-gray-600">Processing receipt...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {isCameraActive ? (
                <div className="relative">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-lg"
                  />
                  <Button
                    onClick={captureImage}
                    className="mt-4"
                    fullWidth
                    leftIcon={<Camera size={18} />}
                  >
                    Capture
                  </Button>
                </div>
              ) : capturedImage ? (
                <div className="space-y-4">
                  <img
                    src={capturedImage}
                    alt="Captured receipt"
                    className="w-full rounded-lg"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCapturedImage(null);
                        setIsCameraActive(true);
                      }}
                    >
                      Retake
                    </Button>
                    <Button onClick={handleProcess}>Process Receipt</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={() => setIsCameraActive(true)}
                    fullWidth
                    leftIcon={<Camera size={18} />}
                  >
                    Use Camera
                  </Button>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload">
                      <Button
                        variant="outline"
                        fullWidth
                        leftIcon={<Upload size={18} />}
                        as="span"
                      >
                        Upload Image
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ReceiptScanner;