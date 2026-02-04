import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { TeamMember } from "@/redux/service/teamApi";

interface QRCodeData {
  employeeId: string;
  qrCodeUrl: string;
}

export async function exportMembersToExcel(
  members: TeamMember[],
  qrCodes: QRCodeData[] = [],
) {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();

  // Add a worksheet
  const worksheet = workbook.addWorksheet("Team Members");

  // Define columns
  worksheet.columns = [
    { header: "Employee ID", key: "employeeId", width: 20 },
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Position", key: "position", width: 20 },
    { header: "Department", key: "department", width: 20 },
    { header: "Experience", key: "experience", width: 15 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "LinkedIn", key: "linkedin", width: 40 },
    { header: "Start Date", key: "startDate", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Skills", key: "skills", width: 30 },
    { header: "Description", key: "description", width: 40 },
    { header: "QR Code URL", key: "qrCodeUrl", width: 50 },
    { header: "Profile URL", key: "profileUrl", width: 50 },
  ];

  // Style the header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0DDAA0" }, // Green color
  };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };

  // Add data rows
  members.forEach((member, index) => {
    const qrCode = qrCodes.find((qr) => qr.employeeId === member.employeeId);
    const profileUrl = `${window.location.origin}/scan/${member.employeeId}`;

    const row = worksheet.addRow({
      employeeId: member.employeeId || "",
      fullName: member.fullName || "",
      position: member.position || "",
      department: member.department || "",
      experience: member.experience || "",
      email: member.email || "",
      phone: member.phone || "",
      linkedin: member.linkedin || "",
      startDate: member.startDate
        ? new Date(member.startDate).toLocaleDateString()
        : "",
      status: member.status || "",
      skills: Array.isArray(member.skills)
        ? member.skills.join(", ")
        : member.skills || "",
      description: member.description || "",
      qrCodeUrl: qrCode?.qrCodeUrl || profileUrl,
      profileUrl: profileUrl,
    });

    // Alternate row colors for better readability
    if (index % 2 === 0) {
      row.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF0F9F5" }, // Light green
      };
    }
  });

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    if (column.width) {
      const maxLength = Math.max(
        column.header!.length,
        ...worksheet
          .getColumn(column.key!)
          .values.slice(1)
          .map((v) => (v ? v.toString().length : 0)),
      );
      column.width = Math.min(maxLength + 5, 50);
    }
  });

  // Add a summary sheet
  const summarySheet = workbook.addWorksheet("Summary");

  // Add summary data
  summarySheet.columns = [
    { header: "Metric", key: "metric", width: 25 },
    { header: "Value", key: "value", width: 20 },
  ];

  // Style summary header
  const summaryHeader = summarySheet.getRow(1);
  summaryHeader.font = { bold: true, color: { argb: "FFFFFFFF" } };
  summaryHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0DDAA0" },
  };

  // Add summary rows
  const departmentCounts = members.reduce(
    (acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  summarySheet.addRow({ metric: "Total Members", value: members.length });
  summarySheet.addRow({
    metric: "Active Members",
    value: members.filter((m) => m.status === "ACTIVE").length,
  });
  summarySheet.addRow({
    metric: "Inactive Members",
    value: members.filter((m) => m.status === "INACTIVE").length,
  });
  summarySheet.addRow({ metric: "", value: "" }); // Empty row

  summarySheet.addRow({ metric: "Department Distribution", value: "" });
  Object.entries(departmentCounts).forEach(([dept, count]) => {
    summarySheet.addRow({ metric: `  ${dept}`, value: count });
  });

  // Generate the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Save the file
  const date = new Date().toISOString().split("T")[0];
  saveAs(blob, `team-members-${date}.xlsx`);
}

// Function to generate QR code data URLs (if needed)
export function generateQRCodeUrl(employeeId: string): string {
  const profileUrl = `${window.location.origin}/scan/${employeeId}`;

  // You can use a QR code generation service or implement your own
  // For now, we'll return a URL to a QR code generation API
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}`;
}
