import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  TextRun,
  ShadingType,
} from 'docx';

export const exportDocx = async ({
  fileName,
  title,
  columns,
  rowCount,
  headerColor,
}) => {
  const headerRow = new TableRow({
    children: columns.map(col => (
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: col, bold: true })],
          }),
        ],
        shading: {
          type: ShadingType.SOLID,
          fill: headerColor.replace('#', ''),
        },
      })
    )),
  });

  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(
      new TableRow({
        children: columns.map(() => new TableCell({
          children: [new Paragraph('')],
        })),
      })
    );
  }

  const table = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [headerRow, ...rows],
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 40,
              }),
            ],
          }),
          new Paragraph({}),
          table,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${fileName}.docx`;
  a.click();
};
