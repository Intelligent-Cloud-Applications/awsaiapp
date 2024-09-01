import * as XLSX from 'xlsx';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const handleExportExcel = (user, userData, tempInstitution, members, filter) => {
  let institution;
  if (user.profile.institutionName === "awsaiapp") {
    institution = userData.institutionName;
  } else {
    institution = userData.institutionName || tempInstitution;
  }
  const instituteName = institution;

  const filteredData = members.filter((member) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return member.status === 'Active';
    if (filter === 'Inactive') return member.status !== 'Active';
    return true;
  });

  function formatEpochToReadableDate(epochDate) {
    const date = isNaN(epochDate) ? new Date(parseFloat(epochDate)) : new Date(epochDate);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  const excelData = filteredData.map((member) => {
    const phoneNumber = member.phoneNumber ? parsePhoneNumberFromString(member.phoneNumber)?.formatInternational() : '';

    return {
      Name: member.userName,
      Email: member.emailId,
      Phone: phoneNumber,
      JoiningDate: formatEpochToReadableDate(member.joiningDate),
      Country: member.country,
      Attendance: member.zpoints || 0,
      Status: member.status,
      Due: member.balance,
      Product: member.product,
    };
  });

  const ws = XLSX.utils.json_to_sheet(excelData, {
    header: [
      "Name",
      "Email",
      "Phone",
      "JoiningDate",
      "Country",
      "Attendance",
      "Status",
      "Due",
      "Product"
    ]
  });

  const wscols = [
    { wpx: 120 }, // Name
    { wpx: 200 }, // Email
    { wpx: 100 }, // Phone
    { wpx: 120 }, // Joining Date
    { wpx: 100 }, // Country
    { wpx: 100 }, // Attendance
    { wpx: 100 }, // Status
    { wpx: 100 }, // Due
    { wpx: 120 }, // Product
  ];

  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Members List");

  const fileName = `${instituteName} Members List - ${filter} - ${filteredData.length}.xlsx`;

  XLSX.writeFile(wb, fileName);
};
