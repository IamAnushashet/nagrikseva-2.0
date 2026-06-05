import applicationsData from './generated/applications.json';
import citizensData from './generated/citizens.json';
import complaintsData from './generated/complaints.json';
import identityRecordsData from './generated/identityRecords.json';
import localityIntelligenceData from './generated/localityIntelligence.json';

export const citizens = citizensData;
export const generatedApplications = applicationsData;
export const generatedComplaints = complaintsData;
export const identityRecords = identityRecordsData;
export const localityIntelligence = localityIntelligenceData;

export const activeCitizen = citizens[0];
export const activeIdentity = identityRecords.find((record) => record.citizenId === activeCitizen.id);
export const activeApplications = generatedApplications
  .filter((application) => application.citizenId === activeCitizen.id)
  .slice(0, 8);
export const activeComplaints = generatedComplaints
  .filter((complaint) => complaint.citizenId === activeCitizen.id)
  .slice(0, 6);
export const activeLocalitySignals = localityIntelligence
  .filter((signal) => signal.district === activeCitizen.address.district)
  .slice(0, 5);

export const datasetStats = {
  citizens: citizens.length,
  applications: generatedApplications.length,
  complaints: generatedComplaints.length,
  identityRecords: identityRecords.length,
  localities: localityIntelligence.length,
  deactivationReviews: citizens.filter((citizen) => citizen.accountStatus !== 'Active').length,
  overdueRisk: generatedApplications.filter((application) => application.riskLevel === 'Attention').length,
};
