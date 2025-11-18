import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#',''), 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255,
  ];
}

export const exportPdf = ({ fileName, title, columns, rowCount, headerColor }) => {
  const doc = new jsPDF('landscape', 'pt', 'a4');

  const head = [columns];
  const body = Array.from({ length: rowCount }, () =>
    Array.from({ length: columns.length }, () => '')
  );

  const headerRGB = hexToRgb(headerColor);

  doc.setFontSize(18);
  // Center align title
  doc.text(title, doc.internal.pageSize.width / 2, 40, { align: 'center' });

  autoTable(doc, {
    head,
    body,
    startY: 70,
    styles: {
      fontSize: 8,
      halign: 'center',
      valign: 'middle',
    },
    headStyles: {
      fillColor: headerRGB,
      textColor: 20,
    },
    theme: 'grid',
  });

  doc.save(`${fileName}.pdf`);
};
