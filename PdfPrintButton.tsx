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
      // Create a new PDF document with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin; // 170mm
      let yPos = margin;

      // Use standard fonts for Japanese text compatibility
      pdf.setFont("helvetica", "bold");

      // Main Title - Japanese
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('マイクラ コマンドの書', pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      pdf.text('基本的なコマンドとキーボード操作', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Try to capture keyboard image
      try {
        const keyboardElement = document.querySelector('img[alt*="キーボード"]');
        if (keyboardElement) {
          // Create a temporary container for the image
          const tempDiv = document.createElement('div');
          tempDiv.style.position = 'absolute';
          tempDiv.style.top = '-9999px';
          tempDiv.style.left = '-9999px';
          tempDiv.style.width = '400px';
          tempDiv.style.height = '200px';
          tempDiv.style.backgroundColor = 'white';
          tempDiv.style.padding = '10px';
          
          const img = document.createElement('img');
          img.src = keyboardElement.src;
          img.style.width = '100%';
          img.style.height = 'auto';
          tempDiv.appendChild(img);
          document.body.appendChild(tempDiv);

          // Wait for image to load
          await new Promise((resolve) => {
            img.onload = resolve;
            setTimeout(resolve, 1000); // Fallback timeout
          });

          const canvas = await html2canvas(tempDiv, {
            backgroundColor: '#ffffff',
            scale: 1,
            useCORS: true,
            allowTaint: true
          });

          document.body.removeChild(tempDiv);

          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 80;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add keyboard section header
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 0);
          pdf.text('キーボード配列', margin, yPos);
          yPos += 8;

          // Add keyboard image
          pdf.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, yPos, imgWidth, imgHeight);
          yPos += imgHeight + 10;
        }
      } catch (imageError) {
        console.warn('キーボード画像の取得に失敗しました:', imageError);
        // Continue without image
      }

      // Add keyboard shortcuts info
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      const keyboardInfo = [
        'F3: 座標とデバッグ情報を表示',
        'F3 + H: 詳細なツールチップを表示',
        'Tab: コマンドを自動補完',
        'T: チャット/コマンド入力を開く'
      ];
      
      keyboardInfo.forEach(info => {
        pdf.text('• ' + info, margin, yPos);
        yPos += 4;
      });
      yPos += 8;

      // Organize commands by category from constants
      const commandsByCategory = {};
      MINECRAFT_COMMANDS.forEach(cmd => {
        if (!commandsByCategory[cmd.category]) {
          commandsByCategory[cmd.category] = [];
        }
        commandsByCategory[cmd.category].push({
          cmd: cmd.command,
          desc: cmd.description
        });
      });

      // Add commands section
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('コマンド一覧', margin, yPos);
      yPos += 10;

      // Process each category
      Object.keys(commandsByCategory).forEach(categoryName => {
        const commands = commandsByCategory[categoryName];
        
        // Check if we need to use smaller text
        const remainingSpace = pageHeight - margin - 20 - yPos;
        const estimatedNeedSpace = commands.length * 12 + 10;
        
        if (estimatedNeedSpace > remainingSpace) {
          // Use smaller fonts to fit on one page
          pdf.setFontSize(9);
        }

        // Category title
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(0, 100, 200);
        pdf.text(categoryName, margin, yPos);
        yPos += 6;

        // Commands in this category
        commands.forEach(command => {
          // Command text
          pdf.setFont("courier", "bold");
          pdf.setFontSize(9);
          pdf.setTextColor(0, 150, 0);
          pdf.text(command.cmd, margin + 5, yPos);
          yPos += 4;

          // Description
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8);
          pdf.setTextColor(40, 40, 40);
          
          // Wrap text if too long
          const lines = pdf.splitTextToSize(command.desc, contentWidth - 10);
          pdf.text(lines, margin + 5, yPos);
          yPos += lines.length * 3.5 + 2;
        });
        yPos += 4; // Space between categories
      });

      // Add footer
      const footerY = pageHeight - 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text('マインクラフト コマンドガイド - minecraft-helper より生成', pageWidth / 2, footerY, { align: 'center' });

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