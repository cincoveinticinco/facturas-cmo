import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { InfStepOneComponent } from '../../molecules/inf-step-one/inf-step-one.component';
import { InfStepTwoComponent } from '../../molecules/inf-step-two/inf-step-two.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { InfStepThreeComponent } from '../../molecules/inf-step-three/inf-step-three.component';
import { SelectOption } from '../../molecules/inf-step-one/inf-step-one.component';
import { PurchaseOrders } from '../../../pages/oc-forms-cmo/oc-forms-cmo.component';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';
import { VendorService } from '../../../services/vendor.service';
import { catchError, filter, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ValidateOcInfoComponent } from '../../../pages/validate-oc-info/validate-oc-info.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-invoice-natural-form',
  standalone: true,
  imports: [
    SubtitleComponent,
    ReactiveFormsModule,
    CheckboxInputComponent,
    CommonModule,
    TextInputComponent,
    InfStepOneComponent,
    InfStepTwoComponent,
    InfStepThreeComponent,
    FileboxComponent,
    ValidateOcInfoComponent
  ],
  templateUrl: './invoice-natural-form.component.html',
  styleUrls: ['./invoice-natural-form.component.css']
})
export class InvoiceNaturalFormComponent implements OnInit, OnChanges {
  @Input() currentStep?: number;
  @Input() vendorInfo: any;
  @Input() purchaseOrders?: PurchaseOrders[];
  @Input() selectedPurchaseOrders?: PurchaseOrders[];
  @Output() handleStepChange = new EventEmitter<'next' | 'previous'>();
  formattedOcOptions: SelectOption[] = [];
  @Input() poProjections: any[] = [];
  @Output() saveForm = new EventEmitter<any>();

