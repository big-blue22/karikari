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
      // Create a new PDF document with optimized settings for Japanese text
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // Reduced margin for more content space
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Set a default font that handles Japanese better
      // Use built-in fonts for better compatibility
      pdf.setFont("helvetica");

      // Add title with romanized text to avoid encoding issues
      pdf.setFontSize(20); // Reduced font size
      pdf.setTextColor(220, 20, 60); // Dark red color
      pdf.text('Minecraft Command Guide', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      pdf.setFontSize(16);
      pdf.setTextColor(255, 140, 0); // Orange
      pdf.text('Maikura Komando no Sho', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 12;

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Keyboard layout and commands to master Minecraft!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Try to capture keyboard image with optimized size
      const keyboardElement = document.querySelector('img[alt*="キーボード"]') as HTMLImageElement;
      if (keyboardElement) {
        try {
          const canvas = await html2canvas(keyboardElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            scale: 0.5 // Reduce image quality for smaller file size
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 0.6);
          const maxImgHeight = 60; // Limit image height
          const imgWidth = contentWidth * 0.8; // Use 80% of content width
          const imgHeight = Math.min(maxImgHeight, (canvas.height * imgWidth) / canvas.width);
          const imgX = margin + (contentWidth - imgWidth) / 2; // Center the image

          pdf.setFontSize(14);
          pdf.setTextColor(255, 140, 0); // Orange
          pdf.text('Keyboard Layout', margin, yPosition);
          yPosition += 8;

          pdf.addImage(imgData, 'JPEG', imgX, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 12;
        } catch (error) {
          console.warn('Failed to capture keyboard image:', error);
          // Add placeholder text instead
          pdf.setFontSize(14);
          pdf.setTextColor(255, 140, 0);
          pdf.text('Keyboard Layout', margin, yPosition);
          yPosition += 8;
          
          pdf.setFontSize(9);
          pdf.setTextColor(100, 100, 100);
          pdf.text('(Keyboard image would appear here when available)', margin, yPosition);
          yPosition += 15;
        }
      }

      // Add command list with optimized layout
      pdf.setFontSize(16);
      pdf.setTextColor(255, 140, 0);
      pdf.text('Command List', margin, yPosition);
      yPosition += 10;

      // Group commands by category
      const groupedCommands = MINECRAFT_COMMANDS.reduce((acc, command) => {
        (acc[command.category] = acc[command.category] || []).push(command);
        return acc;
      }, {} as Record<string, typeof MINECRAFT_COMMANDS>);

      // Convert category names to romanized versions for better PDF display
      const categoryTranslations = {
        [COMMAND_CATEGORIES.MOVEMENT]: 'Movement Commands (Ido no Komando)',
        [COMMAND_CATEGORIES.WORLD]: 'World Settings (World Settei)', 
        [COMMAND_CATEGORIES.WORLD_EDIT]: 'World Edit Commands'
      };

      // Optimize layout: use two columns for commands if space allows
      const leftColumnX = margin;
      const rightColumnX = pageWidth / 2 + 5;
      const columnWidth = (contentWidth - 10) / 2;
      
      let currentColumn = 0; // 0 = left, 1 = right
      let leftColumnY = yPosition;
      let rightColumnY = yPosition;

      // Add each category
      Object.entries(COMMAND_CATEGORIES).forEach(([key, categoryName]) => {
        const commands = groupedCommands[categoryName];
        if (!commands) return;

        const translatedCategoryName = categoryTranslations[categoryName] || categoryName;
        const currentY = currentColumn === 0 ? leftColumnY : rightColumnY;
        const currentX = currentColumn === 0 ? leftColumnX : rightColumnX;

        // Check if we need a new page
        const estimatedHeight = commands.length * 12 + 15; // Rough estimate
        if (currentY + estimatedHeight > pageHeight - margin) {
          // If right column, try left column of new page
          if (currentColumn === 1) {
            pdf.addPage();
            leftColumnY = margin;
            rightColumnY = margin;
            currentColumn = 0;
          } else {
            // Try right column first
            if (rightColumnY + estimatedHeight <= pageHeight - margin) {
              currentColumn = 1;
            } else {
              pdf.addPage();
              leftColumnY = margin;
              rightColumnY = margin;
              currentColumn = 0;
            }
          }
        }

        const finalY = currentColumn === 0 ? leftColumnY : rightColumnY;
        const finalX = currentColumn === 0 ? leftColumnX : rightColumnX;

        // Category title
        pdf.setFontSize(12);
        pdf.setTextColor(255, 140, 0);
        pdf.text(translatedCategoryName, finalX, finalY);
        
        let categoryY = finalY + 6;

        // Commands in this category
        commands.forEach((command) => {
          // Check if we need to switch columns or pages
          if (categoryY + 10 > pageHeight - margin) {
            if (currentColumn === 0) {
              currentColumn = 1;
              categoryY = rightColumnY;
            } else {
              pdf.addPage();
              currentColumn = 0;
              leftColumnY = margin;
              rightColumnY = margin;
              categoryY = margin;
            }
          }

          const cmdX = currentColumn === 0 ? leftColumnX : rightColumnX;

          // Command - using monospace for better readability
          pdf.setFont("courier");
          pdf.setFontSize(9);
          pdf.setTextColor(0, 150, 0); // Green
          pdf.text(command.command, cmdX + 2, categoryY);
          categoryY += 4;

          // Description with text wrapping - convert to romaji for better display
          pdf.setFont("helvetica");
          pdf.setFontSize(8);
          pdf.setTextColor(60, 60, 60);
          
          // Simplified description in English to avoid encoding issues
          let description = command.description;
          // Basic Japanese to romanized conversions for common terms
          description = description.replace(/時間/g, 'jikan (time)');
          description = description.replace(/朝/g, 'asa (morning)');
          description = description.replace(/天気/g, 'tenki (weather)');
          description = description.replace(/晴れ/g, 'hare (clear)');
          description = description.replace(/テレポート/g, 'teleport');
          description = description.replace(/コマンド/g, 'command');
          description = description.replace(/座標/g, 'zahyo (coordinates)');
          description = description.replace(/確認/g, 'kakunin (check)');
          description = description.replace(/道具/g, 'dougu (tool)');
          description = description.replace(/範囲/g, 'han-i (range)');
          description = description.replace(/ブロック/g, 'block');
          description = description.replace(/コピー/g, 'copy');
          description = description.replace(/基準点/g, 'kijunten (reference point)');
          description = description.replace(/切り取り/g, 'kiritori (cut)');
          description = description.replace(/貼り付け/g, 'haritsuke (paste)');

          const lines = pdf.splitTextToSize(description, columnWidth - 4);
          pdf.text(lines, cmdX + 2, categoryY);
          categoryY += lines.length * 3 + 2;
        });

        // Update column positions
        if (currentColumn === 0) {
          leftColumnY = categoryY + 4;
        } else {
          rightColumnY = categoryY + 4;
          currentColumn = 0; // Switch back to left column for next category
        }
      });

      // Add footer on the last page
      const footerY = pageHeight - 8;
      pdf.setFontSize(7);
      pdf.setTextColor(120, 120, 120);
      pdf.text('© 2024 Minecraft Command Guide', pageWidth / 2, footerY, { align: 'center' });

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