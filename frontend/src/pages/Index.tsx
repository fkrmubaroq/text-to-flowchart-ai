
import { useState } from 'react';
import Header from '@/components/Header';
import TextInput from '@/components/TextInput';
import FlowchartOutput from '@/components/FlowchartOutput';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { generateFlowchart } from '@/services/flowchartService';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    try {
      const result = await generateFlowchart(inputText);
      setMermaidCode(result.mermaid);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadExample = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position={isMobile ? "top-center" : "bottom-right"} />
      <Header />
      
      <main className="flex-1 container py-6 lg:py-8">
      
        <Card className="bg-card/50 backdrop-blur-sm border shadow-sm">
          <div className="p-6">
         

            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex-1">
                <TextInput
                  value={inputText}
                  onChange={setInputText}
                  onConvert={handleConvert}
                  onExample={handleLoadExample}
                  isProcessing={isProcessing}
                />
              </div>
              
              {isMobile && <Separator />}
              
              <div className="flex-1">
                <FlowchartOutput mermaidCode={mermaidCode} isLoading={isProcessing} />
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p className="mb-2">
            Powered by <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-flow-blue hover:underline">Mermaid.js</a>
          </p>
          <p>
            © 2025 FlowScribe. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
