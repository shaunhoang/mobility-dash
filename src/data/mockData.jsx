const fileFormats = ['CSV', 'GeoJSON', 'XLSX', 'JSON'];
const coverages = ['EB', 'Ward', 'City', 'Tehsil', 'District'];
const themes = [
    'Administrative',
    'Demographic',
    'Economy',
    'Environment',
    'Land Use',
    'Private Vehicles',
    'Public Finance',
    'Public Safety & Health',
    'Public Transportation',
    'Resource Use',
    'Satellite Images',
    'Services',
    'Transport Network',
    'Transport Statistics',
    'Travel Demand',
    'Urban Development',
    'Waste Management'
];

export const generateMockData = (count) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `Dataset ${i}`,
      description: `This is a detailed description for dataset ${i}. It explains the purpose, scope, and potential use cases of the data provided. The data is collected annually and updated every quarter.`,
      format: fileFormats[i % fileFormats.length],
      coverage: coverages[i % coverages.length],
      theme: themes[i % themes.length],
      fileUrl: `/downloads/dataset_${i}.zip`,
    });
  }
  return data;
  
};

export { fileFormats, coverages, themes };
