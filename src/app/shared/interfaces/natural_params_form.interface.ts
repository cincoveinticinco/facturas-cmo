import { InfoAdditionalTypes, OcFileTypes } from "./files_types";

// Definir los tipos de información adicional
interface InfoAdditional {
  info_additional_type_id: InfoAdditionalTypes;
  value: string | boolean | number | null;
  description: string;
  document?: string;
}

// Definir la información de dependientes
interface DependentInfo {
  documentType: number | null;
  document: string | null;
  name: string | null;
  kinship: string | null;
  infoAdditional: InfoAdditional[];
}

// Definir los documentos del proveedor
interface VendorDocument {
  document_type_id: OcFileTypes;
  link?: string;
  document?: string;
}

// Definir la estructura de formValue
export interface FormValue {
  signature?: string;
  orderIds?: number[];
  phone?: string;
  institutionalEmail?: string;
  incomeTaxReturn?: string;
  exceedsIncome?: string;
  taxCondition?: string;
  medicalPrepaid?: string;
  medicalPrepaidFile?: { url: string };
  housingCredit?: string;
  housingCreditFile?: { url: string };
  afcContributions?: string;
  afcContributionsFile?: { url: string };
  voluntaryPensionContributions?: string;
  voluntaryPensionContributionsFile?: { url: string };
  dependentsInfo?: DependentInfo[];
  socialSecurityFile?: { url: string };
  otherAnexes?: { file?: { url: string } }[];
}

// Definir la estructura final de params
export interface OcNaturalParams {
  consecutive_number: number | null;
  sign_text: string | undefined;
  po_vendor: number[] | undefined;
  f_vendor_id: number;
  telephone: string | undefined;
  institutional_email: string | undefined;
  vendor_documents: VendorDocument[];
  info_additional: InfoAdditional[];
  dependents_info: DependentInfo[] | undefined;
}