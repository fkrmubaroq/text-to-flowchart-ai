
import { toast } from 'sonner';

export async function generateFlowchart(description: string): Promise<{ mermaid:string}> {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        prompt: description
      }),
    };
    const flowchart = await fetch(`${import.meta.env.VITE_BASE_URL}/generate-flowchart`, requestOptions)
    const response = await flowchart.json();
    return response;
  } catch (error) {
    toast.error('Error generating flowchart');
    console.error('Error generating flowchart:', error);
    return { mermaid: error?.message || error};
  }
}
