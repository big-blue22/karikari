import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MINECRAFT_COMMANDS } from './constants';
import ifLogo from '/public/ifロゴ.png';

export const generatePDF = async (keyboardImageUrl: string) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - (margin * 2);

  try {
    // HTML要素を作成してスタイリング
    const container = document.createElement('div');
    container.style.width = `${contentWidth * 3.78}px`; // mm to px (96dpi)
    container.style.padding = '20px';
    container.style.background = 'white';
    container.style.fontFamily = '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif';
    
    // ヘッダー部分（ロゴとタイトル）
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.marginBottom = '30px';
    headerDiv.style.gap = '20px';
    
    // ロゴ画像
    const logo = document.createElement('img');
    logo.src = ifLogo;
    logo.style.width = '80px';
    logo.style.height = '80px';
    logo.style.borderRadius = '8px';
    logo.style.border = '4px solid #FFD700';
    logo.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
    logo.style.flexShrink = '0';
    logo.crossOrigin = 'anonymous';
    
    // タイトル（中央配置）
    const title = document.createElement('h1');
    title.textContent = 'Minecraft キーボードショートカット一覧';
    title.style.textAlign = 'center';
    title.style.fontSize = '24px';  // フォントサイズを少し小さく
    title.style.fontWeight = 'bold';
    title.style.color = '#333';
    title.style.flex = '1';
    title.style.margin = '0';
    title.style.paddingRight = '80px'; // ロゴと同じ幅の右パディングでバランスを取る
    title.style.whiteSpace = 'nowrap';  // 改行を防ぐ
    
    // ロゴ画像の読み込みを待つ
    await new Promise((resolve, reject) => {
      logo.onload = resolve;
      logo.onerror = reject;
    });
    
    headerDiv.appendChild(logo);
    headerDiv.appendChild(title);
    container.appendChild(headerDiv);

    // キーボード画像
    const keyboardImg = document.createElement('img');
    keyboardImg.src = keyboardImageUrl;
    keyboardImg.style.width = '100%';
    keyboardImg.style.height = 'auto';
    keyboardImg.style.aspectRatio = '2 / 1';  // 縦横比を2:1に固定
    keyboardImg.style.objectFit = 'cover';
    keyboardImg.style.display = 'block';
    keyboardImg.style.margin = '0 auto 30px auto';
    keyboardImg.style.maxWidth = '100%';
    keyboardImg.crossOrigin = 'anonymous';
    
    await new Promise((resolve, reject) => {
      keyboardImg.onload = resolve;
      keyboardImg.onerror = reject;
    });
    
    container.appendChild(keyboardImg);

    // コマンド一覧タイトル
    const commandTitle = document.createElement('h2');
    commandTitle.textContent = 'コマンド一覧';
    commandTitle.style.textAlign = 'center';
    commandTitle.style.fontSize = '22px';
    commandTitle.style.fontWeight = 'bold';
    commandTitle.style.marginBottom = '15px';
    commandTitle.style.color = '#333';
    container.appendChild(commandTitle);

    // テーブルを作成
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontSize = '14px';
    table.style.marginBottom = '20px';

    // カテゴリーごとにグループ化
    const commandsByCategory = MINECRAFT_COMMANDS.reduce((acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    }, {} as Record<string, typeof MINECRAFT_COMMANDS>);

    // テーブルヘッダー
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.backgroundColor = '#4CAF50';
    headerRow.style.color = 'white';
    
    const th1 = document.createElement('th');
    th1.textContent = 'カテゴリー';
    th1.style.padding = '10px';
    th1.style.border = '1px solid #ddd';
    th1.style.textAlign = 'left';
    th1.style.width = '25%';
    
    const th2 = document.createElement('th');
    th2.textContent = 'コマンド';
    th2.style.padding = '10px';
    th2.style.border = '1px solid #ddd';
    th2.style.textAlign = 'left';
    th2.style.width = '30%';
    
    const th3 = document.createElement('th');
    th3.textContent = '説明';
    th3.style.padding = '10px';
    th3.style.border = '1px solid #ddd';
    th3.style.textAlign = 'left';
    th3.style.width = '50%';
    
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // テーブルボディ
    const tbody = document.createElement('tbody');
    let rowCount = 0;

    for (const [category, commands] of Object.entries(commandsByCategory)) {
      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        const row = document.createElement('tr');
        
        // 偶数行に背景色
        if (rowCount % 2 === 0) {
          row.style.backgroundColor = '#f9f9f9';
        }
        
        // カテゴリーセル（最初の行のみ作成）
        if (i === 0) {
          const categoryCell = document.createElement('td');
          categoryCell.textContent = category;
          categoryCell.rowSpan = commands.length;
          categoryCell.style.padding = '8px';
          categoryCell.style.border = '1px solid #ddd';
          categoryCell.style.fontWeight = 'bold';
          categoryCell.style.verticalAlign = 'top';
          categoryCell.style.backgroundColor = '#e8f5e9';
          categoryCell.style.fontSize = '14px';
          categoryCell.style.fontFamily = '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif';
          categoryCell.style.whiteSpace = 'nowrap';
          row.appendChild(categoryCell);
        }
        
        // コマンドセル
        const commandCell = document.createElement('td');
        commandCell.textContent = cmd.command;
        commandCell.style.padding = '8px';
        commandCell.style.border = '1px solid #ddd';
        commandCell.style.fontFamily = 'monospace';
        commandCell.style.fontWeight = 'bold';
        commandCell.style.color = '#2196F3';
        
        // 説明セル
        const descCell = document.createElement('td');
        descCell.textContent = cmd.description;
        descCell.style.padding = '8px';
        descCell.style.border = '1px solid #ddd';
        
        row.appendChild(commandCell);
        row.appendChild(descCell);
        tbody.appendChild(row);
        
        rowCount++;
      }
    }
    
    table.appendChild(tbody);
    container.appendChild(table);

    // 一時的にDOMに追加
    document.body.appendChild(container);

    // html2canvasでキャンバスに変換
    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      letterRendering: true,
      allowTaint: true,
      foreignObjectRendering: false
    });

    // DOMから削除
    document.body.removeChild(container);

    // キャンバスをPDFに追加
    const imgData = canvas.toDataURL('image/png');
    
    // A4サイズに合わせて画像を配置
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // 画像がページに収まるように調整
    let finalWidth = imgWidth;
    let finalHeight = imgHeight;
    
    if (imgHeight > pageHeight - (margin * 2)) {
      finalHeight = pageHeight - (margin * 2);
      finalWidth = (canvas.width * finalHeight) / canvas.height;
    }
    
    // 中央配置
    const xPos = (pageWidth - finalWidth) / 2;
    const yPos = margin;
    
    pdf.addImage(imgData, 'PNG', xPos, yPos, finalWidth, finalHeight);

    // PDFを保存
    pdf.save('minecraft-keyboard-commands.pdf');
    
  } catch (error) {
    console.error('PDF生成エラー:', error);
    alert('PDF生成中にエラーが発生しました。');
  }
};