import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import mermaid from 'mermaid';
import { useEffect, useRef } from "react";

type ModalPreviewFullScreenProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    text: string;
};

export default function ModalPreviewFullScreen({ text, open, onOpenChange }: ModalPreviewFullScreenProps) {
    const svgRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!text || !open) return;
        mermaid.render('mermaid-diagram', text).then(({ svg }) => {
            if (svgRef.current) {
                svgRef.current.innerHTML = svg;
            }
        });
    }, [text, open])
    return <Dialog open={open} onOpenChange={onOpenChange} >
        <DialogContent className="w-[95%] lg:w-full lg:max-w-7xl">
            <DialogHeader>
                <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            <div className="h-[70vh] flex items-center justify-center overflow-auto pt-[100px]" ref={svgRef}></div>
        </DialogContent>
    </Dialog>
}