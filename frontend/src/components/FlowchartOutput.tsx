
import React, { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';
import mermaid from 'mermaid';
import Markdown from 'react-markdown'
import { marked } from 'marked';
import { extractMermaidContent } from '@/lib/utils';
import { Line, Shimmer } from './ui/shimmer';

interface FlowchartOutputProps {
  mermaidCode: string;
  isLoading: boolean;
}

const FlowchartOutput = ({ isLoading, mermaidCode }: FlowchartOutputProps) => {
  const { raw: text, oneLine } = useMemo(() => extractMermaidContent(mermaidCode), [mermaidCode])
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {isLoading ? <ShimmerResult /> :
          <>
            <MermaidCode text={text} />
            <SvgResult text={text} />
          </>
        }
      </div>
    </div>
  );
};

const MermaidCode = ({ text }: { text: string; }) => {
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    }
  };

  return <div className="flex flex-col gap-y-1 w-full">
    <h2 className="text-lg font-medium">Mermaid Code</h2>
    <div className="flex-1 relative border rounded-lg bg-secondary/30 p-4 overflow-auto">
      {text &&
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          disabled={!text}
          className="text-xs w-8 h-8 absolute top-2 right-2"
        >
          <Copy size={20} />
        </Button>
      }
      {text ? (
        <>
          <Markdown>
            {text}
          </Markdown>
          <pre
            ref={codeRef}
            className="hidden"
          >{text}</pre>
        </>
      ) : (
        <div className="text-muted-foreground text-center h-full flex items-center justify-center">
          <p>Mermaid Code will appear here after generation</p>
        </div>
      )}
    </div>
  </div>
}

const SvgResult = ({ text }: { text: string }) => {
  const svgRef = useRef<HTMLDivElement>(null);

  const downloadSVG = () => {
    if (!svgRef.current || !svgRef.current.querySelector('svg')) {
      toast.error('No diagram to download');
      return;
    }

    const svgEl = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgEl!);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'flowchart.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Downloaded SVG');
  };


  useEffect(() => {
    if (text && svgRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        flowchart: {
          curve: 'basis'
        }
      });

      try {
        // Clear previous content
        svgRef.current.innerHTML = '';

        // Generate new diagram
        mermaid.render('mermaid-diagram', text).then(({ svg }) => {
          if (svgRef.current) {
            svgRef.current.innerHTML = svg;
          }
        });
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        toast.error('Error rendering flowchart');
      }
    }
  }, [text, document.documentElement.classList.contains('dark')]);

  return <div className="flex flex-col gap-y-1 w-full">
    <h2 className="text-lg font-medium">Preview</h2>
    <div className="flex-1 border relative  rounded-lg bg-card p-4 overflow-auto">
      {text && <Button
        variant="outline"
        size="icon"
        onClick={downloadSVG}
        disabled={!text}
        className="text-xs w-8 h-8 absolute top-2 right-2"
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      }
      <div
        ref={svgRef}
        className="mermaid-container h-full flex items-center justify-center"
      >
        {!text && (
          <div className="text-muted-foreground text-center">
            <p>Preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  </div>

}


function ShimmerResult() {
  return <>
    <ShimmerItem />
    <ShimmerItem />
  </>
}

function ShimmerItem() {
  return <Shimmer className="flex flex-col gap-y-2 w-full">
      <Line width="w-[200px]" height="h-[28px]"/>
      <Line width='w-full ' height='h-[250px]' />
    </Shimmer>
}
export default FlowchartOutput;
