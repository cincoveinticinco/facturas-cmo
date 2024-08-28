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

  setVinculationForm(data: any) {
    var formData = {
      name: data[('name')],
      f_document_type_id: data[('document_type_id')],
      document: data[('document')],
      ciiu: data[('ciiu')],
      f_vendor_economic_act_id: data[('economic_activity_id')],
      address: data[('address')],
      city: data[('city')],
      department: data[('department')],
      telephone: data[('telephone')],
      email: data[('email')],
      emergency_contact_name: data[('emergency_contact_name')],
      emergency_contact_telephone: data[('emergency_contact_telephone')],
      emergency_contact_kinship: data[('emergency_contact_kinship')],
      eps: data[('eps')],
      arl: data[('arl')],
      afp: data[('afp')],
      layoffs: data[('layoffs')],
      cmo_level_risk_arl_id: data[('risk_level')],
      blood_type_id: data[('blood_type_id')],
      pepff: data[('pepff')],
      legal_representative_name: data[('legal_representative_name')],
      legal_representative_telephone: data[('legal_representative_telephone')],
      legal_representative_email: data[('legal_representative_email')],
      f_document_representative: data[('f_document_representative')],
      electronic_billing_name: data[('electronic_billing_name')],
      electronic_billing_email: data[('electronic_billing_email')],
      electronic_billing_telephone: data[('electronic_billing_telephone')],
      accounting_responsible_name: data[('accounting_responsible_name')],
      accounting_responsible_telephone: data[('accounting_responsible_telephone')],
      accounting_responsible_email: data[('accounting_responsible_email')],
      accounting_responsible_position: data[('accounting_responsible_position')],
      treassury_responsible_name: data[('treassury_responsible_name')],
      treassury_responsible_telephone: data[('treassury_responsible_telephone')],
      treassury_responsible_email: data[('treassury_responsible_email')],
      treassury_responsible_position: data[('treassury_responsible_position')],
      commercial_responsible_name: data[('commercial_responsible_name')],
      commercial_responsible_telephone: data[('commercial_responsible_telephone')],
      commercial_responsible_email: data[('commercial_responsible_email')],
      confidential_responsible_address: data[('confidential_responsible_address')],
      confidential_responsible_email: data[('confidential_responsible_email')],
      last_close_assets: data[('last_close_assets')],
      last_year_assets: data[('last_year_assets')],
      last_close_liabilities: data[('last_close_liabilities')],
      last_year_liabilities: data[('last_year_liabilities')],
      last_close_income: data[('last_close_income')],
      last_year_income: data[('last_year_income')],
      last_close_equity: data[('last_close_equity')],
      last_year_equity: data[('last_year_equity')],
      last_close_expense: data[('last_close_expense')],
      last_year_expenses: data[('last_year_expenses')],
      is_pep: data[('is_pep')],
      pep_start_date: data[('pep_start_date')],
      pep_end_date: data[('pep_end_date')],
      pep_term: data[('pep_term')],
      pep_position: data[('pep_position')],
      form_responsible_name: data[('form_responsible_name')],
      form_responsible_document: data[('form_responsible_document')] || data[('document')],
      form_responsible_position: data[('form_responsible_position')],
      cv_link: data['cv_link'],
      responsible_responsibles_name: data['responsible_responsibles_name'],
      responsible_responsibles_document: data['responsible_responsibles_document'],
      responsible_responsibles_email: data['responsible_responsibles_email'],
      responsible_f_document_type_id: data['responsible_f_document_type_id'],
      info_additional: [
        {
          info_additional_type_id: 110,
          value: data[('illness')],
          description: data[('illness_description')]
        },
        {
          info_additional_type_id: 111,
          value: data[('medicines')],
          description: data[('medicines_description')]
        },
        {
          info_additional_type_id: 112,
          value: data[('allergies')],
          description: data[('allergies_description')]
        },
        {
          info_additional_type_id: 113,
          value: data[('food_restrictions')],
          description: data[('food_restrictions_description')]
        },
        {
          info_additional_type_id: 114,
          value: data[('phobias')],
          description: data[('phobias_description')]
        },
        {
          info_additional_type_id: 115,
          value: data[('income_tax_declarant')],
          description: data[('income_tax_declarant_description')]
        },
        {
          info_additional_type_id: 116,
          value: data[('dependents')],
          description: data[('dependents_description')]
        },
        {
          info_additional_type_id: 117,
          value: data[('prepaid_medicine')],
          description: data[('prepaid_medicine_description')]
        },
        {
          info_additional_type_id: 118,
          value: data[('mortgage_credit')],
          description: data[('mortgage_credit_description')]
        },
        {
          info_additional_type_id: 119,
          value: data[('voluntary_contributions')],
          description: data[('voluntary_contributions_description')]
        },
        {
          info_additional_type_id: 120,
          value: data[('afc_account')],
          description: data[('afc_account_description')]
        },
        {
          info_additional_type_id: 121,
          value: data[('vat_responsible')],
          description: data[('vat_responsible_description')]
        },
        {
          info_additional_type_id: 122,
          value: data[('simple_regime')]
        },
        {
          info_additional_type_id: 123,
          value: data[('self_withholding')]
        },
        {
          info_additional_type_id: 124,
          value: data[('big_contributor')]
        }
      ]
    }

    return formData;
  }

  fillInitialVinculationForm(form: any, data: any) {
    form.get('name')?.setValue(data?.name || '', { emitEvent: false });
    form.get('document_type_id')?.setValue(data?.f_document_type_id || '');
    form.get('document')?.setValue(data?.document || '', { emitEvent: false });
    form.get('ciiu')?.setValue(data?.ciiu || '');
    form.get('f_vendor_economic_act_id')?.setValue(data?.economic_activity_id || '');
    form.get('address')?.setValue(data?.address || '');
    form.get('city')?.setValue(data?.city || '');
    form.get('department')?.setValue(data?.department || '');
    form.get('telephone')?.setValue(data?.telephone || '');
    form.get('email')?.setValue(data?.email || '');
    form.get('emergency_contact_name')?.setValue(data?.emergency_contact_name || '');
    form.get('emergency_contact_telephone')?.setValue(data?.emergency_contact_telephone || '');
    form.get('emergency_contact_kinship')?.setValue(data?.emergency_contact_kinship || '');
    form.get('eps')?.setValue(data?.eps || '');
    form.get('economic_activity')?.setValue(data?.economic_activity || '');
    form.get('economic_activity_id')?.setValue(data?.f_vendor_economic_act_id || '');
    form.get('afp')?.setValue(data?.afp || '');
    form.get('arl')?.setValue(data?.arl || '');
    form.get('risk_level')?.setValue(data?.cmo_level_risk_arl_id || '');
    form.get('blood_type_id')?.setValue(data?.blood_type_id || '');
    form.get('layoffs')?.setValue(data?.layoffs || '');
    form.get('legal_representative_name')?.setValue(data?.legal_representative_name || '');
    form.get('legal_representative_telephone')?.setValue(data?.legal_representative_telephone || '');
    form.get('legal_representative_email')?.setValue(data?.legal_representative_email || '');
    form.get('f_document_representative')?.setValue(data?.legal_representative_document || '');
    form.get('electronic_billing_name')?.setValue(data?.electronic_billing_name || '');
    form.get('electronic_billing_email')?.setValue(data?.electronic_billing_email || '');
    form.get('electronic_billing_telephone')?.setValue(data?.electronic_billing_telephone || '');
    form.get('accounting_responsible_name')?.setValue(data?.accounting_responsible_name || '');
    form.get('accounting_responsible_telephone')?.setValue(data?.accounting_responsible_telephone || '');
    form.get('accounting_responsible_email')?.setValue(data?.accounting_responsible_email || '');
    form.get('accounting_responsible_position')?.setValue(data?.accounting_responsible_position || '');
    form.get('treassury_responsible_name')?.setValue(data?.treassury_responsible_name || '');
    form.get('treassury_responsible_telephone')?.setValue(data?.treassury_responsible_telephone || '');
    form.get('treassury_responsible_email')?.setValue(data?.treassury_responsible_email || '');
    form.get('treassury_responsible_position')?.setValue(data?.treassury_responsible_position || '');
    form.get('commercial_responsible_name')?.setValue(data?.commercial_responsible_name || '');
    form.get('commercial_responsible_telephone')?.setValue(data?.commercial_responsible_telephone || '');
    form.get('commercial_responsible_email')?.setValue(data?.commercial_responsible_email || '');
    form.get('confidential_responsible_address')?.setValue(data?.confidential_responsible_address || '');
    form.get('confidential_responsible_email')?.setValue(data?.confidential_responsible_email || data?.email || '');
    form.get('last_close_assets')?.setValue(data?.last_close_assets || '');
    form.get('last_year_assets')?.setValue(data?.last_year_assets || '');
    form.get('last_close_liabilities')?.setValue(data?.last_close_liabilities || '');
    form.get('last_year_liabilities')?.setValue(data?.last_year_liabilities || '');
    form.get('last_close_income')?.setValue(data?.last_close_income || '');
    form.get('last_year_income')?.setValue(data?.last_year_income || '');
    form.get('last_close_equity')?.setValue(data?.last_close_equity || '');
    form.get('last_year_equity')?.setValue(data?.last_year_equity || '');
    form.get('last_close_expense')?.setValue(data?.last_close_expense || '');
    form.get('last_year_expenses')?.setValue(data?.last_year_expenses || '');
    form.get('is_pep')?.setValue(data?.pep ? '1' : '0', { emitEvent: false });
    form.get('pep_start_date')?.setValue(data?.pep_start_date || null, { emitEvent: false });
    form.get('pep_end_date')?.setValue(data?.pep_end_date || null, { emitEvent: false });
    form.get('pep_term')?.setValue(data?.pep_term || '', { emitEvent: false });
    form.get('pep_position')?.setValue(data?.pep_position || '', { emitEvent: false });
    form.get('form_responsible_name')?.setValue(data?.form_responsible_name || '');
    form.get('form_responsible_document')?.setValue(data?.form_responsible_document || '');
    form.get('form_responsible_position')?.setValue(data?.form_responsible_position || '');
    form.get('signature')?.setValue(this.getDocumentLink(324), { emitEvent: false });
    form.get('cv_link')?.setValue(data?.cv_link || '');
    form.get('responsible_responsibles_name')?.setValue(data?.responsible_name || '');
    form.get('responsible_responsibles_document')?.setValue(data?.responsible_document || null);
    form.get('responsible_responsibles_email')?.setValue(data?.responsible_email || '');
    form.get('responsible_f_document_type_id')?.setValue(data?.responsible_f_document_type_id || null);

    // Setting additional info
    const info_additional = data?.info_additional;
    for (let info of info_additional) {
      switch(info.id) {
        case 110:
          form.get('illness')?.setValue((info.value ? '1' : '0'));
          form.get('illness_description')?.setValue(info.description || '');
          break;
        case 111:
          form.get('medicines')?.setValue(info.value ? '1' : '0');
          form.get('medicines_description')?.setValue(info.description || '');
          break;
        case 112:
          form.get('allergies')?.setValue(info.value ? '1' : '0');
          form.get('allergies_description')?.setValue(info.description || '');
          break;
        case 113:
          form.get('food_restrictions')?.setValue(info.value ? '1' : '0');
          form.get('food_restrictions_description')?.setValue(info.description || '');
          break;
        case 114:
          form.get('phobias')?.setValue(info.value ? '1' : '0');
          form.get('phobias_description')?.setValue(info.description || '');
          break;
        case 115:
          form.get('income_tax_declarant')?.setValue(info.value ? '1' : '0');
          form.get('income_tax_declarant_description')?.setValue(info.description || '');
          break;
        case 116:
          form.get('dependents')?.setValue(info.value ? '1' : '0');
          form.get('dependents_description')?.setValue(info.description || '');
          break;
        case 117:
          form.get('prepaid_medicine')?.setValue(info.value ? '1' : '0');
          form.get('prepaid_medicine_description')?.setValue(info.description || '');
          break;
        case 118:
          form.get('mortgage_credit')?.setValue(info.value ? '1' : '0');
          form.get('mortgage_credit_description')?.setValue(info.description || '');
          break;
        case 119:
          form.get('voluntary_contributions')?.setValue(info.value ? '1' : '0');
          form.get('voluntary_contributions_description')?.setValue(info.description || '');
          break;
        case 120:
          form.get('afc_account')?.setValue(info.value ? '1' : '0');
          form.get('afc_account_description')?.setValue(info.description || '');
          break;
        case 121:
          form.get('vat_responsible')?.setValue(info.value ? '1' : '0');
          form.get('vat_responsible_description')?.setValue(info.description || '');
          break;
        case 122:
          form.get('simple_regime')?.setValue(info.value ? '1' : '0');
          break;
        case 123:
          form.get('self_withholding')?.setValue(info.value ? '1' : '0');
          break;
        case 124:
          form.get('big_contributor')?.setValue(info.value ? '1' : '0');
          break;
      }
    }
  }

  getQuestionData(id: any, answers: any[], controlName?: string, form?: any) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer.value === true && controlName) {
      form.get(`${controlName}_description`)?.setValidators(Validators.required);
    } 
    else if (answer.value !== true && controlName){
      form.get(`${controlName}_description`)?.removeValidators(Validators.required);
    }
    if (answer) return answer.value === true ? "1" : (answer.value === false ? "0" : null);
    else return null;
  }

  getDescription(id: any, answers: any[]) {
    let answer = answers.find((an: any) => an.id == id);
    if (answer) return answer.description ? answer.description : null;
    else return null;
  }

  getDocumentLink(id: any) {
    const documentsList = this._vS.getDocumentsList();
    const document = documentsList.find(dl => dl?.id == id);
    const file = document?.link ? { name: document.link, url: document.link, document_id: document?.document_id } : null;

    return file;
  }

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
