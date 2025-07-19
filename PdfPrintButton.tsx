import React from 'react';
import jsPDF from 'jspdf';

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

      // Use standard fonts for maximum compatibility
      pdf.setFont("helvetica", "bold");

      // Main Title
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('MINECRAFT COMMAND GUIDE', pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      pdf.text('Essential commands and keyboard shortcuts', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Create command data with English descriptions to avoid encoding issues
      const commandData = [
        {
          category: 'WORLD SETTINGS',
          commands: [
            { cmd: '/time set 0', desc: 'Set time to morning/dawn (6000 ticks)' },
            { cmd: '/weather clear', desc: 'Clear weather and stop rain/snow' }
          ]
        },
        {
          category: 'MOVEMENT & TELEPORT',
          commands: [
            { cmd: '/tp @p 0 0 0', desc: 'Teleport player to coordinates (0,0,0). Use F3 to see coordinates.' }
          ]
        },
        {
          category: 'WORLD EDIT COMMANDS',
          commands: [
            { cmd: '//wand', desc: 'Get World Edit tool (wooden axe for selecting areas)' },
            { cmd: '//set stone', desc: 'Fill selected area with stone blocks. Replace "stone" with other block types.' },
            { cmd: '//copy', desc: 'Copy selected area. Your position becomes the copy reference point.' },
            { cmd: '//cut', desc: 'Cut/remove selected area and store in clipboard' },
            { cmd: '//paste', desc: 'Paste copied/cut area at your current position' }
          ]
        }
      ];

      // Add keyboard section header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('KEYBOARD SHORTCUTS', margin, yPos);
      yPos += 8;

      // Add keyboard info
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      const keyboardInfo = [
        'F3: Show coordinates and debug information',
        'F3 + H: Show advanced tooltips (item durability, etc.)',
        'Tab: Auto-complete commands',
        'T: Open chat/command input',
        '↑/↓ arrows: Navigate command history'
      ];
      
      keyboardInfo.forEach(info => {
        pdf.text('• ' + info, margin, yPos);
        yPos += 5;
      });
      yPos += 8;

      // Add commands section
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('COMMAND REFERENCE', margin, yPos);
      yPos += 10;

      // Process each category
      commandData.forEach(category => {
        // Check if we have enough space for this category (rough estimate)
        const estimatedSpace = category.commands.length * 15 + 15;
        if (yPos + estimatedSpace > pageHeight - margin - 20) {
          // Not enough space, but we want everything on one page, so make text smaller
          pdf.setFontSize(9);
        }

        // Category title
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(0, 100, 200); // Blue color for categories
        pdf.text(category.category, margin, yPos);
        yPos += 8;

        // Commands in this category
        category.commands.forEach(cmd => {
          // Command text in monospace
          pdf.setFont("courier", "bold");
          pdf.setFontSize(10);
          pdf.setTextColor(0, 150, 0); // Green for commands
          pdf.text(cmd.cmd, margin + 5, yPos);
          yPos += 5;

          // Description
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9);
          pdf.setTextColor(40, 40, 40);
          
          // Wrap text if too long
          const lines = pdf.splitTextToSize(cmd.desc, contentWidth - 10);
          pdf.text(lines, margin + 5, yPos);
          yPos += lines.length * 4 + 3;
        });
        yPos += 5; // Space between categories
      });

      // Add usage tips section if we have space
      if (yPos < pageHeight - margin - 40) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(200, 100, 0); // Orange for tips
        pdf.text('USAGE TIPS', margin, yPos);
        yPos += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(60, 60, 60);
        const tips = [
          '• All commands start with / or // (for World Edit)',
          '• Use Tab key to auto-complete command names',
          '• @p = nearest player, @s = yourself, @a = all players',
          '• World Edit requires the World Edit plugin/mod',
          '• Always make backups before using World Edit commands'
        ];

        tips.forEach(tip => {
          if (yPos < pageHeight - margin - 10) {
            pdf.text(tip, margin, yPos);
            yPos += 4.5;
          }
        });
      }

      // Add footer
      const footerY = pageHeight - 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text('Minecraft Command Guide - Generated from minecraft-helper', pageWidth / 2, footerY, { align: 'center' });

      // Save the PDF
      pdf.save('minecraft-helper-guide.pdf');
      
      // Show success message
      alert('PDF file downloaded successfully! / PDFファイルがダウンロードされました！');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again. / PDFの生成に失敗しました。');
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