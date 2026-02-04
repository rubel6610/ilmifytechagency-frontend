import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { TeamMember } from "@/redux/service/teamApi";
import QRCode from "qrcode";

// Function to generate QR code as base64
async function generateQRCodeBase64(text: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text, {
      width: 100,
      margin: 1,
      color: {
        dark: "#0DDAA0",
        light: "#FFFFFF",
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

export async function exportMembersToExcel(members: TeamMember[]) {
  if (members.length === 0) {
    throw new Error("No members to export");
  }

  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Team Management System";
  workbook.created = new Date();

  // Add a worksheet for member details
  const worksheet = workbook.addWorksheet("Team Members");

  // Define columns - IMPORTANT: Leave QR Code as the first column
  worksheet.columns = [
    { header: "QR Code", key: "qrCode", width: 15 },
    { header: "Employee ID", key: "employeeId", width: 20 },
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Position", key: "position", width: 20 },
    { header: "Department", key: "department", width: 40 },
    { header: "Experience", key: "experience", width: 15 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "LinkedIn", key: "linkedin", width: 40 },
    { header: "Start Date", key: "startDate", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Skills", key: "skills", width: 30 },
    { header: "Description", key: "description", width: 40 },
    { header: "Profile URL", key: "profileUrl", width: 40 },
  ];

  // Style the header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = {
    bold: true,
    color: { argb: "FFFFFFFF" },
    size: 12,
  };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0DDAA0" },
  };
  headerRow.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  headerRow.height = 30;

  // Set QR code column width explicitly
  worksheet.getColumn("qrCode").width = 20;

  // Import SweetAlert2
  const Swal = await import("sweetalert2").then((module) => module.default);

  // Show loading alert
  const loadingAlert = Swal.fire({
    title: "Generating Excel File",
    html: `
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ddaa0] mb-4"></div>
        <p>Processing ${members.length} members...</p>
        <p class="text-sm text-gray-500 mt-2">Generating QR codes and preparing data</p>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div class="bg-[#0ddaa0] h-2 rounded-full" style="width: 0%"></div>
        </div>
      </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: false,
  });

  try {
    // Process all members
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const rowIndex = i + 2; // +2 because row 1 is header

      // Update progress every member
      if (i % 1 === 0) {
        // Update more frequently
        const progress = ((i + 1) / members.length) * 100;
        loadingAlert.update({
          html: `
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ddaa0] mb-4"></div>
              <p>Processing member ${i + 1} of ${members.length}</p>
              <p class="text-sm text-gray-500 mt-2">${member.fullName || member.employeeId}</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div class="bg-[#0ddaa0] h-2 rounded-full" style="width: ${progress}%"></div>
              </div>
            </div>
          `,
        });
      }

      // Generate profile URL (same as in modal)
      const profileUrl = `${window.location.origin}/scan/${member.employeeId}`;

      // Generate QR code
      const qrCodeValue = profileUrl;
      const qrCodeBase64 = await generateQRCodeBase64(qrCodeValue);

      // Add the data row first - THIS IS CRITICAL
      const rowData = {
        employeeId: member.employeeId || "N/A",
        fullName: member.fullName || "",
        position: member.position || "",
        department: member.department || "",
        experience: member.experience ? `${member.experience} years` : "",
        email: member.email || "",
        phone: member.phone ? String(member.phone) : "",
        linkedin: member.linkedin || "",
        startDate: member.startDate
          ? new Date(member.startDate).toLocaleDateString()
          : "",
        status: member.status || "ACTIVE",
        skills: Array.isArray(member.skills)
          ? member.skills.join(", ")
          : member.skills || "",
        description: member.description || "",
        profileUrl: profileUrl,
      };

      const row = worksheet.addRow(rowData);

      // Style the row
      row.font = { size: 11 };
      row.alignment = { vertical: "top", wrapText: true };

      // Set specific alignment for certain columns
      row.getCell("experience").alignment = {
        horizontal: "center",
        vertical: "top",
      };
      row.getCell("status").alignment = {
        horizontal: "center",
        vertical: "top",
      };

      // Alternate row colors
      if (i % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF0F9F5" },
        };
      }

      // Set row height to accommodate QR code
      row.height = 85;

      // Add QR code image if generated successfully
      if (qrCodeBase64) {
        try {
          // Extract base64 data
          const base64Data = qrCodeBase64.replace(
            /^data:image\/png;base64,/,
            "",
          );

          // Add image to workbook
          const imageId = workbook.addImage({
            base64: base64Data,
            extension: "png",
          });

          // Add image to worksheet - Position it in the QR Code column
          // Column index: 0 for column A (QR Code), row index is rowIndex-1 because ExcelJS uses 0-index
          worksheet.addImage(imageId, {
            tl: { col: 0, row: rowIndex - 1 },
            ext: { width: 70, height: 70 },
          });

          // Add a border around the image cell
          const qrCell = row.getCell("qrCode");
          qrCell.border = {
            top: { style: "thin", color: { argb: "FF0DDAA0" } },
            left: { style: "thin", color: { argb: "FF0DDAA0" } },
            bottom: { style: "thin", color: { argb: "FF0DDAA0" } },
            right: { style: "thin", color: { argb: "FF0DDAA0" } },
          };
          qrCell.alignment = { vertical: "middle", horizontal: "center" };
        } catch (imgError) {
          console.error("Error adding image to Excel:", imgError);
          // If image fails, show text instead

          row.getCell("qrCode").alignment = {
            horizontal: "center",
            vertical: "middle",
          };
        }
      } else {
        // If QR code generation fails
        row.getCell("qrCode").value = "QR Code";
        row.getCell("qrCode").alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        row.getCell("qrCode").font = { color: { argb: "FFFF0000" } };
      }
    }

    // Auto-fit all columns except QR code column
    worksheet.columns.forEach((column, colIndex) => {
      if (colIndex !== 0) {
        // Skip QR code column (index 0)
        let maxLength = column.header?.length || 0;

        // Get all cell values in this column
        const columnValues = worksheet.getColumn(colIndex + 1).values;

        columnValues.forEach((cellValue: any) => {
          if (cellValue) {
            const cellLength = cellValue.toString().length;
            if (cellLength > maxLength) {
              maxLength = cellLength;
            }
          }
        });

        // Set column width (with some padding)
        column.width = Math.min(maxLength + 2, 50);
      }
    });

    // Add hyperlinks to LinkedIn and Profile URL columns
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const linkedinCell = worksheet.getCell(`H${i}`); // Column H is LinkedIn
      const profileCell = worksheet.getCell(`N${i}`); // Column N is Profile URL

      if (
        linkedinCell.value &&
        linkedinCell.value.toString().startsWith("http")
      ) {
        linkedinCell.value = {
          text: linkedinCell.value.toString(),
          hyperlink: linkedinCell.value.toString(),
        };
        linkedinCell.font = {
          color: { argb: "FF0000FF" },
          underline: true,
        };
      }

      if (
        profileCell.value &&
        profileCell.value.toString().startsWith("http")
      ) {
        profileCell.value = {
          text: "View Profile",
          hyperlink: profileCell.value.toString(),
        };
        profileCell.font = {
          color: { argb: "FF0DDAA0" },
          underline: true,
        };
      }
    }

    // Add a summary sheet
    const summarySheet = workbook.addWorksheet("Summary");

    // Add summary data
    summarySheet.columns = [
      { header: "Metric", key: "metric", width: 30 },
      { header: "Value", key: "value", width: 20 },
    ];

    // Style summary header
    const summaryHeader = summarySheet.getRow(1);
    summaryHeader.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    summaryHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0DDAA0" },
    };
    summaryHeader.alignment = { vertical: "middle", horizontal: "center" };
    summaryHeader.height = 30;

    // Calculate department distribution
    const departmentCounts = members.reduce(
      (acc, member) => {
        const dept = member.department || "Unknown";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Add summary rows
    summarySheet.addRow({ metric: "Total Members", value: members.length });
    summarySheet.addRow({
      metric: "Active Members",
      value: members.filter((m) => m.status === "ACTIVE").length,
    });
    summarySheet.addRow({
      metric: "Inactive Members",
      value: members.filter((m) => m.status === "INACTIVE").length,
    });
    summarySheet.addRow({ metric: "", value: "" });

    summarySheet.addRow({ metric: "Department Distribution", value: "" });
    Object.entries(departmentCounts).forEach(([dept, count]) => {
      summarySheet.addRow({ metric: `  ${dept}`, value: count });
    });

    // Add experience statistics
    const experiences = members.map((m) =>
      parseFloat(m.experience?.toString() || "0"),
    );
    const avgExperience =
      experiences.length > 0
        ? (experiences.reduce((a, b) => a + b, 0) / experiences.length).toFixed(
            1,
          )
        : "0";

    summarySheet.addRow({ metric: "", value: "" });
    summarySheet.addRow({ metric: "Experience Statistics", value: "" });
    summarySheet.addRow({
      metric: "  Average Experience",
      value: `${avgExperience} years`,
    });
    summarySheet.addRow({
      metric: "  Max Experience",
      value: `${Math.max(...experiences)} years`,
    });
    summarySheet.addRow({
      metric: "  Min Experience",
      value: `${Math.min(...experiences)} years`,
    });

    // Style summary rows
    for (let i = 2; i <= summarySheet.rowCount; i++) {
      const row = summarySheet.getRow(i);
      row.font = { size: 11 };
      if (i % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF0F9F5" },
        };
      }
    }

    // Auto-fit summary columns
    summarySheet.columns.forEach((column) => {
      let maxLength = column.header?.length || 0;
      const columnValues = summarySheet.getColumn(column.key!).values as any[];

      columnValues.forEach((cellValue) => {
        if (cellValue) {
          const cellLength = cellValue.toString().length;
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        }
      });

      column.width = Math.min(maxLength + 2, 40);
    });

    // Add a QR code instructions sheet
    const instructionsSheet = workbook.addWorksheet("Instructions");
    instructionsSheet.columns = [
      { header: "Information", key: "info", width: 80 },
    ];

    instructionsSheet.addRow(["TEAM MEMBERS EXPORT - INSTRUCTIONS"]);
    instructionsSheet.addRow([]);
    instructionsSheet.addRow(["Sheet 1: Team Members"]);
    instructionsSheet.addRow([
      "  • Column A: QR Code - Scan to view employee profile",
    ]);
    instructionsSheet.addRow([
      "  • Column N: Profile URL - Click to view profile",
    ]);
    instructionsSheet.addRow([
      "  • Column H: LinkedIn - Click to visit LinkedIn profile",
    ]);
    instructionsSheet.addRow([]);
    instructionsSheet.addRow(["Sheet 2: Summary"]);
    instructionsSheet.addRow(["  • Statistics and department distribution"]);
    instructionsSheet.addRow([]);
    instructionsSheet.addRow(["QR Code Information:"]);
    instructionsSheet.addRow([
      `  • Each QR code links to: ${window.location.origin}/scan/{employeeId}`,
    ]);
    instructionsSheet.addRow(["  • Scan with any QR code reader app"]);
    instructionsSheet.addRow([
      "  • QR codes contain employee's unique profile URL",
    ]);
    instructionsSheet.addRow([]);
    instructionsSheet.addRow(["Generated Information:"]);
    instructionsSheet.addRow([`  • Date: ${new Date().toLocaleDateString()}`]);
    instructionsSheet.addRow([`  • Time: ${new Date().toLocaleTimeString()}`]);
    instructionsSheet.addRow([`  • Total Records: ${members.length}`]);

    // Style instructions sheet
    const titleRow = instructionsSheet.getRow(1);
    titleRow.font = { bold: true, size: 14, color: { argb: "FF0DDAA0" } };
    titleRow.height = 25;

    for (let i = 1; i <= instructionsSheet.rowCount; i++) {
      const row = instructionsSheet.getRow(i);
      if (i > 1) {
        row.font = { size: 11 };
      }
      if (i % 2 === 0 && i > 2) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF9F9F9" },
        };
      }
    }

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Close loading alert
    loadingAlert.close();

    // Save the file
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .split(".")[0];

    const fileName = `Team-Members-Export-${timestamp}.xlsx`;
    saveAs(blob, fileName);

    return fileName;
  } catch (error) {
    loadingAlert.close();
    console.error("Error exporting to Excel:", error);
    throw error;
  }
}
