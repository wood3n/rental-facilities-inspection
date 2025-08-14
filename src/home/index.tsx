"use client";

import { useState } from "react";

import { Home, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import type { CheckItem, InspectionSection } from "./types";

import AddSection from "./add-section";
import AddSectionItem from "./add-section-item";
import { DefaultSections } from "./default-facilities";
import { PdfExportButton } from "./pdf-export-button";

export default function RentalInspectionForm() {
  const [inspectionData, setInspectionData] = useState<InspectionSection[]>(DefaultSections);

  const deleteSection = (sectionId: string) => {
    setInspectionData(inspectionData.filter((item) => item.id !== sectionId));
  };

  const updateCheckItem = (sectionId: string, itemId: string, field: string, value: string) => {
    setInspectionData(
      inspectionData.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items?.map((item) => (item.id === itemId ? { ...item, [field]: value } : item))
            }
          : section
      )
    );
  };

  const deleteCheckItem = (sectionId: string, itemId: string) => {
    setInspectionData(
      inspectionData.map((section) =>
        section.id === sectionId ? { ...section, items: section.items?.filter((item) => item.id !== itemId) } : section
      )
    );
  };

  const handleAddSection = (section: InspectionSection) => {
    setInspectionData((prev) => [
      ...prev,
      {
        ...section
      }
    ]);
  };

  const handleAddSectionItem = (sectionId: string, item: CheckItem) => {
    setInspectionData((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: [...(section.items || []), item]
            }
          : section
      )
    );
  };

  const renderCheckSection = (section: InspectionSection) => (
    <Card className="mb-6" key={section.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">{section.title}</h1>
          </div>
          <div className="flex gap-2">
            <AddSectionItem section={section} onSave={(item) => handleAddSectionItem(section.id, item)} />
            <Button
              onClick={() => deleteSection(section.id)}
              size="sm"
              variant="ghost"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">检查项</TableHead>
              <TableHead className="w-1/2">检查结果</TableHead>
              <TableHead className="w-[60px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {section.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Textarea
                    value={item.item}
                    onChange={(e) => updateCheckItem(section.id, item.id, "item", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={item.result}
                    onChange={(e) => updateCheckItem(section.id, item.id, "result", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteCheckItem(section.id, item.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Home className="h-6 w-6" />
          <h1 className="text-3xl font-bold">租房电器和设施检查表</h1>
        </div>
        <p className="text-muted-foreground">专业的租房检查表格，支持自定义检查项目和详细记录</p>
      </div>

      {/* 操作按钮区域 */}
      <div className="mb-6 flex items-center justify-between">
        <AddSection onSave={handleAddSection} />
        <PdfExportButton sections={inspectionData} />
      </div>

      {/* 检查项目 */}
      {inspectionData.map((section) => renderCheckSection(section))}

      {/* 隐藏的PDF内容 */}
      <div id="inspection-report" className="hidden print:block">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold">租房电器和设施检查报告</h1>
            <div className="text-sm text-gray-600">
              <p>检查日期: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {inspectionData.map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="mb-3 border-b pb-1 text-lg font-semibold">{section.title}</h2>
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">检查项</th>
                    <th className="border border-gray-300 p-2 text-left">结果</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items?.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 p-2">{item.item}</td>
                      <td className="border border-gray-300 p-2">{item.result || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
