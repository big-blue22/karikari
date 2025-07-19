import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MINECRAFT_COMMANDS, COMMAND_CATEGORIES } from './constants';

interface PdfPrintButtonProps {
  className?: string;
}

const PdfPrintButton: React.FC<PdfPrintButtonProps> = ({ className }) => {
  const generatePDF = async () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Add title
      pdf.setFontSize(24);
      pdf.setTextColor(255, 215, 0); // Gold color
      pdf.text('マイクラ コマンドの書', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('キーボードとコマンドをマスターして、キミもマイクラ博士だ！', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      // Try to capture keyboard image if visible
      const keyboardElement = document.querySelector('img[alt*="キーボード"]') as HTMLImageElement;
      if (keyboardElement) {
        try {
          const canvas = await html2canvas(keyboardElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 0.8);
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Check if we need a new page
          if (yPosition + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.setFontSize(16);
          pdf.setTextColor(255, 165, 0); // Orange
          pdf.text('キーボード配列', margin, yPosition);
          yPosition += 10;

          pdf.addImage(imgData, 'JPEG', margin, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 15;
        } catch (error) {
          console.warn('Failed to capture keyboard image:', error);
          // Add placeholder text instead
          pdf.setFontSize(16);
          pdf.setTextColor(255, 165, 0);
          pdf.text('キーボード配列', margin, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text('キーボード画像をここに表示（実際の使用時は画像が含まれます）', margin, yPosition);
          yPosition += 20;
        }
      }

      // Add command list
      pdf.setFontSize(18);
      pdf.setTextColor(255, 165, 0);
      pdf.text('コマンド一覧', margin, yPosition);
      yPosition += 15;

      // Group commands by category
      const groupedCommands = MINECRAFT_COMMANDS.reduce((acc, command) => {
        (acc[command.category] = acc[command.category] || []).push(command);
        return acc;
      }, {} as Record<string, typeof MINECRAFT_COMMANDS>);

      // Add each category
      Object.entries(COMMAND_CATEGORIES).forEach(([key, categoryName]) => {
        const commands = groupedCommands[categoryName];
        if (!commands) return;

        // Check if we need a new page
        if (yPosition + 40 > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        // Category title
        pdf.setFontSize(14);
        pdf.setTextColor(255, 165, 0);
        pdf.text(categoryName, margin, yPosition);
        yPosition += 8;

        // Commands in this category
        commands.forEach((command) => {
          // Check if we need a new page
          if (yPosition + 15 > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }

          // Command
          pdf.setFontSize(11);
          pdf.setTextColor(0, 200, 0); // Green
          pdf.text(`${command.command}`, margin + 5, yPosition);
          yPosition += 5;

          // Description (with text wrapping)
          pdf.setFontSize(9);
          pdf.setTextColor(80, 80, 80);
          const lines = pdf.splitTextToSize(command.description, contentWidth - 10);
          pdf.text(lines, margin + 5, yPosition);
          yPosition += lines.length * 4 + 3;
        });

        yPosition += 5; // Extra space between categories
      });

      // Add footer
      const footerY = pageHeight - 10;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('© 2024 マイクラ コマンドの書', pageWidth / 2, footerY, { align: 'center' });

      // Save the PDF
      pdf.save('minecraft-helper-guide.pdf');
      
      // Show success message
      alert('PDFファイルがダウンロードされました！');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDFの生成に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <button
      onClick={generatePDF}
      className={`minecraft-button px-4 py-2 text-white font-bold text-sm rounded-md transition-all duration-200 flex items-center gap-2 ${className || ''}`}
      style={{
        background: 'linear-gradient(135deg, #DC143C 0%, #FF6347 50%, #DC143C 100%)',
        border: '3px solid #8B0000',
        boxShadow: `
          inset 2px 2px 0 rgba(255,255,255,0.3),
          inset -2px -2px 0 rgba(0,0,0,0.3),
          0 4px 8px rgba(0,0,0,0.3)
        `
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #FF4500 0%, #FF7F50 50%, #FF4500 100%)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #DC143C 0%, #FF6347 50%, #DC143C 100%)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
        e.currentTarget.style.boxShadow = `
          inset 2px 2px 0 rgba(0,0,0,0.3),
          inset -2px -2px 0 rgba(255,255,255,0.3),
          0 2px 4px rgba(0,0,0,0.3)
        `;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = `
          inset 2px 2px 0 rgba(255,255,255,0.3),
          inset -2px -2px 0 rgba(0,0,0,0.3),
          0 4px 8px rgba(0,0,0,0.3)
        `;
      }}
    >
      📄 PDF印刷
    </button>
  );
};

export default PdfPrintButton;