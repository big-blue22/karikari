declare module 'jspdf' {
  export default class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string);
    text(text: string, x: number, y: number, options?: any): void;
    setFontSize(size: number): void;
    setFont(fontName?: string, fontStyle?: string): void;
    addImage(imageData: any, format: string, x: number, y: number, width: number, height: number): void;
    addPage(): void;
    save(filename: string): void;
    splitTextToSize(text: string, maxWidth: number): string[];
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
  }
}