  loading = false;
  invoiceNaturalForm: FormGroup;
  errorUploadingDocuments: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private ilService: InvoiceLodgingService,
    private vendorService: VendorService
  ) {
    this.invoiceNaturalForm = this.formBuilder.group({
      orderIds: this.formBuilder.array([]),
      personType: this.formBuilder.control({ value: '', disabled: true }),
      documentType: this.formBuilder.control({ value: '', disabled: true }),
      documentNumber: this.formBuilder.control({ value: '', disabled: true }),
      fullName: this.formBuilder.control({ value: '', disabled: true }),
      address: this.formBuilder.control({ value: '', disabled: true }),
      email: this.formBuilder.control({ value: '', disabled: true }, Validators.email),
      position: this.formBuilder.control({ value: '', disabled: true }),
      bankBranch: this.formBuilder.control({ value: '', disabled: true }),
      bankKey: this.formBuilder.control({ value: '', disabled: true }),
      bankAccountType: this.formBuilder.control({ value: '', disabled: true }),
      signatureAuth: this.formBuilder.control('', Validators.requiredTrue),
      signature: this.formBuilder.control('', Validators.required),
      contractNumber: this.formBuilder.control({ value: '', disabled: true }),
      phone: this.formBuilder.control(''),
      institutionalEmail: this.formBuilder.control(''),
      incomeTaxReturn: this.formBuilder.control('', [Validators.required]),
      exceedsIncome: this.formBuilder.control('', [Validators.required]),
      taxCondition: this.formBuilder.control('', [Validators.required]),
      medicalPrepaid: this.formBuilder.control('', [Validators.required]),
      medicalPrepaidFile: this.formBuilder.control(''),
      housingCredit: this.formBuilder.control('', [Validators.required]),
      housingCreditFile: this.formBuilder.control(''),
      dependents: this.formBuilder.control('', [Validators.required]),
      afcContributions: this.formBuilder.control('', [Validators.required]),
      afcContributionsEntity: this.formBuilder.control(''),
      afcContributionsAccountNumber: this.formBuilder.control(''),
      afcContributionsFile: this.formBuilder.control(''),
      afcContributionsValue: this.formBuilder.control(''),
      voluntaryPensionContributions: this.formBuilder.control('', [Validators.required]),
      voluntaryPensionContributionsEntity: this.formBuilder.control(''),
      voluntaryPensionContributionsAccountNumber: this.formBuilder.control(''),
      voluntaryPensionContributionsFile: this.formBuilder.control(''),
      voluntaryPensionContributionsValue: this.formBuilder.control(''),
      signatureAuthTwo: this.formBuilder.control('', Validators.requiredTrue),
      signatureTwo: this.formBuilder.control('', Validators.required),
      dependentsInfo: this.formBuilder.array([]),
      otherAnexes: this.formBuilder.array([]),
      socialSecurity: this.formBuilder.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if(this.purchaseOrders && this.purchaseOrders.length > 0){
      this.initializeForm();
    }
  }

  initializeForm() {
    console.log('Selected POs', this.selectedPurchaseOrders);
    if (this.selectedPurchaseOrders && this.selectedPurchaseOrders.length > 0 && this.getOrderIds().length === 0) {
      this.selectedPurchaseOrders.forEach((po: PurchaseOrders, index: number) => {
        this.addOrderId();
        this.updateFormattedOcOptions();
        this.fillPurchaseOrderControl(index, po.id);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendorInfo'] && this.vendorInfo) {
      this.globalService.fillInitialInvoiceNaturalForm(this.invoiceNaturalForm, this.vendorInfo);
      this.invoiceNaturalForm.get('signatureAuth')?.enable();
      this.invoiceNaturalForm.get('signature')?.enable();
    }
  }

  getOrderIds(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  updateFormattedOcOptions(): void {
    if(this.getValue('orderIds').length === 0) {
      this.formattedOcOptions = this.getFormattedOcOptions(this.purchaseOrders);
    } else {
      const selectedOrderIds = this.getOrderIds().value;
      const availablePurchaseOrders = this.purchaseOrders?.filter(
        (po: PurchaseOrders) => !selectedOrderIds.includes(po.id)
      );
      this.formattedOcOptions = this.getFormattedOcOptions(availablePurchaseOrders);
    }
  }

  addOrderId(): void {
    this.getOrderIds().push(this.formBuilder.control(''));
  }

  getControl(controlName: string): FormControl {
    return this.invoiceNaturalForm.get(controlName) as FormControl;
  }

  getFormattedOcOptions(purchaseOrders: any): SelectOption[] {
    console.log('Purchase orderssssss', purchaseOrders);
    const formattedPo = purchaseOrders.map((order: any) => ({
      optionValue: parseInt(order.id),
      optionName: order.consecutiveCodes
    }));
    console.log('Purchase orders', purchaseOrders);
    console.log('Formatted PO', formattedPo);
    return formattedPo;
  }

  sendForm(): void {
    this.nextStep();
  }

  setCheckboxControl(event: any, controlName: string): void {
    this.invoiceNaturalForm.get(controlName)?.setValue(event.target.checked);
  }

  getValue(controlName: string): any {
    return this.invoiceNaturalForm.get(controlName)?.value;
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control('', [Validators.required]));
    this.updateFormattedOcOptions();
  }

  fillPurchaseOrderControl(index: number, value: number): void {
    console.log('Filling purchase order control', index, value);
    this.getOrderIds().at(index).setValue(value.toString());
  }

  disablePurchaseOrderCOntrol(index: number): void {
    this.getOrderIds().at(index).disable();
  }

  getSelectedPurchaseOrders(): any {
    return this.getValue('orderIds').map((orderId: string) => {
      return this.purchaseOrders?.find((po: any) => po.id === orderId);
    });
  }

  validateStepOne(): { isValid: boolean; firstInvalidControl: string | null } {
    let isValid = true;
    let firstInvalidControl: string | null = null;
    const signatureAuth = this.getControl('signatureAuth');
    const signature = this.getControl('signature');
  
    const orderIdsControls = this.getOrderIds().controls as FormControl[];
  
    for (let i = 0; i < orderIdsControls.length; i++) {
      const control = orderIdsControls[i];
      if (!control.value) {
        control.setErrors({ required: true });
        control.markAsTouched();
        firstInvalidControl = `purchaseOrder-${i}`;
        isValid = false;
        return { isValid, firstInvalidControl };
      } else {
        control.setErrors(null);
      }
    }
  
    // Validate signatureAuth
    if (!signatureAuth.value) {
      signatureAuth.setErrors({ required: true });
      signatureAuth.markAsTouched();
      if (isValid) {
        firstInvalidControl = 'signatureAuth';
        isValid = false;
      }
    } else {
      signatureAuth.setErrors(null);
    }
    
    if (!signature.value) {
      signature.setErrors({ required: true });
      signature.markAsTouched();
      if (isValid) {
        firstInvalidControl = 'signature';
        isValid = false;
      }
    } else {
      signature.setErrors(null);
    }
  
    return { isValid, firstInvalidControl };
  }

  validateStepTwo(): { isValid: boolean; firstInvalidControl: string | null } {
    let isValid = true;
    let firstInvalidControl: string | null = null;

    const controlsToValidate = [
      'phone', 'institutionalEmail', 'incomeTaxReturn', 'exceedsIncome', 'taxCondition', 'medicalPrepaid', 'medicalPrepaidFile', 'housingCredit', 'housingCreditFile', 'dependents', 'afcContributions', 'afcContributionsEntity', 'afcContributionsAccountNumber', 'afcContributionsFile', 'afcContributionsValue', 'voluntaryPensionContributions', 'voluntaryPensionContributionsEntity', 'voluntaryPensionContributionsAccountNumber', 'voluntaryPensionContributionsFile', 'voluntaryPensionContributionsValue', 'signatureAuthTwo', 'signatureTwo'
    ];

    for (let i = 0; i < controlsToValidate.length; i++) {
      const control = this.getControl(controlsToValidate[i]);
      if ((control.invalid) && control) {
        control.markAsTouched();
        console.log('ERROR IN CONTROL', controlsToValidate[i]);
        if (isValid) {
          firstInvalidControl = controlsToValidate[i];
          isValid = false;
        }
      } else {
        control.setErrors(null);
      }
    }

    return { isValid, firstInvalidControl };
  }

  validateStepThree(): { isValid: boolean; firstInvalidControl: string | null } {
    let isValid = true;
    let firstInvalidControl: string | null = null;

    const otherAnexes = this.invoiceNaturalForm.get('otherAnexes') as FormArray;

    for (let i = 0; i < otherAnexes.length; i++) {
      const control = otherAnexes.at(i);
      if (control.invalid) {
        control.markAsTouched();
        console.log('ERROR IN CONTROL', control);
        if (isValid) {
          firstInvalidControl = `otherAnexes-${i}`;
          isValid = false;
        }
      } else {
        control.setErrors(null);
      }
    }
    const controlsToValidate = [
      'socialSecurity'
    ];

    for (let i = 0; i < controlsToValidate.length; i++) {
      const control = this.getControl(controlsToValidate[i]);
      if ((control.invalid) && control) {
        control.markAsTouched();
        console.log('ERROR IN CONTROL', controlsToValidate[i]);
        if (isValid) {
          firstInvalidControl = controlsToValidate[i];
          isValid = false;
        }
      } else {
        control.setErrors(null);
      }
    }

    return { isValid, firstInvalidControl };
  }

  cancelLoading() {
    this.loading = false
  }


  async nextStep(): Promise<void> {
    this.errorUploadingDocuments = [];
    if (this.currentStep === 1) {
      this.loading = true;
      const { isValid, firstInvalidControl } = this.validateStepOne();
      if (isValid) {
        this.handleStepChange.emit('next');
      } else if (firstInvalidControl) {
        this.scrollToError(firstInvalidControl);
      }
      this.loading = false;
    } else if (this.currentStep === 2) {
      this.loading = true;
      const { isValid, firstInvalidControl } = this.validateStepTwo();
      if (isValid) {
        try {
          await this.uploadFilesForStepTwo();
          this.loading = false;
          if(this.errorUploadingDocuments.length === 0) {
            this.handleStepChange.emit('next');
          }     
        } finally {
          this.loading = false;
        }
      } else if (firstInvalidControl) {
        this.scrollToError(firstInvalidControl);
        this.loading = false;
      }
    } else if (this.currentStep === 3) {
      this.loading = true;
      const { isValid, firstInvalidControl } = this.validateStepThree();
      if (isValid) {
        try {
          await this.uploadFilesForStepThree();
          if(this.errorUploadingDocuments.length === 0) {
            this.saveForm.emit({
              form: this.invoiceNaturalForm.value,
              cancelLoading: this.cancelLoading
            });
          }
          this.loading = false;
        } catch (error) {
          console.error('Error uploading files:', error);
        } finally {
          this.loading = false;
        }
      } else if (firstInvalidControl) {
        this.scrollToError(firstInvalidControl);
        this.loading = false;
      }
    }
  }
  
  async uploadFilesForStepTwo(): Promise<void> {
    const filesToUploadStepTwo = ['medicalPrepaidFile', 'housingCreditFile', 'afcContributionsFile', 'voluntaryPensionContributionsFile'];
    await this.uploadFiles(filesToUploadStepTwo);
  
    const dependentsInfo = this.invoiceNaturalForm.get('dependentsInfo') as FormArray;
    await Promise.all(dependentsInfo.controls.map(async (control: any) => {
      const filesToUpload = ['minorChildrenFile', 'childrenStudyCertificateFile', 'childrenMedicineCertificateFile', 'partnerMedicineCertificateFile', 'familyMedicineCertificateFile'];
      await this.uploadFilesFromFormGroup(control, filesToUpload);
    }));
  }
  
  async uploadFilesForStepThree(): Promise<void> {
    const filesToUploadStepthree = ['socialSecurity'];
    const anexesArray = this.invoiceNaturalForm.get('otherAnexes') as FormArray;
    await this.uploadFilesFromArrayOfControls(anexesArray);
    await this.uploadFiles(filesToUploadStepthree);
  }

  scrollToError(controlName: string): void {
    console.log('Scrolling to', controlName);
    setTimeout(() => {
      const element = document.getElementById(controlName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  submitFile(event: {
    value: File;
    formControl: FormControl
  }) {
    const { value, formControl } = event;
  
    const vendorId: any = this.ilService.getVendorId();
  
    if (!value) {
      const documentId = formControl.value.document_id;
      if(documentId) {
        this.vendorService.deleteVendorDocument({ document_id: documentId })
      }
    }
    else {
      const nameFile = this.globalService.normalizeString(value.name);
      const existingUrl = formControl.value.url;
      if(existingUrl) {
        console.log('File already uploaded', existingUrl);
        return
      };
      this.ilService.getPresignedPutURLOc(nameFile, vendorId, 'register')
      .pipe(
        catchError((error) => {
          if (environment?.stage !== 'local') {
            formControl.setValue(null, { emitEvent: false });
            this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
            this.globalService.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
            return throwError(() => new Error('Error al subir el archivo.'));
          } else {
            return of({ ...value, url: '' });
          }
        }),
        map((putUrl: any) => ({
          ...putUrl,
          id: value.name,
          file: value,
        })),
        switchMap((uploadFile: any) => {
          console.log('Upload file', uploadFile);
          if (!uploadFile.url) {
            return of({ blobFile: null, uploadFile });
          }
          return new Promise(resolve => {
            uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
          });
        }),
        switchMap((blobUpdateFile: any) => {
          console.log('Blob update file', blobUpdateFile);
          const { blobFile, uploadFile } = blobUpdateFile;
          if (!blobFile) {
            return of(uploadFile);
          }
          return this.vendorService.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => {
                if (environment?.stage !== 'local') {
                  formControl.setValue(null, { emitEvent: false });
                  this.globalService.openSnackBar('Fallo al guardar el documento, intente de nuevo', '', 5000);
                  this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
                  return throwError(() => new Error('Error al subir el archivo.'));
                } else {
                  return of({ ...value, url: '' });
                }
              }),
              map((value) => value.type == HttpEventType.Response ? uploadFile : null)
            );
        }),
        switchMap((uploadFile: any) => {
          if (!uploadFile) return of(false);
         
          const document_url = uploadFile?.url ? `${vendorId}/${nameFile}` : '';
          const formControlCurrentValue = formControl.value;
          this.ilService.signUrl(document_url).subscribe((res: any) => {
            formControl.setValue({
              document_id: formControlCurrentValue?.document_id,
              name: value.name,
              url: res.url,
              document_url: document_url
            });
          })
          console.log(this.globalService.setOcForm(this.invoiceNaturalForm, vendorId ), 'TEST CONTROL');
          return of(true);
        })
      )
      .subscribe((value) => {
        setTimeout(() => {
          this.errorUploadingDocuments = this.errorUploadingDocuments.filter((item: any) => item !== nameFile);
        }, 3500);
      });
    }
  }

  async uploadFilesFromArrayOfControls(controlArray: FormArray): Promise<void> {
    const uploadPromises = controlArray.controls.map((control: any) => {
      return new Promise<void>((resolve) => {
        const file = control.value?.file;
        if (file) {
          this.submitFile({ value: file, formControl: control });
          // Asumimos que submitFile manejará internamente el loading state
          setTimeout(() => resolve(), 3500); // Usamos el mismo timeout que submitFile
        } else {
          resolve();
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }
  
  async uploadFilesFromFormGroup(form: FormGroup, filesControls: string[]): Promise<void> {
    const uploadPromises = filesControls.map((controlName: string) => {
      return new Promise<void>((resolve) => {
        const control = form.get(controlName);
        if (control && control.value) {
          this.submitFile({ value: control.value?.file, formControl: control as FormControl });
          setTimeout(() => resolve(), 3500);
        } else {
          resolve();
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }
  
  async uploadFiles(controlNames: string[]): Promise<void> {
    const uploadPromises = controlNames.map((controlName: string) => {
      return new Promise<void>((resolve) => {
        const control = this.getControl(controlName);
        const file = control.value?.file;
        console.log(control.value, 'CONTROL VALUE');
        if (file) {
          this.submitFile({ value: file, formControl: control });
          setTimeout(() => resolve(), 3500);
        } else {
          resolve();
        }
      });
    });
  
    await Promise.all(uploadPromises);
  }
  previousStep(): void {
    this.handleStepChange.emit('previous');
  }
  
}
