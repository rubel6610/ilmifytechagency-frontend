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
        dark: "#000000",
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
  const Swal = await import("sweetalert2").then((m) => m.default);

  if (!members || members.length === 0) {
    await Swal.fire({
      icon: "warning",
      title: "No data found",
      text: "There are no team members to export",
      confirmButtonColor: "#0DDAA0",
    });
    return;
  }

  // Loading alert
  Swal.fire({
    title: "Exporting team members...",
    text: "Preparing Excel file and QR codes",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Team Management System";
    workbook.created = new Date();

    // Add worksheet
    const worksheet = workbook.addWorksheet("Team Members");

    worksheet.columns = [
      { header: "QR Code", key: "qrCode", width: 20 },
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

    // Header style
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0DDAA0" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height = 30;

    // Process members
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const rowIndex = i + 2;

      Swal.update({
        text: `Processing ${i + 1} of ${members.length} members...`,
      });

      const profileUrl = `${window.location.origin}/scan/${member.employeeId}`;
      const qrBase64 = await generateQRCodeBase64(profileUrl);

      const row = worksheet.addRow({
        employeeId: member.employeeId || "N/A",
        fullName: member.fullName || "",
        position: member.position || "",
        department: member.department || "",
        experience: member.experience
          ? `${member.experience} years`
          : "",
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
        description: member.memberDescription || "",
        profileUrl,
      });

      row.height = 85;
      row.font = { size: 11 };
      row.alignment = { vertical: "top", wrapText: true };

      if (i % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF0F9F5" },
        };
      }

      if (qrBase64) {
        const imgId = workbook.addImage({
          base64: qrBase64.replace(/^data:image\/png;base64,/, ""),
          extension: "png",
        });

        worksheet.addImage(imgId, {
          tl: { col: 0, row: rowIndex - 1 },
          ext: { width: 70, height: 70 },
        });
      }
    }

    // Generate Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fileName = `Team-Members-${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.xlsx`;

    saveAs(blob, fileName);

    Swal.fire({
      icon: "success",
      title: "Export completed ",
      text: "Excel file downloaded successfully",
      confirmButtonColor: "#0DDAA0",
    });

    return fileName;
  } catch (error) {
    console.error("Export failed:", error);

    Swal.fire({
      icon: "error",
      title: "Export failed",
      text: "Something went wrong while exporting. Please try again.",
      confirmButtonColor: "#e3342f",
    });

    throw error;
  }
}
