import * as XLSX from 'xlsx';

export const exportExcel = ({ fileName, title, columns, rowCount, headerColor }) => {
  const data = [];
  data.push([title]);
  data.push(columns);

  for (let i = 0; i < rowCount; i++) {
    data.push(Array.from({ length: columns.length }, () => ''));
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Center align title + merge row
  worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } }];
  worksheet['A1'].s = { alignment: { horizontal: 'center' } };

  // Apply header background
  columns.forEach((_, i) => {
    const cell = XLSX.utils.encode_cell({ r: 1, c: i });
    if (!worksheet[cell]) worksheet[cell] = {};
    worksheet[cell].s = {
      fill: { fgColor: { rgb: headerColor.replace('#', '').toUpperCase() } },
    };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title.slice(0, 31));
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
