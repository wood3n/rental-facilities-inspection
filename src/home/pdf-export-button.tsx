import React from "react";

import { Page, Text, View, Document, StyleSheet, Font, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { InspectionSection } from "./types";

Font.register({
  family: "NotoSansSC",
  src: "/NotoSansSC-Regular.ttf"
});

Font.registerHyphenationCallback((word) => {
  // 对于中文，我们不进行连字，而是将每个字符作为一个独立的“单词”处理
  // 这样当一行放不下时，它会在下一个字符处自动换行
  return Array.from(word);
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansSC",
    padding: 20,
    fontSize: 12
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold"
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    flexDirection: "row"
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    overflowWrap: "anywhere",
    textWrap: "wrap"
  },
  tableCell: {
    fontFamily: "NotoSansSC",
    fontSize: 14,
    // 强制在任意字符之间断行
    wordBreak: "break-all",
    // 确保长单词或字符串在超出容器时换行
    overflowWrap: "break-word"
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#eee"
  }
});

interface Props {
  sections: InspectionSection[];
}

const InspectionReportDocument: React.FC<Props> = ({ sections }) => (
  <Document title="租房检查清单">
    {sections.map((section) => {
      return (
        <Page key={section.id} wrap size="A4" style={styles.page}>
          <View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.items?.map((item) => (
            <View key={item.id} style={{ border: "1px solid #000", marginBottom: 8 }}>
              <View style={{ padding: 8, borderBottom: "1px solid #000", backgroundColor: "#f0f0f0" }}>
                <Text style={styles.tableCell}>{item.item || ""}</Text>
              </View>
              <View style={{ height: 100 }}>
                <Text style={styles.tableCell}>{item.result || ""}</Text>
              </View>
            </View>
          ))}
        </Page>
      );
    })}
  </Document>
);

export const PdfExportButton: React.FC<Props> = ({ sections }) => (
  <PDFDownloadLink
    key={Date.now()}
    document={<InspectionReportDocument sections={sections} />}
    fileName="租房检查清单.pdf"
  >
    {({ loading }) => {
      return (
        <Button variant="outline" disabled={loading} size="lg" className="gap-2">
          {loading ? <Loader2Icon className="animate-spin" /> : <Download className="h-4 w-4" />}
          导出 PDF
        </Button>
      );
    }}
  </PDFDownloadLink>
);
