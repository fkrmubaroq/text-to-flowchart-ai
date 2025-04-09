
import React, { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RotateCcw, FileText, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onConvert: () => void;
  onExample: (example: string) => void;
  isProcessing: boolean;
}

const examples = [
  `User visits website. They can either sign up, log in, or browse as guest. If they sign up, they create an account and proceed to dashboard. If they log in and credentials are valid, they go to dashboard. Otherwise they see an error. As a guest, they can only view limited content.`,
  
  `Order processing flow: Customer places order. The system validates payment. If payment fails, send notification to customer. If successful, the order is sent to fulfillment center, inventory is updated, and a confirmation email is sent. The fulfillment center prepares the shipment, generates a shipping label, and hands off to shipping carrier. Once shipped, customer receives tracking information.`,
  
  `Bug fixing workflow: Developer receives bug report. They reproduce the issue to understand it. If not reproducible, ask for more info. If reproduced, they investigate root cause, create a fix, write tests, and submit for code review. If code review passes, deploy to staging for QA. If QA approves, deploy to production. If issues found in QA, return to development.`
];

const TextInput = ({ value, onChange, onConvert, onExample, isProcessing }: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleClear = () => {
    onChange('');
    toast("Input cleared");
  };

  const handleExample = (index: number) => {
    onExample(examples[index]);
    toast("Example loaded");
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Process Description</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClear} 
            disabled={!value.trim()}
            className="text-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your process or workflow here..."
          className="flex-1 min-h-[200px] font-mono text-sm resize-none"
        />
        
        <div className="mt-2 flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary" 
              size="sm" 
              onClick={() => handleExample(0)} 
              className="text-xs"
            >
              <FileText className="h-3 w-3 mr-1" />
              User Login Flow
            </Button>
            
            <Button
              variant="secondary" 
              size="sm" 
              onClick={() => handleExample(1)} 
              className="text-xs"
            >
              <FileText className="h-3 w-3 mr-1" />
              Order Process
            </Button>
            
            <Button
              variant="secondary" 
              size="sm" 
              onClick={() => handleExample(2)} 
              className="text-xs"
            >
              <FileText className="h-3 w-3 mr-1" />
              Bug Fix Flow
            </Button>
          </div>
          
          <Button 
            onClick={onConvert} 
            disabled={!value.trim() || isProcessing}
            className="self-end"
          >
            {isProcessing ? "Processing..." : "Generate Flowchart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
