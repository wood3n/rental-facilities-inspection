import React from "react";

import { Page, Text, View, Document, StyleSheet, Font, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { InspectionSection } from "./types";

Font.register({
  family: "NotoSansSC",
  src: "/NotoSansSC-Regular.ttf"
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
    fontSize: 16,
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
  header: {
    fontWeight: "bold",
    backgroundColor: "#eee"
  }
});

interface Props {
  sections: InspectionSection[];
}

const InspectionReportDocument: React.FC<Props> = ({ sections }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>租房检查清单</Text>
      {sections.map((section) => (
        <View key={section.id} wrap={false} style={{ marginBottom: 24 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items?.map((item) => (
            <View
              style={{ height: 68, marginBottom: 8, display: "flex", flexDirection: "row", border: "1px solid #000" }}
              key={item.id}
            >
              <View style={{ flex: 2, borderRight: "1px solid #000" }}>
                <Text>{item.item || ""}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{item.result || ""}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export const PdfExportButton: React.FC<Props> = ({ sections }) => (
  <PDFDownloadLink document={<InspectionReportDocument sections={sections} />} fileName="租房检查清单.pdf">
    {({ loading }) => {
      return (
        <Button disabled={loading} size="lg" className="gap-2">
          {loading ? <Loader2Icon className="animate-spin" /> : <Download className="h-4 w-4" />}
          导出 PDF
        </Button>
      );
    }}
  </PDFDownloadLink>
);
