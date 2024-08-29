import { Injectable } from '@angular/core';
import { VendorService } from './vendor.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoAdditionalTypes, OcFileTypes } from '../shared/interfaces/files_types';
import { OcNaturalParams } from '../shared/interfaces/natural_params_form.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  normalizeString(strAccents:string) {
    return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  openSnackBar(message: string, action: string = 'X', duration: number = 10000) {
		this._snackBar.open(message, action, {
			duration: duration,
		});
	}

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}/${month}/${year}`;
  }

  fillInitialInvoiceNaturalForm(form: any, data: any) {
    console.log(data, form);
    form.get('personType')?.setValue(data?.personType || '');
    form.get('documentType')?.setValue(data?.documentTypeEsp || '');
    form.get('documentNumber')?.setValue(data?.documentNumber || '');
    form.get('fullName')?.setValue(data?.fullName || '');
    form.get('address')?.setValue(data?.address || '');
    form.get('email')?.setValue(data?.email || '');
    form.get('position')?.setValue(data?.position || '');
    form.get('bankBranch')?.setValue(data?.bankBranch || '');
    form.get('bankKey')?.setValue(data?.bankKey || '');
    form.get('bankAccountType')?.setValue(data?.bankAccountType || '');
    if(data?.bankKey) {
      form.get('bankKey')?.disable();
    }
    if(data?.bankAccountType) {
      form.get('bankAccountType')?.disable();
    }
    if(data?.bankBranch) {
      form.get('bankBranch')?.disable();
    }
    form.get('signature')?.setValue(data?.signature || '');
    form.get('signatureTwo')?.setValue(data?.signature || '');
    form.get('phone')?.setValue(data?.telephone || '');
    form.get('institutionalEmail')?.setValue(data?.institutionalEmail || '');
    console.log('contract number', data?.contract_code);
    form.get('contractNumber')?.setValue(data?.contract_code);
    form.get('orderIds')?.setValue(data?.selected_orders || []);
  
    data?.vendorDocuments?.forEach((doc: any) => {
      if (doc.link) {
        switch (doc.f_vendor_document_type_id) {
          case OcFileTypes.SOCIAL_SECURITY:
            form.get('socialSecurity')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ELECTRONIC_INVOICE:
            form.get('electronicInvoice')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.TAX_AUDITOR_CERTIFICATE:
            form.get('taxAuditorCertificate')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ARL_CERTIFICATE:
            form.get('arlCertificate')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ANEXO:
            form.get('otherAnexes')?.push(new FormControl(this.getDocumentLinkOc(doc.link, doc.document_id)));
            break;
        }
      }
    });
  
    data?.infoAdditional?.forEach((info: any) => {
      switch (info.f_vendor_inf_add_type_id) {
        case InfoAdditionalTypes.INCOME_TAX_RETURN:
          form.get('incomeTaxReturn')?.setValue(info.value ? '1' : '0');
          break;
        case InfoAdditionalTypes.EXCEEDS_INCOME:
          form.get('exceedsIncome')?.setValue(info.value ? '1' : '0');
          break;
        case InfoAdditionalTypes.TAX_CONDITION:
          form.get('taxCondition')?.setValue(info.value ? '1' : '0');
          break;
        case InfoAdditionalTypes.MEDICAL_PREPAID:
          form.get('medicalPrepaid')?.setValue(info.value ? '1' : '0');
          if (info.link) {
            form.get('medicalPrepaidFile')?.setValue(this.getDocumentLinkOc(info.link, info.document_id));
          }
          break;
        case InfoAdditionalTypes.HOUSING_CREDIT:
          form.get('housingCredit')?.setValue(info.value ? '1' : '0');
          if (info.link) {
            form.get('housingCreditFile')?.setValue(this.getDocumentLinkOc(info.link, info.document_id));
          }
          break;
        case InfoAdditionalTypes.AFC_CONTRIBUTIONS:
          form.get('afcContributions')?.setValue(info.value ? '1' : '0');
          if (info.link) {
            form.get('afcContributionsFile')?.setValue(this.getDocumentLinkOc(info.link, info.document_id));
          }
          break;
        case InfoAdditionalTypes.VOLUNTARY_PENSION_CONTRIBUTIONS:
          form.get('voluntaryPensionContributions')?.setValue(info.value ? '1' : '0');
          if (info.link) {
            form.get('voluntaryPensionContributionsFile')?.setValue(this.getDocumentLinkOc(info.link, info.document_id));
          }
          break;
        case InfoAdditionalTypes.DEPENDENTS:
          form.get('dependents')?.setValue(info.value ? '1' : '0');
          break;
      }
    });
  
    data?.dependentsInfo?.forEach((dependent: any) => {
      const dependents = form.get('dependentsInfo') as FormArray;
      dependents.push(new FormGroup({
        dependentDocumentTypeId: new FormControl(dependent.documentTypeId),
        dependentDocumentNumber: new FormControl(dependent.document),
        dependentFullName: new FormControl(dependent.name),
        dependentKinship: new FormControl(dependent.kinship),
        minorChildren: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.MINOR_CHILDREN)?.value ? '1' : '0'
        ),
        minorChildrenFile: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.MINOR_CHILDREN)?.link
            ? this.getDocumentLinkOc(
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.MINOR_CHILDREN)?.link,
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.MINOR_CHILDREN)?.document_id
              )
            : null
        ),
        childrenStudyCertificate: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_STUDY_CERTIFICATE)?.value ? '1' : '0'
        ),
        childrenStudyCertificateFile: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_STUDY_CERTIFICATE)?.link
            ? this.getDocumentLinkOc(
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_STUDY_CERTIFICATE)?.link,
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_STUDY_CERTIFICATE)?.document_id
              )
            : null
        ),
        childrenMedicineCertificate: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_MEDICINE_CERTIFICATE)?.value ? '1' : '0'
        ),
        childrenMedicineCertificateFile: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_MEDICINE_CERTIFICATE)?.link
            ? this.getDocumentLinkOc(
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_MEDICINE_CERTIFICATE)?.link,
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.CHILDREN_MEDICINE_CERTIFICATE)?.document_id
              )
            : null
        ),
        partnerMedicineCertificate: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.PARTNER_MEDICINE_CERTIFICATE)?.value ? '1' : '0'
        ),
        partnerMedicineCertificateFile: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.PARTNER_MEDICINE_CERTIFICATE)?.link
            ? this.getDocumentLinkOc(
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.PARTNER_MEDICINE_CERTIFICATE)?.link,
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.PARTNER_MEDICINE_CERTIFICATE)?.document_id
              )
            : null
        ),
        familyMedicineCertificate: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.FAMILY_MEDICINE_CERTIFICATE)?.value ? '1' : '0'
        ),
        familyMedicineCertificateFile: new FormControl(
          dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.FAMILY_MEDICINE_CERTIFICATE)?.link
            ? this.getDocumentLinkOc(
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.FAMILY_MEDICINE_CERTIFICATE)?.link,
                dependent.infoAdditional.find((info: any) => info.f_vendor_inf_add_type_id === InfoAdditionalTypes.FAMILY_MEDICINE_CERTIFICATE)?.document_id
              )
            : null
        )
      }));
    });
  }
  

  getDocumentLinkOc(url: string, document_id: number) {
   if(url) {
      return { name: url, url: url, document_id: document_id };
   } else {
    return
   }
  }

  fillInitialInvoiceJuridicaForm(form: any, data: any) {
    form.get('personType')?.setValue(data?.personType || '');
    form.get('documentType')?.setValue(data?.documentTypeEsp || '');
    form.get('documentNumber')?.setValue(data?.documentNumber || '');
    form.get('companyName')?.setValue(data?.companyName || '');
    form.get('address')?.setValue(data?.address || '');
    form.get('email')?.setValue(data?.email || '');
    console.log('contract number', data?.contract_code);
    form.get('contractNumber')?.setValue(data?.contract_code);
    form.get('orderIds')?.setValue(data?.selected_orders || []);

    // documents when juridica are socialSecurity, electronicInvoice, taxAuditorCertificate, arlCertificate, otherAnexes

    data?.vendorDocuments?.forEach((doc: any) => {
      if (doc.link) {
        switch (doc.f_vendor_document_type_id) {
          case OcFileTypes.SOCIAL_SECURITY:
            form.get('socialSecurity')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ELECTRONIC_INVOICE:
            form.get('electronicInvoice')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.TAX_AUDITOR_CERTIFICATE:
            form.get('taxAuditorCertificate')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ARL_CERTIFICATE:
            form.get('arlCertificate')?.setValue(this.getDocumentLinkOc(doc.link, doc.document_id));
            break;
          case OcFileTypes.ANEXO:
            form.get('otherAnexes')?.push(new FormControl(this.getDocumentLinkOc(doc.link, doc.document_id)));
            break;
        }
      }
    });
  }

  setOcForm(formValue: any, vendorId: number, registerNumber: number | null = null): OcNaturalParams {
    console.log(formValue);
    const params: any = {
      consecutive_number: registerNumber,
      sign_text: formValue?.signature,
      selected_orders: formValue?.orderIds,
      f_vendor_id: vendorId,
      telephone: formValue?.phone,
      institutional_email: formValue?.institutionalEmail,
      bank_branch: formValue?.bankBranch,
      bank_key: formValue?.bankKey,
      bank_account_type: formValue?.bankAccountType,
      vendor_documents: [],
      info_additional: [
        {
          info_additional_type_id: InfoAdditionalTypes.INCOME_TAX_RETURN,
          info_additional_document_id: OcFileTypes.INCOME_TAX_RETURN,
          value: formValue?.incomeTaxReturn,
          description: 'Income Tax Return',
        },
        {
          info_additional_type_id: InfoAdditionalTypes.EXCEEDS_INCOME,
          info_additional_document_id: OcFileTypes.EXCEEDS_INCOME,
          value: formValue?.exceedsIncome,
          description: 'Exceeds Income'
        },
        {
          info_additional_type_id: InfoAdditionalTypes.TAX_CONDITION,
          info_additional_document_id: OcFileTypes.TAX_CONDITION,
          value: formValue?.taxCondition,
          description: 'Tax Condition'
        },
        {
          info_additional_type_id: InfoAdditionalTypes.DEPENDENTS,
          info_additional_document_id: OcFileTypes.DEPENDENTS,
          value: formValue?.dependents,
          description: 'Dependents'
        },
        {
          info_additional_type_id: InfoAdditionalTypes.MEDICAL_PREPAID,
          info_additional_document_id: OcFileTypes.MEDICAL_PREPAID,
          value: formValue?.medicalPrepaid,
          description: 'Medical Prepaid',
          document: formValue?.medicalPrepaidFile?.document_url,
          document_id: formValue?.medicalPrepaidFile?.document_id
        },
        {
          info_additional_type_id: InfoAdditionalTypes.HOUSING_CREDIT,
          info_additional_document_id: OcFileTypes.HOUSING_CREDIT,
          value: formValue?.housingCredit,
          description: 'Housing Credit',
          document: formValue?.housingCreditFile?.document_url,
          document_id: formValue?.housingCreditFile?.document_id
        },
        {
          info_additional_type_id: InfoAdditionalTypes.AFC_CONTRIBUTIONS,
          info_additional_document_id: OcFileTypes.AFC_CONTRIBUTIONS,
          value: formValue?.afcContributions,
          description: 'AFC Contributions',
          document: formValue?.afcContributionsFile?.document_url,
          document_id: formValue?.afcContributionsFile?.document_id
        },
        {
          info_additional_type_id: InfoAdditionalTypes.VOLUNTARY_PENSION_CONTRIBUTIONS,
          info_additional_document_id: OcFileTypes.VOLUNTARY_PENSION_CONTRIBUTIONS,
          value: formValue?.voluntaryPensionContributions,
          description: 'Voluntary Pension Contributions',
          document: formValue?.voluntaryPensionContributionsFile?.document_url,
          document_id: formValue?.voluntaryPensionContributionsFile?.document_id
        }
      ],
      dependents_info: formValue.dependentsInfo && formValue?.dependentsInfo.map((dependent: any) => ({
        documentType: dependent?.dependentDocumentTypeId,
        document: dependent?.dependentDocumentNumber,
        name: dependent?.dependentFullName,
        kinship: dependent?.dependentKinship,
        infoAdditional: [
          {
            info_additional_type_id: InfoAdditionalTypes.MINOR_CHILDREN,
            info_additional_document_id: OcFileTypes.MINOR_CHILDREN,
            value: dependent?.minorChildren,
            description: 'Minor Children',
            document: dependent?.minorChildrenFile?.document_url,
            document_id: dependent?.minorChildrenFile?.document_id
          },
          {
            info_additional_type_id: InfoAdditionalTypes.CHILDREN_STUDY_CERTIFICATE,
            info_additional_document_id: OcFileTypes.CHILDREN_STUDY_CERTIFICATE,
            value: dependent?.childrenStudyCertificate,
            description: 'Children Study Certificate',
            document: dependent?.childrenStudyCertificateFile?.document_url,
            document_id: dependent?.childrenStudyCertificateFile?.document_id
          },
          {
            info_additional_type_id: InfoAdditionalTypes.CHILDREN_MEDICINE_CERTIFICATE,
            info_additional_document_id: OcFileTypes.CHILDREN_MEDICINE_CERTIFICATE,
            value: dependent?.childrenMedicineCertificate,
            description: 'Children Medicine Certificate',
            document: dependent?.childrenMedicineCertificateFile?.document_url,
            document_id: dependent?.childrenStudyCertificateFile?.document_id
          },
          {
            info_additional_type_id: InfoAdditionalTypes.PARTNER_MEDICINE_CERTIFICATE,
            info_additional_document_id: OcFileTypes.PARTNER_MEDICINE_CERTIFICATE,
            value: dependent?.partnerMedicineCertificate,
            description: 'Partner Medicine Certificate',
            document: dependent?.partnerMedicineCertificateFile?.document_url,
            document_id: dependent?.childrenStudyCertificateFile?.document_id
          },
          {
            info_additional_type_id: InfoAdditionalTypes.FAMILY_MEDICINE_CERTIFICATE,
            info_additional_document_id: OcFileTypes.FAMILY_MEDICINE_CERTIFICATE,
            value: dependent?.familyMedicineCertificate,
            description: 'Family Medicine Certificate',
            document: dependent?.familyMedicineCertificateFile?.document_url,
            document_id: dependent?.childrenStudyCertificateFile?.document_id,
          }
        ],
      }))
    };

    if (formValue.socialSecurity) {

      params.vendor_documents.push({
        document_type_id: OcFileTypes.SOCIAL_SECURITY,
        document: formValue.socialSecurity?.document_url,
        document_id: formValue.socialSecurity?.document_id
      });
    }

    // Añadir electronic Invoice document
    if (formValue.electronicInvoice) {
      params.vendor_documents.push({
        document_type_id: OcFileTypes.ELECTRONIC_INVOICE,
        document: formValue.electronicInvoice?.document_url,
        document_id: formValue.electronicInvoice?.document_id
      });
    }

    // Añadir tax auditor certificate document
    if (formValue.taxAuditorCertificate) {
      params.vendor_documents.push({
        document_type_id: OcFileTypes.TAX_AUDITOR_CERTIFICATE,
        document: formValue.taxAuditorCertificate?.document_url,
        document_id: formValue.taxAuditorCertificate?.document_id
      });
    }

    // Añadir ARL

    if (formValue.arlCertificate) {
      params.vendor_documents.push({
        document_type_id: OcFileTypes.ARL_CERTIFICATE,
        document: formValue.arlCertificate?.document_url,
        document_id: formValue.arlCertificate?.document_id
      });
    }
  
    // Añadir otros anexos si existen
    if (formValue.otherAnexes && formValue.otherAnexes.length > 0) {
      formValue.otherAnexes.forEach((anexo: any) => {
        console.log(anexo)
        params.vendor_documents.push({
          document_type_id: OcFileTypes.ANEXO,
          document: anexo.document_url,
          document_id: anexo.document_id
        });
      });
    }
  
    return params;
  }

  constructor(private _vS: VendorService, private _snackBar: MatSnackBar) { }
}
