import jsPDF from 'jspdf';
import { ScanResult, Vulnerability } from './scannerService';

export function generatePDFReport(scanResult: ScanResult): void {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 10;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(33, 99, 235); // Blue color
  doc.text('Web Security Assessment Report', margin, yPos);
  yPos += lineHeight * 2;

  // Scan Information
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Target: ${scanResult.target}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Scan Date: ${scanResult.scanDate}`, margin, yPos);
  yPos += lineHeight * 2;

  // Summary
  doc.setFontSize(16);
  doc.setTextColor(33, 99, 235);
  doc.text('Summary', margin, yPos);
  yPos += lineHeight;

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Total Vulnerabilities: ${scanResult.summary.total}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`High Severity: ${scanResult.summary.high}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Medium Severity: ${scanResult.summary.medium}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Low Severity: ${scanResult.summary.low}`, margin, yPos);
  yPos += lineHeight * 2;

  // Vulnerabilities
  doc.setFontSize(16);
  doc.setTextColor(33, 99, 235);
  doc.text('Detailed Findings', margin, yPos);
  yPos += lineHeight * 1.5;

  scanResult.vulnerabilities.forEach((vuln: Vulnerability) => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - 50) {
      doc.addPage();
      yPos = 20;
    }

    // Vulnerability Name
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(vuln.name, margin, yPos);
    yPos += lineHeight;

    // Severity
    doc.setFontSize(12);
    doc.setTextColor(vuln.severity === 'high' ? 220 : vuln.severity === 'medium' ? 180 : 33, 
                     vuln.severity === 'high' ? 53 : vuln.severity === 'medium' ? 130 : 99,
                     vuln.severity === 'high' ? 69 : vuln.severity === 'medium' ? 0 : 235);
    doc.text(`Severity: ${vuln.severity.toUpperCase()}`, margin, yPos);
    yPos += lineHeight;

    // Description and Details
    doc.setTextColor(60);
    const descriptionLines = doc.splitTextToSize(vuln.description, pageWidth - (margin * 2));
    doc.text(descriptionLines, margin, yPos);
    yPos += lineHeight * descriptionLines.length;

    const detailsLines = doc.splitTextToSize(vuln.details, pageWidth - (margin * 2));
    doc.text(detailsLines, margin, yPos);
    yPos += lineHeight * detailsLines.length;

    // Recommendation
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('Recommendation:', margin, yPos);
    yPos += lineHeight;
    
    doc.setTextColor(60);
    const recommendationLines = doc.splitTextToSize(vuln.recommendation, pageWidth - (margin * 2));
    doc.text(recommendationLines, margin, yPos);
    yPos += lineHeight * (recommendationLines.length + 1);
  });

  // Save the PDF
  doc.save('security-assessment-report.pdf');
} 